import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'reactstrap';
import { commentPayload } from '../interfaces';
import { getCommentsByUserName } from '../services/commentService';

interface _userName {
    userName: string | string[],
    handleCommentsCount: Function
}

const CommentsByUser = ({ userName,handleCommentsCount }: _userName) => {


    const [comments, setComments] = useState<Array<commentPayload>>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const getCommentsByUserData = async (): Promise<void> => {
        try {
            const response = await getCommentsByUserName(userName);
            if (response == null) {
                console.log('error');
                setLoading(false);
            } else {
                setComments(response.reverse());
                handleCommentsCount(response.length);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getCommentsByUserData();
    }, [])


    return (
        <Row>
            {loading ? <Spinner color="primary" /> : (
                <div className="comments-user-container">
                    {comments.length > 0 ? (
                        <>
                        {comments.map((comment, i) => (
                            <Col xs={12} md={{ size: 8, order: 2, offset: 2 }} key={i}>
                                <div className="comment-item">
                                    <div className="comment-header">
                                        <span>{comment.userName}</span>
                                    </div>
                                    <hr style={{ width: '100%' }} />
                                    <div className="comment-content">
                                        <p>{comment.text}</p>
                                    </div>
                                </div>
                            </Col>
                        ))}
                        </>
                    ): <h2>You have not commented yet</h2>}
                </div>
            )}
        </Row>
    )
}

export default CommentsByUser;
