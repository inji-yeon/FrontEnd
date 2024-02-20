import jwt_decode from "jwt-decode";

export function decodeJwt(token) {
    try{
        if(token === null) return null;

        return jwt_decode(token);
    }catch(e){
        
        console.log(e);
    }
};