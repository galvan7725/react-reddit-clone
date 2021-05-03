import { useRouter } from 'next/router';
import React from 'react'
import SinglePostBody from '../../../components/posts/SinglePostBody';
import Layout from '../../../components/shared/Layout';
import Loading from '../../../components/shared/Loading';
import { PostStateProvider } from '../../../context/PostContext';

const SinglePost = () : JSX.Element => {

    const router = useRouter();
    const {postId} = router.query;
    console.log(postId);
    /*
    useEffect(() => {
        
        if(postId == null || postId === undefined){
            console.log('null');
        }else{
            console.log(postId);
            setPostId(+postId);
        }
    
    }, [])
    */
    return (
        <Layout pageTitle="Post">
            {postId == null || postId == undefined ? <Loading/> :
             <>
             <PostStateProvider>
                <SinglePostBody  {...{postId:+postId}} />
             </PostStateProvider>
             </>
             } 
        </Layout>
    )
}

export default SinglePost;
