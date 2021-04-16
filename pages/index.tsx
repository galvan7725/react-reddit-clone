import React, { useState, useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { Row } from 'reactstrap';
import { getJWT } from '../components/services/authService';
import { useRouter } from 'next/router';
import Loading from '../components/shared/Loading';

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
        <Row >
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, expedita qui ipsam veniam id, dolore vitae eveniet ratione corporis voluptates facilis inventore aspernatur? Iste, voluptatum. Distinctio, sit. Consequuntur, fugiat asperiores!</p>

        </Row>
      </Layout>
      )}
    </>    
  )
}


export default Home;
