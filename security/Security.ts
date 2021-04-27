import { getJWT } from "../components/services/authService";


class Security {
    expirationDate : number;
    constructor(){
        this.expirationDate = +getJWT().expiresAt.toString().replace('.','');
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

}

export default Security;