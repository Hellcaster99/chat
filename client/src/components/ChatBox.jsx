import React, { useState, useEffect } from 'react';
import { useChatContext } from '../context/chatContext';
import { useGlobalContext } from '../context/AuthContext';
import { useFetchRecipient } from '../hooks/useFetchRecipient';
import { Stack } from 'react-bootstrap';
import moment from 'moment';
import InputEmoji from 'react-input-emoji';

const ChatBox = ({currentChat,user}) => {
    const receiver = useFetchRecipient(currentChat,user);
    const {register,handleSubmit} = useGlobalContext();
    const {messages, messagesLoading, sendMessages} = useChatContext();
    const [text,setText] = useState("");

    if(!currentChat){
        return (
            <p>No chat selected</p>
        )
    }

    if(messagesLoading){
        return <p>Loading chat...</p>
    }

  return (
    <Stack gap={4} className="chat-box">
        <div className="chat-header">
            <strong>{receiver?.name}</strong>
        </div>
        <Stack gap={3} className="messages">
            {messages?.map((message,index)=>{
                return <Stack key={index} className={`message flex-grow-0 ${message?.senderId === user?.email ? "self align-self-end":"align-self-start"} `} >
                    <span>{message.text}</span>
                    <span className="message-footer">{moment(message.createdAt).calendar()}</span>
                </Stack>
            })}
        </Stack>
        <Stack direction='horizontal' gap={3} className='chat-input flex-grow-0'>
            <InputEmoji 
                value={text} onChange={setText}
                fontFamily='nunito' borderColor='rgba(72,112,223,0.2)'  
            />
            <button className="send-btn" onClick={()=>sendMessages(text,setText)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-send-fill" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471z"/>
                </svg>
            </button>
        </Stack>
    </Stack>
  )
}

export default ChatBox