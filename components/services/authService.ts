import { JWTData } from "../interfaces";
import axios from 'axios';


export const getJWT = () : JWTData | null =>{
    if(typeof window == "undefined"){
        return null;
    }else if(localStorage.getItem("token") != null){
        return JSON.parse(localStorage.getItem("token"));
    }else{
        return null;
    }
}


export const refreshToken = (): Promise<any> =>{
    console.log("Refreshing token");
    const {refreshToken,username} = getJWT();
    return axios({
        method:'POST',
        url: `${process.env.NEXT_PUBLIC_API_HOST}/auth/refresh/token`,
        headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
        },
        data:{
            "refreshToken": refreshToken,
             "username": username
        }
    }).then((response)=>{
        localStorage.removeItem('token');
        localStorage.setItem('token', JSON.stringify(response.data));
    }).catch((error)=>{ return error});
}