import { useRouter } from 'next/router';
import React from 'react'
import PostsBySubredditBody from '../../components/posts/PostsBySubredditBody';
import Layout from '../../components/shared/Layout';
import Loading from '../../components/shared/Loading';
import { PostStateProvider } from '../../context/PostContext';

const subredditQ : React.FC = (): JSX.Element => {

    const router = useRouter();
    const {subredditId} = router.query;

    return (
        <Layout pageTitle="Subreddit">
            {subredditId == null || subredditId === undefined ? <Loading /> :
            <PostStateProvider>
                <PostsBySubredditBody {...{subredditId:subredditId}} />
            </PostStateProvider>
            }
        </Layout>
    )
}

export default subredditQ;
