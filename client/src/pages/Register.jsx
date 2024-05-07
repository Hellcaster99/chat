import React from 'react';
import {Alert, Button, Form, Row, Col, Stack} from 'react-bootstrap';
import { useGlobalContext } from '../context/AuthContext';

const Register = () => {

    const {register, handleSubmit, registerUser, regError, errors, loading} = useGlobalContext();

  return (
    <>
        <Form onSubmit={handleSubmit(registerUser)}>
            <Row
                style={{
                    height: '100%',
                    justifyContent:'center',
                    paddingTop:'3%'
                }}
            >
                <Col xs={10} md={6} lg={4}>
                    <Stack gap={4}>
                        <h2 style={{textAlign:'center'}}>Register</h2>
                        <Form.Control type="text" placeholder='Name'
                            {...register("name", {
                                required:"Name required",
                                minLength:{value:2,message:"(Name) too short"},
                                maxLength:{value:30,message:"(Name) too long"}
                            })}
                            aria-invalid={errors?.name ? "true":"false"}
                        />
                        <Form.Control type="email" placeholder='Email' 
                            {...register("email",{
                                required:"Email required",
                            })}
                            aria-invalid={errors?.email ? "true":"false"}
                        />
                        <Form.Control type="password" placeholder='Password'
                            {...register("password",{
                                required:"Password required",
                                minLength:{value:6,message:"(Password) too short"},
                                maxLength:{value:1024,message:"(Password) too short"},
                            })}
                            aria-invalid={errors?.password ? "true":"false"}
                        />
                        <Button 
                            varinat="primary" 
                            type="submit"
                            className={(loading || errors?.name || errors?.email || errors?.password ) ? "disabled" : ""}
                            style={{}}
                        >
                            {loading ? "Creating your account" : "Register"}
                        </Button>
                        {(errors?.name || errors?.email || errors?.password || regError) && <Alert variant='danger'>
                            <p>{errors?.name?.message}</p>
                            <p>{errors?.email?.message}</p>
                            <p>{errors?.password?.message}</p>
                            {regError && <p>{regError}</p>}
                        </Alert>}
                    </Stack>
                </Col>
            </Row>
        </Form>
    </>
  )
}

export default Register