export interface LoginData {
    username : string;
    password : string;
}

export interface JWTData{
    authenticationToken: string,
    expiresAt: string,
    refreshToken: string,
    username: string
}
