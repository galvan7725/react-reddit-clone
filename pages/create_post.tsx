import React from 'react'
import CreatePostBody from '../components/posts/CreatePostBody';
import Layout from '../components/shared/Layout';

const createPost = () => {
    return (
        <Layout pageTitle="Create Post">
            <CreatePostBody />
        </Layout>
    )
}

export default createPost;
