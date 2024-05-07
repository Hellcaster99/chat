import { useState, useEffect } from "react";
import { getReq, baseUrl } from "../lib/actions";

export const useFetchRecipient = (chat,user) => {
    const [recipient, setRecipient] = useState(null);
    const [error, setError] = useState(null);
    const recipientId = chat?.members?.find((id)=> id !== user?.email )

    useEffect(()=>{
        const getUser = async () => {
            if(!recipientId) return null;

            try {
                const response = await getReq(`${baseUrl}/users/find/${recipientId}`);
                setRecipient(response);
            } catch (error) {
                console.log(error);
                setError(error);
            }
        }
        getUser();
    },[chat]);

    return recipient;
}