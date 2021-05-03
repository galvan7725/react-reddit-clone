import { commentPayload, JWTData } from "../interfaces";
import axios, { AxiosResponse } from 'axios';
import { getJWT } from "./authService";

const BASE_URL = 'http://localhost:8080/api';

export const createComment = async(commentPayload: commentPayload): Promise<AxiosResponse> => {
    const {authenticationToken} = getJWT();
    try {
        const response = await axios({
            method: 'POST',
            url: `${BASE_URL}/comments`,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authenticationToken}`
            },
            data: commentPayload
        });
        return response.data;
    }catch(error){
        return error;
    }
}

export const getCommentsByPost = (postId: number) : Promise<AxiosResponse> =>{
    const {authenticationToken} = getJWT();
    return axios({
        method: 'GET',
        url: `${BASE_URL}/comments/by-post/${postId}`,
        headers: {
            'Authorization':`Bearer ${authenticationToken}`
        }
    }).then((response) => {
        return response.data ? response.data : response.status;
    }).catch((error) => { return error.response.data });
}