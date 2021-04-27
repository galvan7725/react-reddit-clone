import React from 'react'
import { Button, Col, Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown, faComments } from '@fortawesome/free-solid-svg-icons';
import { PostData } from '../interfaces';
import { useRouter } from 'next/router';
import Link from 'next/link';
import VoteCount from './VoteCount';
import PostHeader from './PostHeader';
import PostBody from './PostBody';
import PostFooter from './PostFooter';


const PostTitle = (data: PostData): JSX.Element => {
    const router = useRouter();
    return (
        <>
            <Container className="post-container">
                <Row>
                        <VoteCount {...{voteCount:data.voteCount,postId:data.id,upVote:data.upVote,downVote:data.downVote}} />
                        <PostHeader {...{subredditName:data.subredditName,userName:data.userName,duration:data.duration}} />
                        <PostBody {...{postName:data.postName,description:data.description}} />
                        <PostFooter {...{commentCount:data.commentCount,id:data.id}} />
                </Row>
            </Container>
        </>
    )
}

export default PostTitle;
