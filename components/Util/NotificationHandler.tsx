import React from "react";
import { toast } from 'react-toastify';


export const upVoteAlreadyExists = () : void =>{
    
     toast.warning("Error, you already have upVote for that post",{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:2000
    })
}

export const downVoteAlreadyExists = () : void =>{
     toast.warning("Error, you already have downVote for that post",{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:2000
    })
}

export const createPostSuccess = () : void =>{
    toast.success("Post created successfully",{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:2000
    })
}