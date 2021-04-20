import axios from 'axios';
import { voteData } from '../interfaces';
import { getJWT, refreshToken } from './authService';

const BASE_URL = 'http://localhost:8080/api';

export const getAllPosts = async() : Promise<any> => {
   try {
    const response = await getAllPostsCall();
    if (!response || response.error) {
       await refreshToken();
        const res = await getAllPostsCall();
        if (!res|| res.error) {
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
    }).catch((error)=>{ return error.response});
}


export const postUpVote = (voteData : voteData) : Promise<any> =>{
const {authenticationToken} = getJWT();

return axios({
    method: 'POST',
    url:`${BASE_URL}/votes/`,
    headers: {
        'Accept': 'application/json',
        'Authorization': `Bearer ${authenticationToken}`
    },
    data: voteData
}).then((response)=>{
    return response.data ? response.data : response.status;
}).catch((error)=>{ return error.response.data});

}


export const postDownVote = (voteData : voteData) : Promise<any> =>{
    const {authenticationToken} = getJWT();
    
    return axios({
        method: 'POST',
        url:`${BASE_URL}/votes/`,
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authenticationToken}`
        },
        data: voteData
    }).then((response)=>{
        return  response.data ? response.data : response.status;
    }).catch((error)=>{ return error.response.data});
    
    }