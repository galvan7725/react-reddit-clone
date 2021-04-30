import { useRouter } from 'next/router';
import React, { useEffect } from 'react'
import Layout from '../components/shared/Layout';
import Security from '../security/Security';

const subreddits = () => {
    const router = useRouter();


    useEffect(() => {
        const security = new Security();
        if(!security.verifyToken()){
            router.push('/login');
        }else{

        }
    }, [])

    return (
        <Layout pageTitle="Subreddits">
            <h1>Subreddits</h1>
        </Layout>
    )
}

export default subreddits;
