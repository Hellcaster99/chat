import React from 'react';
import {Container, Nav, Navbar, Stack} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useGlobalContext } from '../context/AuthContext';

const NavBar = () => {

    const {user, resetUser} = useGlobalContext();

  return (
    <Navbar bg="dark" className="mb-4" style={{height:"3.75rem"}}>
        <Container>
            <h2>
                <Link to="/" className="link-light text-decoration-none">chatApp</Link>
            </h2>
            <span className="text-warning">{user ? `Logged in as ${user.name}` : `Not Logged In`}</span>
            <Nav>
                <Stack direction='horizontal' gap={3}>
                    {!user && <Link to="/login" className="link-light text-decoration-none">
                        Login
                    </Link>}
                    {!user && <Link to="/register" className="link-light text-decoration-none">
                        Register
                    </Link>}
                    {user && <Link to="/login" className="link-light text-decoration-none" 
                        onClick={resetUser}
                    >
                        Logout
                    </Link>}
                </Stack>
            </Nav>
        </Container>
    </Navbar>
  )
}

export default NavBar