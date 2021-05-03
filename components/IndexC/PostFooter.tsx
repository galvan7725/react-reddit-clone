import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Button, Col } from 'reactstrap';
import { useRouter } from 'next/router';

const PostFooter = ({commentCount,id}): JSX.Element => {
const router = useRouter();
    return (
        <Col xs={10} md={{ size: 11, order: 2, offset: 1 }} className="post-footer">
            <span className="post-comments-count"><FontAwesomeIcon icon={faComments} />Comments({commentCount})</span>
            <Button style={{ marginLeft: '5px' }} type="button" color="primary" onClick={() => { router.push(`/posts/view/${id}`) }}>Read post</Button>
        </Col>
    )
}

export default PostFooter;
