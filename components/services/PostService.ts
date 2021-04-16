import axios from 'axios';
import { getJWT, refreshToken } from './authService';

const BASE_URL = 'http://localhost:8080/api';

export const getAllPosts = async() : Promise<any> => {
   try {
    const response = await getAllPostsCall();
    if (response == null || response.error) {
       await refreshToken();
        const res = await getAllPostsCall();
        if (res == null || res.error) {
            return res;     
        }else{
            return res;
        }
    }else{
        return response;
    }
   } catch (error) {
       return error;
   }
}


const getAllPostsCall = () : Promise<any> => {
    const {authenticationToken} = getJWT();
    console.log(authenticationToken);
    return axios({
        method: 'GET',
        url: `${BASE_URL}/posts/`,
        headers: {
            'Authorization': `Bearer ${authenticationToken}`
        }
    }).then((response)=>{
        return response.data;
    }).catch((error)=>{ return error.response || null});
}