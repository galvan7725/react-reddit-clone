import { JWTData } from "../interfaces";


export const getJWT = () : JWTData | null =>{
    if(typeof window == "undefined"){
        return null;
    }else if(localStorage.getItem("token") != null){
        return JSON.parse(localStorage.getItem("token"));
    }else{
        return null;
    }
}