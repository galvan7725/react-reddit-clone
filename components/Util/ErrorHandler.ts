import React, { ReactText } from "react";
import { downVoteAlreadyExists, upVoteAlreadyExists } from "./NotificationHandler";

const ErrorHandler = (message: string, trace: string) : void =>{

    if(message.includes("You have already UPVOTE'd for this post") || trace.includes("You have already UPVOTE'd for this post")){
         upVoteAlreadyExists();
    }else if(message.includes("You have already DOWNVOTE'd for this post") || trace.includes("You have already DOWNVOTE'd for this post\r\n\tat")){
         downVoteAlreadyExists();
    }

}



export default ErrorHandler;