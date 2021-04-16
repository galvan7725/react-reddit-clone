import { JWTData } from "../interfaces";


export const getJWT = () : JWTData | null =>{
    if(typeof window !== "undefined"){
        return null;
    }else if(localStorage.getItem("jwt")){
        return JSON.parse(localStorage.getItem("jwt"));
    }else{
        return null;
    }
}