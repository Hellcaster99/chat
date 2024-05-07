import { createContext, useContext, useState, useEffect } from "react";
import {useForm} from 'react-hook-form';
import { postReq, getReq, baseUrl } from "../lib/actions";
import { useGlobalContext } from "./AuthContext";
import {io} from 'socket.io-client';
import { useFetchRecipient } from "../hooks/useFetchRecipient";

const ChatContext = createContext();

function timeout(delay) {
    return new Promise( res => setTimeout(res, delay) );
}

const ChatContextProvider = ({children, user}) => {
    const [userChats, setUserChats] = useState(null);
    const [chatLoading, setChatLoading] = useState(false);
    const [chatError, setChatError] = useState(null);
    const [createChatError, setCreateChatError] = useState(null);
    const [createChatLoading, setCreateChatLoading] = useState(false);
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState(null);
    const [messagesLoading, setMessagesLoading] = useState(false);
    const [socket,setSocket] = useState(null);
    const [onlineUsers, setOnlineUsers] = useState([]);
    const [newMessage,setNewMessage] = useState(null);
    const recipient = useFetchRecipient(currentChat,user);
    const {setUser,reset} = useGlobalContext();

    //add online user
    useEffect(()=>{
        const newSocket = io("https://chatappsocket-chinmay.vercel.app",{
            withCredentials: true,
            transports: ['websocket', 'polling', 'flashsocket']
        });
        setSocket(newSocket);

        return ()=>{
            newSocket.disconnect();
        };
    },[user]);

    //show online users
    useEffect(()=>{
        if(socket === null) return;
        socket.emit("addNewUser",user?.email);
        socket.on("getOnlineUsers",(res)=>{
            setOnlineUsers(res);
        })
        return ()=>{
            socket.off("getOnlineUsers");
        }
    },[socket]);

    //send messages
    useEffect(()=>{
        if(socket===null)return;
        const recipientId = currentChat?.members?.find((id)=> id !== user?.email);
        socket.emit("sendMessage",{...newMessage, recipientId});
    },[newMessage])

    //receive messages
    useEffect(()=>{
        if(socket===null)return;
        socket.on("getMessage",(res)=>{
            if(currentChat?._id !== res.chatId) return;
            setMessages((prev)=>[...prev,res]);
        })
    },[socket,currentChat])

    useEffect(()=>{
        const getUserChats = async () => {
            try {
                if(user?.email){
                    setChatLoading(true);
                    await timeout(2000);
                    setChatError(null);
                    const response = await getReq(`${baseUrl}/chats/${user?.email}`);
                    setUserChats(response);
                    setChatLoading(false);
                }
                
            } catch (error) {
                console.log(error);
                setChatError(error);
            }
        }
        getUserChats();
    },[user]);

    useEffect(()=>{
        const getMessages = async () => {
            try {
                if(currentChat){
                    setMessagesLoading(true);
                    const response = await getReq(`${baseUrl}/messages/${currentChat?._id}`);
                    setMessages(response);
                    setMessagesLoading(false);
                }
            } catch (error) {
                console.log(error);
            }
        }
        getMessages();
    },[currentChat]);

    const createChat = async (data) => {
        setCreateChatError(null);
        setCreateChatLoading(true);
        try {
            const second = await getReq(`${baseUrl}/users/find/${data?.secondId}`);
            if(!second){
                setCreateChatError("User does not not exist");
                return null;
            }

            const response = await postReq(`${baseUrl}/chats`,{firstId:user?.email,secondId:data?.secondId});
            reset();
            setCreateChatLoading(false);
            setUser(JSON.parse(sessionStorage.getItem("chatUser")));

        } catch (error) {
            setCreateChatLoading(false);
            console.log(error);
            setCreateChatError(error);
        }
    }

    const updateChat = (chat) => {
        setCurrentChat(chat);
        // sessionStorage.setItem("currentChat",JSON.stringify(chat));
    }

    const sendMessages = async (text,setText) => {
        try {
            const response = await postReq(`${baseUrl}/messages`,{
                chatId: currentChat?._id,
                senderId: user?.email,
                text: text
            });
            setNewMessage(response);
            setMessages((prev)=>[...prev,response]);

            setText("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <ChatContext.Provider
            value={{
                userChats, chatLoading,
                chatError, createChat,
                createChatLoading, createChatError,
                updateChat, messages,
                messagesLoading, currentChat,
                sendMessages, onlineUsers
            }}
        >
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext = () => {
    return useContext(ChatContext);
}

export {ChatContextProvider};