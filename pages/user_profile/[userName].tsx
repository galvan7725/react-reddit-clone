import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Layout from '../../components/shared/Layout';
import Loading from '../../components/shared/Loading';

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
        <Layout pageTitle="User Profile">
            {loading ? <Loading/> : <h1>{userName}</h1>}
        </Layout>
    )
}

export default userProfile;
