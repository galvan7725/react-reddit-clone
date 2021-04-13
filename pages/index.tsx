import Head from 'next/head'
import Header from '../components/shared/Header'
import Layout from '../components/shared/Layout';
import { Row } from 'reactstrap';

const Home = () : JSX.Element => {
  return (
    <Layout pageTitle="Inicio">
      <Row >
       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, expedita qui ipsam veniam id, dolore vitae eveniet ratione corporis voluptates facilis inventore aspernatur? Iste, voluptatum. Distinctio, sit. Consequuntur, fugiat asperiores!</p>

      </Row>
    </Layout>
  )
}


export default Home;
