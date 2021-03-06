import axios from 'axios';
import { JWTData, LoginData } from '../interfaces';


const BASE_URL = 'https://springredditclone2.herokuapp.com/api';
//const BASE_URL = 'http://localhost:8080/api';


export const Login = async(loginData : LoginData) : Promise<any> => {
    return axios({
        method: 'POST',
        url:`${BASE_URL}/auth/login`,
        data: loginData,
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        return response.data;
    }).catch((error)=>{ return error.response.data});
}

export const saveToken = (jwt: JWTData) : void =>{
    if(typeof window !== 'undefined'){
        localStorage.setItem('token',JSON.stringify(jwt));
    }
}