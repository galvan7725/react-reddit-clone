import { commentPayload, JWTData } from "../interfaces";
import axios, { AxiosResponse } from 'axios';
import { getJWT } from "./authService";

export const createComment = async(commentPayload: commentPayload): Promise<any> => {
    const {authenticationToken} = getJWT();
    try {
        const response = await axios({
            method: 'POST',
            url: `${process.env.NEXT_PUBLIC_API_HOST}/comments`,
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

export const getCommentsByPost = (postId: number) : Promise<any> =>{
    const {authenticationToken} = getJWT();
    return axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/comments/by-post/${postId}`,
        headers: {
            'Authorization':`Bearer ${authenticationToken}`
        }
    }).then((response) => {
        return response.data ? response.data : response.status;
    }).catch((error) => { return error.response.data });
}

export const getCommentsByUserName = (userName: string | string[]) : Promise<any> => {
    const {authenticationToken} = getJWT();
    return axios({
        method: 'GET',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/comments/by-user/${userName}`,
        headers: {
            'Authorization': `Bearer ${authenticationToken}`
        }
    }).then((response) => {
        return response.data ? response.data : response.status;
    }).catch((error) => { return error.response.data });
}