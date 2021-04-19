import Link from 'next/link';
import React from 'react'
import { Col } from 'reactstrap';
import { postHeaderData } from '../interfaces';

const PostHeader = ({subredditName,userName,duration}: postHeaderData) => {
    return (
        <Col xs={10} md={11}>
            <div className="title-container">
                <span className="subreddit-name"><Link href="/"><span>r/{subredditName}</span></Link></span>
                <span className="post-username"><Link href="/user/"><span className="posted-by-link">. Posted by{' ' +userName}.</span></Link></span>
                <span className="post-duration"><Link href="#"><span>{duration}.</span></Link></span>
            </div>
            <hr />
        </Col>
    )
}

export default PostHeader;
