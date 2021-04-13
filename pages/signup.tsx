import React from 'react'
import Layout from '../components/shared/Layout';
import Signup from '../components/signup/Signup';

const signup = (): JSX.Element => {
    return (
        <Layout pageTitle="Signup">
            <Signup />
        </Layout>
    )
}

export default signup;
