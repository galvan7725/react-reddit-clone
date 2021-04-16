import React from 'react';
import LoginBody from '../components/login/LoginBody';
import Layout from '../components/shared/Layout';

const login = () : JSX.Element => {
    return (
        <Layout pageTitle="Login">
            <LoginBody />
        </Layout>
    )
}

export default login;
