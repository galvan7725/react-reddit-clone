import React from 'react'
import { Col, Container, Row } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { PostData } from '../interfaces';
import { useRouter } from 'next/router';
import Link from 'next/link';


const PostTitle = (data: PostData): JSX.Element => {

    return (
        <>
            <Container className="post-container">
                <Row>
                    <>
                        <Col xs={1} md={1}>
                            <div className="votes-container">
                                <div className="votes-section">
                                    <FontAwesomeIcon icon={faArrowUp} />
                                </div>
                                <div className="votes-section">
                                    <div>{data.voteCount == null ? 0 : data.voteCount}</div>
                                </div>
                                <div className="votes-section">
                                    <FontAwesomeIcon icon={faArrowDown} />
                                </div>
                            </div>
                        </Col>

                        <Col xs={10} md={11}>
                            <div className="title-container">
                                <span className="subreddit-name"><Link href="/"><span>r/{data.subredditName}</span></Link></span>
                                <span className="post-username"><Link href="/user/"><span>. Posted by{data.userName}.</span></Link></span>
                                <span className="post-duration"><Link href="#"><span>{data.duration}.</span></Link></span>
                            </div>
                            <hr />

                        </Col>

                        <Col xs={10} md={{size:11, order:2, offset:1}} >
                            <h2>{data.postName}</h2>
                        </Col>
                    </>
                </Row>
            </Container>
        </>
    )
}

export default PostTitle;
