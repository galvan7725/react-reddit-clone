import axios,{AxiosResponse} from 'axios';

interface UserData{
    email: string,
    username: string,
    password: string
}

const BASE_URL = 'http://localhost:8080/api';

export const signUp = (userData: UserData) : Promise<any> =>{

    return axios({
        method: 'POST',
        url:`${BASE_URL}/auth/signup`,
        data: userData,
        headers:{
            Accept: "application/json",
            "Content-Type": "application/json"
        }
    }).then((response)=>{
        return response;
    }).catch((error)=>{console.log(error)});

}