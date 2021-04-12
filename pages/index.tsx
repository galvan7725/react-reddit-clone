import Head from 'next/head'
import Header from '../components/Header'
import 'bootstrap/dist/css/bootstrap.min.css';

const Home = () : JSX.Element => {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header/>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse reiciendis, provident dolor ut nam nobis harum voluptatem vel sed beatae culpa non qui eligendi atque, aspernatur temporibus, nemo facere eos.</p>
      
    </div>
  )
}


export default Home;
