import { useRouter } from 'next/router';
import React, { useState, useEffect} from 'react'
import { Col, Container, Row, Spinner } from 'reactstrap';
import { useChangePostStatus } from '../../context/PostContext';
import PostBody from '../IndexC/PostBody';
import PostHeader from '../IndexC/PostHeader';
import VoteCount from '../IndexC/VoteCount';
import { PostData } from '../interfaces';
import { getPostById } from '../services/PostService';
import Loading from '../shared/Loading';
import CommentsList from './CommentsList';
import CreateCommentForm from './CreateCommentForm';

interface _post{
    postId:number
}

const SinglePostBody = ({postId}: _post) => {

    const {state} =  useChangePostStatus();

    const [post,setPost] = useState<PostData>();
    const [loading, setLoading] = useState<boolean>(true);

    const getSinglePostData = async (postId: number) : Promise<void> => {
        try {
            const response = await getPostById(postId);
            if(response == null || response.error){
                console.log(response);
                setLoading(false);
            }else{
                console.log(response);
                setPost(response);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    const router = useRouter();

    useEffect(() => {
        //if(postId == null || postId === undefined){
        if(!router.isReady){
            console.log('null')
        }else{
            console.log(postId);
            getSinglePostData(postId);
        }
        return () => {
            setPost(null);
        }
    }, [state.status])

    return (
        <>
            {loading ? <Loading/> : (
                <Row style={{ marginTop: '5px' }}>
                <Col xs={12} md={12}>
                    <Container className="post-container">
                           {post ? (<>
                                <Row>
                                    <VoteCount {...{voteCount:post.voteCount,postId:post.id,upVote:post.upVote,downVote:post.downVote}} />
                                    <PostHeader {...{subredditName:post.subredditName,userName:post.userName,duration:post.duration}} />
                                </Row>
                                <PostBody {...{postName:post.postName,description:post.description}} />
                                <CreateCommentForm postId={postId}/>
                                <CommentsList postId={postId} />
                           </>) : (<><Spinner color="primary" /></>)}
                    </Container>
                </Col>
            </Row>
            )}
        </>
    )
}

export default SinglePostBody;
