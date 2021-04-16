import React, { useState, useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { Row } from 'reactstrap';
import { getJWT } from '../components/services/authService';
import { useRouter } from 'next/router';
import Loading from '../components/shared/Loading';
import IndexBody from '../components/IndexC/IndexBody';

const Home = () : JSX.Element => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if(getJWT() == null) {
      setLoading(false);
      router.push('/login');
    }else{
      setLoading(false);
      setIsLogin(true);
    }
  }, [])

  return (
    <>
      {loading || !isLogin ? (
       <Loading />
      ) 
      : (
        <Layout pageTitle="Inicio">
            <IndexBody />
        </Layout>
      )}
    </>    
  )
}


export default Home;
