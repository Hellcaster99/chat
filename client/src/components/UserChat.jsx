import React from 'react';
import { useFetchRecipient } from '../hooks/useFetchRecipient';
import { Stack } from 'react-bootstrap';
import avatar from "../assets/male_avatar.svg";
import { useChatContext } from '../context/chatContext';

const UserChat = ({chat,user}) => {
    const recipient = useFetchRecipient(chat,user);
    const {onlineUsers} = useChatContext();
    console.log(onlineUsers);
  return (
    <Stack 
        direction="horizontal" 
        gap={3}
        className="user-card align-items-center p-2 justify-content-between"
        role="button"
    >
        <div className="d-flex">
            <div className="me-2">
                <img src={avatar} alt="Profile" height="35px" />
            </div>
            <div className="text-content">
                <div className="name">{recipient?.name}</div>
                <div className="text">Text message</div>
            </div>
        </div>
        <div className="d-flex flex-column align-items-end">
            <div className="date">06/05/2024</div>
            <div className="this-user-notifications">1</div>
            <span className={onlineUsers?.some(user => user?.userId === recipient?.email) ? "user-online":""}></span>
        </div>
    </Stack>
  )
}

export default UserChat;