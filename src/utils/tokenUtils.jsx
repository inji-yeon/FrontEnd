import jwt_decode from "jwt-decode";

export function decodeJwt(token) {

    if (token === null) return null;

    return jwt_decode(token);
};

export function userEmployeeCode() {
    return decodeJwt(window.localStorage.getItem('accessToken'))?.empCode;
}