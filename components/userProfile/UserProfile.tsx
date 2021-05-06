import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import { PostStateProvider, useChangePostStatus } from '../../context/PostContext';
import PostBody from '../IndexC/PostBody';
import PostFooter from '../IndexC/PostFooter';
import PostHeader from '../IndexC/PostHeader';
import VoteCount from '../IndexC/VoteCount';
import { commentPayload, PostData } from '../interfaces';
import { getPostsByUserName } from '../services/PostService';
import Loading from '../shared/Loading';
import CommentsByUser from './CommentsByUser';

interface _userName {
    userName: string | string[]
}

const UserProfile = ({ userName }: _userName): JSX.Element => {

    const [loading, setLoading] = useState<boolean>(true);
    const [posts, setPosts] = useState<Array<PostData>>([]);
    const [commentsCount, setCommentsCount] = useState<number>();

    const {state} =  useChangePostStatus();

    const getPostsByUserNameData = async (): Promise<void> => {
        try {
            const response = await getPostsByUserName(userName);
            if (response == null) {
                console.log('error');
            } else {
                console.log(response);
                setPosts(response.reverse());
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleCommentsCount = (commentsCount: number): void =>{
        setCommentsCount(commentsCount);
    }

    useEffect(() => {
        getPostsByUserNameData();
    }, [state.status]);

    return (
        <>
            {loading ? <Loading /> : <>
                <Row>
                    <Col xs={12} md={12}>
                        <span>Welcome {userName}</span>
                        <p>You have posted {posts.length} time(s) and commented {commentsCount} time(s). You can check your post and comment history below.</p>
                    </Col>
                </Row>
                <Row>
                    <span>Your posts:</span>
                </Row>
                <Row>
                    <div className="posts-user-list-container">
                        {posts.length > 0 ? (<>
                            {posts.map((post, i)=>(
                                <Container className="post-container" key={i}>
                                <Row>
                                        <VoteCount {...{voteCount:post.voteCount,postId:post.id,upVote:post.upVote,downVote:post.downVote}} />
                                        <PostHeader {...{subredditName:post.subredditName,userName:post.userName,duration:post.duration}} />
                                        <PostBody {...{postName:post.postName,description:post.description}} />
                                        <PostFooter {...{commentCount:post.commentCount,id:post.id}} />
                                </Row>
                            </Container>
                            ))}
                        </>) : <h2>You don't have any post</h2>}
                    </div>
                </Row>
                <Row>
                    <span>Your comments:</span>
                </Row>
                <CommentsByUser {...{userName,handleCommentsCount}} />
            </>}
        </>
    )
}

export default UserProfile;
