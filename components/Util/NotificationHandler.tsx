import React from "react";
import { toast } from 'react-toastify';


export const upVoteAlreadyExists = () : void =>{
    
     toast.warning("Error, you already have upVote",{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:2000
    })
}

export const downVoteAlreadyExists = () : void =>{
     toast.warning("Error, you already have downVote",{
        position:toast.POSITION.TOP_RIGHT,
        autoClose:2000
    })
}