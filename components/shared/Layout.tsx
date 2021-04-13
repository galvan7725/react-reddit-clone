import React from 'react'
import { Container } from 'reactstrap';
import Header from './Header';
import Head from 'next/head';

interface Props{
    children: JSX.Element,
    pageTitle: String | null
}

const Layout = ({children, pageTitle}: Props ): JSX.Element=> {
   return (

        <Container fluid>
            <Head>
                <title>Reddit Clone | {pageTitle}</title>
            </Head>
            <Header />
            {children}
        </Container>
    )
   }

export default Layout;
