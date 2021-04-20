import React, { useState, useEffect } from 'react';
import Layout from '../components/shared/Layout';
import { Row } from 'reactstrap';
import { getJWT } from '../components/services/authService';
import { useRouter } from 'next/router';
import Loading from '../components/shared/Loading';
import IndexBody from '../components/IndexC/IndexBody';
import { PostStateProvider } from '../context/PostContext';
import { ToastContainer } from 'react-toastify';

const Home = (): JSX.Element => {

  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(true);
  const [isLogin, setIsLogin] = useState<boolean>(false);

  useEffect(() => {
    if (getJWT() == null) {
      setLoading(false);
      router.push('/login');
    } else {
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
          <>
            <Layout pageTitle="Inicio">
              <PostStateProvider>
                <IndexBody />
              </PostStateProvider>
            </Layout>
            <ToastContainer
              position="top-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
            />
            {/* Same as */}
            <ToastContainer />
          </>
        )}
    </>
  )
}


export default Home;
