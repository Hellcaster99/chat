import React from 'react'
import { useChatContext } from '../context/chatContext'
import { Alert, Button, Col, Container, Form, Row, Stack } from 'react-bootstrap';
import UserChat from '../components/UserChat';
import { useGlobalContext } from '../context/AuthContext';
import ChatBox from '../components/ChatBox';

const Chat = () => {
  const {user, handleSubmit, register, errors} = useGlobalContext();
  const { userChats, chatLoading, chatError,
     createChat, createChatLoading, createChatError,
    updateChat, currentChat } = useChatContext();

  return (
    <Container>
        <Stack direction="horizontal" gap={4} className="align-items-start">
          <Stack className="messages-box flex-grow-0 pe-3" style={{overflow:scroll}}>
            {chatLoading && <p>Loading chats...</p> }
            {userChats?.map((chat,index)=>{
              return (
                <div key={index} onClick={()=>updateChat(chat)}>
                  <UserChat chat={chat} user={user} />
                </div>
              )
            })}
              <Form onSubmit={handleSubmit(createChat)}
                style={{
                  paddingTop:userChats?.length > 1 ? "10%": "0"
                }}
              >
                <Row
                  style={{
                    
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Col>
                    <Stack gap={3}>
                      <Form.Control type="email" placeholder="Email Id"
                        {...register("secondId",{
                          required: "Enter an ID"
                        })}
                      />
                      <Button
                        varinat="primary" type="submit"
                        style={{width:"100%"}}
                      >
                      Create New Chat
                      </Button>
                      {createChatError && <Alert variant="danger">
                          {createChatError}
                      </Alert>}
                    </Stack>
                  </Col>
                </Row>
              </Form>
          </Stack>
          <ChatBox currentChat={currentChat} user={user} />
        </Stack>
      
    </Container>
  )
}

export default Chat