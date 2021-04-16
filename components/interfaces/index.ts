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


export interface PostData{
    commentCount: number,
    description: string,
    downVote: boolean,
    duration: string,
    id: number,
    postName: string,
    subredditName: string,
    upVote: boolean,
    url: string,
    userName: string,
    voteCount: number
}
