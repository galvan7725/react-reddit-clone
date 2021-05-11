import React from 'react'

interface _subredditId{
    subredditId : string | string[]
}
const PostsBySubredditBody: React.FC<_subredditId> = ({subredditId}) => {
    return (
        <div>
            <h1>{subredditId}</h1>
        </div>
    )
}

export default PostsBySubredditBody;
