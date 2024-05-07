import React from 'react';
import {Alert, Button, Form, Row, Col, Stack} from 'react-bootstrap';
import { useGlobalContext } from '../context/AuthContext';

const Login = () => {

    const {register, handleSubmit, loginUser, loginError, errors, loading} = useGlobalContext();

  return (
    <>
        <Form onSubmit={handleSubmit(loginUser)}>
            <Row
                style={{
                    height: '100%',
                    justifyContent:'center',
                    paddingTop:'5%'
                }}
            >
                <Col xs={10} md={4}>
                    <Stack gap={4}>
                        <h2 style={{textAlign:'center'}}>Login</h2>
                        <Form.Control type="email" placeholder='Email'
                            {...register("email",{
                                required:"Email required",
                            })}
                        />
                        <Form.Control type="password" placeholder='Password' 
                            {...register("password",{
                                required:"Password required",
                                minLength:{value:6,message:"(Password) too short"},
                                maxLength:{value:1024,message:"(Password) too short"},
                            })}
                        />
                        <Button varinat="primary" type="submit"
                            className={(loading || errors?.email || errors?.password ) ? "disabled" : ""}
                        >
                            Login
                        </Button>
                        {(errors?.email || errors?.password || loginError) && <Alert variant='danger'>
                            <p>{errors?.email?.message}</p>
                            <p>{errors?.password?.message}</p>
                            {loginError && <p>{loginError}</p>}
                        </Alert>}
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>
  )
}

export default Login