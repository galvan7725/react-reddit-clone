import React, { useState } from 'react';
import AuthForm from '../shared/AuthForm';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Alert, Button, Col, Row, Spinner } from 'reactstrap';
import Link from 'next/link';
import * as Yup from 'yup';
import MyInput from '../shared/FormikInput';
import { Login, saveToken } from './ApiCalls';
import { useRouter } from 'next/router';


interface LoginData {
  username: string,
  password: string
}



const LoginBody = (): JSX.Element=> {

  const router = useRouter();


  const [loadign, setLoadign] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [errorStatus, setErrorStatus] = useState<number>(null);

  const loginSchema = Yup.object().shape({
    username: Yup.string().min(5,'Too short').max(50,'Too long').required('Username is required'),
    password: Yup.string().min(5,'Too short').max(50,'Too long').required('Password is required')
  });

  const login = async(values : LoginData, actions: FormikHelpers<LoginData>) : Promise<any> => {
      setLoadign(true);
      setError("");
      setErrorStatus(null);

      try {
        const response = await Login(values);
        if (response == null || response.error){
          console.log(response);
          setLoadign(false);
          setError(response.trace || response.error);
          setErrorStatus(response.status);
          console.log(response);
        }else{
          setLoadign(false);
          saveToken(response);
          router.push('/');
          //console.log('Success',response);

        }
      } catch (error) {
        setLoadign(false);
        console.log(error);
      }
  }

  const getAlert = (message : string, status : number) : React.ReactNode => {
      if(message.includes("User is disabled\r\n\tat")){
        return (<><Alert style={{width:'100%'}} color="warning">Your acouunt isn´t active, please check your email</Alert></>)
      }else if(message.includes("Bad credentials\r\n\tat")){
        return (<><Alert style={{width:'100%'}} color="warning">The username and password don´t match</Alert></>)
      }else if(message.includes("Forbidden")){
        return (<><Alert style={{width:'100%'}} color="warning">The username and password don´t match</Alert></>)
      }
      else if(status == 500){
        return (<><Alert style={{width:'100%'}} color="warning">Internal Server Error, please try again</Alert></>)
      }else{
        return (<><Alert style={{width:'100%'}} color="warning">We have a problem with the server, please try again later</Alert></>)
      }
  }
    return (
        <>
        <Row style={{marginTop:'5px'}}>
          <Col xs={12} md={{size:6, order:2 , offset:3}}>
          <AuthForm formTitle="Login">
                      <Formik
                        initialValues={{
                            username: "",
                            password: ""
                        }}
                        validationSchema={loginSchema}
                        onSubmit={(values, actions)=>login(values, actions)}
                        
                        >
                          {({errors, touched})=>(
                              <Form>
                                  <Field type="text" label="Username" name="username" component={MyInput} onchange={()=>()=>console.log('tuched')} />
                                  <Field type="password" label="Password" name="password" component={MyInput} />
                                  <div style={{display:'flex'}}>
                                    <Button type="submit" color="success" disabled={loadign} >Login</Button>
                                    {loadign ? <Spinner color="primary" /> : null}
                                    <label style={{marginLeft:'auto'}} >Dont have a acount?</label>
                                    <Link  href="/signup" >SignUp</Link>
                                  </div>
                                  <div style={{display:'flex',width:'100%', marginTop:'5px'}}>
                                  {error.length > 0 ? getAlert(error, errorStatus) : null}
                                  </div>
                              </Form>
                          )}  
                          </Formik>
          </AuthForm> 
          </Col>
          </Row>
        </>
    )
}

export default LoginBody;
