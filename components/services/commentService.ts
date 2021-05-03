import { createCommentPayload, JWTData } from "../interfaces";
import axios, { AxiosResponse } from 'axios';
import { getJWT } from "./authService";

const BASE_URL = 'http://localhost:8080/api';

export const createComment = async(commentPayload: createCommentPayload): Promise<AxiosResponse> => {
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