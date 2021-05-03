import { text } from '@fortawesome/fontawesome-svg-core';
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import { useChangePostStatus } from '../../context/PostContext';
import { commentPayload } from '../interfaces';
import { getCommentsByPost } from '../services/commentService';
import Loading from '../shared/Loading';
interface _postId{
    postId: number
}

const CommentsList = ({postId} : _postId) => {

    const {state} =  useChangePostStatus();

    const [comments, setComments] = useState<Array<commentPayload>>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const getCommentsData = async(): Promise<void> =>{
        try {
            const response = await getCommentsByPost(postId);
            if(response == null || !response){
                console.log(response);
                setLoading(false);
            }else{
                setComments(response.reverse());
                setLoading(false);
                
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    useEffect(() => {
        getCommentsData();
        console.log(state.status);
    }, [])

    return (
        <Row>
            <Col xs={12} md={{size:11, order: 2, offset: 1 }}>
            <hr style={{ width: '100%' }}/>
            <span>All comments</span>
            <hr style={{ width: '100%' }}/>
                {loading ? <Loading/> : (
                    <>
                        {comments.length > 0 ? (
                            <>
                            {comments.map((comment,i)=>(
                               <div key={i} className="comment-item">
                                   <div className="comment-header">
                                       <span>{comment.userName}</span>
                                   </div>
                                   <hr style={{ width: '100%' }}/>
                                   <div className="comment-content">
                                    <p>{comment.text}</p>
                                   </div>
                               </div>
                            ))}
                            </>
                        ) :
                         null}
                    </>
                )}
            </Col>
        </Row>
    )
}

const commentItem = ({userName, createdDate,text,key}) : JSX.Element =>{
    return(
        <Row key={key}>
            <Col xs={12} md={12}>
                {userName}
            </Col>
            <Col x={12} md={12}>
                <span>{createdDate}</span>
            </Col>
            <Col x={12} md={12}>
                <p>{text}</p>
            </Col>
        </Row>
    )
}

export default CommentsList;
