import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router';
import CreatePostBody from '../components/posts/CreatePostBody';
import Layout from '../components/shared/Layout';
import Security from '../security/Security';
import Loading from '../components/shared/Loading';

const createPost = () : JSX.Element=> {

    const router = useRouter();

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const security = new Security();
        if(!security.verifyToken()){
            setLoading(false);
            router.push('/login');
        }else{
            setLoading(false);
        }
        return () => {
          setLoading(true);  
        }
    }, [])

    return (
        <Layout pageTitle="Create Post">
            <>
                {loading ? (<Loading/>) 
                : 
                (<CreatePostBody />)}
            </>
        </Layout>
    )
}

export default createPost;
