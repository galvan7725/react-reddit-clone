import React from 'react'
import Layout from '../components/shared/Layout';
import SignupBody from '../components/signup/SignupBody';
import { GetServerSideProps } from 'next';


/*
export const getServerSideProps : GetServerSideProps = async ()=>{
    const res = await     
}
*/

const signup = (): JSX.Element => {
    return (
        <Layout pageTitle="Signup">
            <SignupBody />
        </Layout>
    )
}

export default signup;
