import { useState } from 'react'
import {Routes, Route, Navigate} from 'react-router-dom';
import Chat from './pages/Chat';
import Login from './pages/Login';
import Register from './pages/Register';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {Container} from 'react-bootstrap';
import Navbar from './components/Navbar';
import { useGlobalContext } from './context/AuthContext';
import { ChatContextProvider } from './context/chatContext';

function App() {

  const {user} = useGlobalContext();

  return (
    <ChatContextProvider user={user}>
      <Navbar/>
      <Container className="text-secondary" >
        <Routes>
          <Route exact path="/" element={user ? <Chat/>:<Navigate to="/login"/>}/>
          <Route exact path="/register" element={!user ? <Register/>:<Navigate to="/"/>}/>
          <Route exact path="/login" element={!user ? <Login/>:<Navigate to="/"/>}/>
          <Route path="*" element={<Navigate to="/"/>}/>
        </Routes>
      </Container>
    </ChatContextProvider>
  )
}

export default App
