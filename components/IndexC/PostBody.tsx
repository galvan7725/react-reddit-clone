import React from 'react'
import { Col } from 'reactstrap';
import { postBodyData } from '../interfaces';

const PostBody = ({ postName, description }:postBodyData) => {
    return (
        <Col xs={10} md={{ size: 11, order: 2, offset: 1 }} className="post-information-container">
            <h2>{postName}</h2>
            <span className="post-description">{description.substring(0, 150)}</span>
            <hr style={{ width: '100%' }} />
        </Col>
    )
}

export default PostBody;
