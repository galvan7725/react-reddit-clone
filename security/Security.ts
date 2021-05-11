import { getJWT } from "../components/services/authService";


class Security {
    expirationDate? : number;
    constructor(){
        getJWT() != null ?  this.expirationDate = +this.getExpirationDateFormat().toString().replace('.','') :  null;
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

    private getExpirationDateFormat () : number {
        if(getJWT().expiresAt.length < 13){
            let aux = getJWT().expiresAt;
            aux = aux + '0000000000000';
            return +aux.substring(0,13);
        }else{
            return +getJWT().expiresAt;
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