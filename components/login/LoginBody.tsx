import React, { useState } from 'react';
import AuthForm from '../shared/AuthForm';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { Alert, Button, Spinner } from 'reactstrap';
import Link from 'next/link';
import * as Yup from 'yup';
import MyInput from '../shared/FormikInput';
import { Login, saveToken } from './ApiCalls';


interface LoginData {
  username: string,
  password: string
}


const LoginBody = (): JSX.Element=> {


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
        if (response.error){
          console.log(response);
          setLoadign(false);
          setError(response.trace);
          setErrorStatus(response.status);
          console.log(response);
        }else{
          setLoadign(false);
          saveToken(response);
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
      }else if(status == 500){
        return (<><Alert style={{width:'100%'}} color="warning">Internal Server Error, please try again</Alert></>)
      }else{
        return (<><Alert style={{width:'100%'}} color="warning">We have a problem with the server, please try again later</Alert></>)
      }
  }
    return (
        <>
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
        </>
    )
}

export default LoginBody;
