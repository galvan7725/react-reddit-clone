import React, { useEffect, useState } from 'react'
import { Col, Container, Row, Spinner } from 'reactstrap';
import { PostData, subredditData } from '../interfaces';
import { getPostsBySubreddit } from '../services/PostService';
import Skeleton from 'react-loading-skeleton';
import VoteCount from '../IndexC/VoteCount';
import PostHeader from '../IndexC/PostHeader';
import PostBody from '../IndexC/PostBody';
import PostFooter from '../IndexC/PostFooter';
import { useChangePostStatus } from '../../context/PostContext';
import { getSubredditDescription } from '../services/subredditservice';
import Link from 'next/link';

interface _subredditId {
    subredditId: string | string[]
}
const PostsBySubredditBody: React.FC<_subredditId> = ({ subredditId }) => {

    const [loading, setLoading] = useState<boolean>(true);
    const [loadingS, setLoadingS] = useState<boolean>(true);
    const [posts, setPosts] = useState<Array<PostData>>([]);
    const [subreddit, setSubreddit] = useState<subredditData>();
    const [subredditNotFound, setSubredditNotFound] = useState<boolean>(false);

    const { state } = useChangePostStatus();

    const getPostsBySubredditData = async (): Promise<void> => {
        try {
            const response = await getPostsBySubreddit(subredditId);
            if (response == null || response.error) {
                console.log(response);
                setLoading(false);
            } else {
                setPosts(response.reverse());
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const getSubredditData = async (): Promise<void> => {
        try {
            const response = await getSubredditDescription(subredditId);
            if (response == null || response.error) {
                console.log(response);
                setSubredditNotFound(true);
                setLoadingS(false);
                setLoading(false);
            } else {
                setSubreddit(response);
                setLoadingS(false);
                getPostsBySubredditData();
            }
        } catch (error) {
            console.log(error);
            setSubredditNotFound(true);
            setLoadingS(false);
            setLoading(false);
        }
    }

    useEffect(() => {
        getSubredditData();
    }, [state.status])

    return (
        <>
            <Row>
                <Col xs={12} md={12}>
                    {loadingS ? <span><Spinner color="primary" /></span> :
                        <>
                            {subredditNotFound ?
                                (<>
                                    <h3>Subreddit Not Found</h3>
                                </>) :
                                <><h3>{subreddit.name}'s posts :</h3></>
                            }
                        </>
                    }
                </Col>
            </Row>
            <Row>

                <div className="posts-subreddit-list-container">
                    {loading ? (
                        <div style={{ display: 'block', width: '100%' }}>
                            <Skeleton count={5} height={40} />
                            <hr style={{ width: '100%' }} />
                            <Skeleton count={5} height={40} />
                        </div>
                    ) : (
                        <>
                            {subredditNotFound ? 
                            <div className="subreddit-not-found">
                                <h4>Sorry, this subreddit is not available.</h4>
                                <span>You can try :</span>
                                <ul>
                                    <li>
                                        <span>Go to <Link  href="/">homepage</Link></span>
                                    </li>
                                    <li>
                                        <span>View the <Link href="/subreddits">list of subreddits</Link></span>
                                    </li>
                                    <li>
                                    <span><Link href="/create_subreddit">Create a new subreddit</Link></span>
                                    </li>
                                </ul>
                            </div> : (
                                <>
                                    {posts.length > 0 ? (<>
                                        {posts.map((post, i) => (
                                            <Container className="post-container" key={i}>
                                                <Row>
                                                    <VoteCount {...{ voteCount: post.voteCount, postId: post.id, upVote: post.upVote, downVote: post.downVote }} />
                                                    <PostHeader {...{ subredditName: post.subredditName, userName: post.userName, duration: post.duration }} />
                                                    <PostBody {...{ postName: post.postName, description: post.description }} />
                                                    <PostFooter {...{ commentCount: post.commentCount, id: post.id }} />
                                                </Row>
                                            </Container>
                                        ))}
                                    </>) : <h2>This subreddit don't have any post yet</h2>}
                                </>
                            )}
                        </>
                    )}

                </div>
            </Row>
        </>
    )
}

export default PostsBySubredditBody;
