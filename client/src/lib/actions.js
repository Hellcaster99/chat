import axios from 'axios';

export const baseUrl = "http://localhost:5000/api";

export const postReq = async (url,body) => {
    const response = await axios.post(url,body);
    const data = response.data;
    return data;
}

export const getReq = async (url) => {
    const response = await axios.get(url);
    const data = response.data;
    return data;
}