import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'reactstrap';
import { commentPayload } from '../interfaces';
import { getCommentsByPost } from '../services/commentService';

interface _postId{
    postId: number
}

const CommentsList = ({postId} : _postId) => {


    const [comments, setComments] = useState<Array<commentPayload>>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const getCommentsData = async(postId: number): Promise<void> =>{
        try {
            const response = await getCommentsByPost(postId);
            if(response == null || response.status != 200){
                console.log(response);
            }else{
                console.log(response);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getCommentsData(postId);
        return () => {
            setComments([]);
        }
    }, [])

    return (
        <Row>
            <Col xs={12} md={{size:11, order: 2, offset: 1 }}>
                
            </Col>
        </Row>
    )
}

export default CommentsList;
