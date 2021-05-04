import { getJWT } from "../components/services/authService";


class Security {
    expirationDate? : number;
    constructor(){
        getJWT() != null ?  this.expirationDate = +getJWT().expiresAt.toString().replace('.','') :  null;
    }

    public verifyToken() : boolean{
        if(getJWT() == null || Date.now() > this.expirationDate ){
            console.log('false');
            return false;
        }else{
            console.log('true');
            return true;

        }
    }

    public getUserName = () : string =>{
        if(getJWT().username == null){
            return null;
        }else{
            return getJWT().username;
        }
    }

}

export default Security;