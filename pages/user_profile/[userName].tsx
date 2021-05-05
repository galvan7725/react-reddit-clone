import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout';
import Loading from '../../components/shared/Loading';
import UserProfile from '../../components/userProfile/UserProfile';
import { PostStateProvider } from '../../context/PostContext';

const userProfile = () : JSX.Element => {

    const router = useRouter();
    const [loading, setLoading] = useState<boolean>(true);

    const {userName} = router.query;
    useEffect(() => {
        if(router.isReady){
            setLoading(false);
        }
    },[router.query])

    return (
        <PostStateProvider>
        <Layout pageTitle="User Profile">
            {loading ? <Loading/> 
            :
                <UserProfile {...{userName}} />
           
            }
        </Layout>
        </PostStateProvider>
    )
}

export default userProfile;
