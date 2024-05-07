import { createContext, useContext, useState } from "react";
import {useForm} from 'react-hook-form';
import { postReq, baseUrl } from "../lib/actions";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

const AuthContextProvider = ({children}) => {

    const navigate = useNavigate();

    const [loading,setLoading] = useState(false);
    const [user, setUser] = useState(sessionStorage.getItem("chatUser") ? JSON.parse(sessionStorage.getItem("chatUser")) : null);

    const [regError,setRegError] = useState(null);
    const [loginError,setLoginError] = useState(null);

    const {register, handleSubmit, formState:{errors}, reset} = useForm();

    const resetUser = () => {
        sessionStorage.removeItem("chatUser");
        setUser(null);
        navigate("/login");
    }
    
    const registerUser = async (data) => {
        setRegError(null);
        setLoading(true);
        try{
            const response = await postReq(`${baseUrl}/users/register`,data);
            reset();
            setLoading(false);
            sessionStorage.setItem("chatUser", JSON.stringify(response));
            setUser(JSON.parse(sessionStorage.getItem("chatUser")));
            return response;

        }catch(error){
            reset();
            setLoading(false);
            setRegError(error.response.data);
        }
    }

    const loginUser = async (data) => {

        setLoginError(null);
        setLoading(true);
        try{
            const response = await postReq(`${baseUrl}/users/login`,data);
            reset();
            setLoading(false);
            sessionStorage.setItem("chatUser", JSON.stringify(response));
            setUser(JSON.parse(sessionStorage.getItem("chatUser")));
            return response;

        }catch(error){
            reset();
            setLoading(false);
            setLoginError(error.response.data);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user, register,
                registerUser, regError,
                handleSubmit, errors,
                loading, loginError,
                loginUser, resetUser,
                setUser, reset
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useGlobalContext = () => {
    return useContext(AuthContext);
}
export {AuthContextProvider};