import { useRouter } from 'next/router';
import React,{useEffect} from 'react'
import Layout from '../components/shared/Layout';
import CreateSubredditBody from '../components/subreddit/CreateSubredditBody';
import Security from '../security/Security';

const createSubreddit = () : JSX.Element=> {

    const router = useRouter();

    useEffect(() => {
        const security = new Security();
        if(!security.verifyToken()){
            router.push('/login');
        }
    }, [])

    return (
        <Layout pageTitle="Create Subreddit">
            <CreateSubredditBody />
        </Layout>
    )
}

export default createSubreddit;
