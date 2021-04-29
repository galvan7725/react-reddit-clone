import React,{useState} from 'react';
import { Col, Row , Button, Container, FormGroup, Spinner, Alert} from 'reactstrap';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import * as Yup from 'yup';
import MyInput from '../shared/FormikInput';
import Link from 'next/link';
import { signUp } from './ApiCalls';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import AuthForm from '../shared/AuthForm';

const MySwal = withReactContent(Swal);

interface UserData {
    email: string,
    username: string,
    password: string
}

const showAlert = (success : boolean) : void =>{
    if(success){
        MySwal.fire({
            title: 'Success!',
            footer:'Reddit Clone',
            text: 'User registered successfully',
            icon:'success',
            timer: 2000
        })
    }else{
        MySwal.fire({
            title: 'Error!',
            footer:'Reddit Clone',
            text:'Error, something went wrong. Please try again.',
            icon:'success',
            timer: 2000
        })
    }
}


const Signup = () : JSX.Element => {

    const [loadign, setLoadign] = useState<boolean>(false);
    const [errors, setErrors] = useState<String>("");
    const [successAlert, setSuccessAlert] = useState<boolean>(false);

    const signupSchema = Yup.object().shape({
        email :Yup.string().email('Invalid Email').required('Required'),
        username :Yup.string().min(5,'Too short').max(50,'Too long').required('Required'),
        password :Yup.string().min(5,'Password in too short').max(50,'Password in too long').required('Password is required')
    })

    const signup = async (values : UserData , actions: FormikHelpers<UserData>) : Promise<any> => {
        //console.log('Signup works'+JSON.stringify(values));
        setLoadign(true);
        setSuccessAlert(false);
        try {
            const response = await signUp(values);
            if (response.error) {
                setLoadign(false);
                setErrors(response.error);
                showAlert(false);
            }else{
                setLoadign(false);
                showAlert(true);
                setSuccessAlert(true);
                console.log("Register Success!");
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
        <Row style={{marginTop:'5px'}}>
          <Col xs={12} md={{size:6, order:2 , offset:3}}>
          <AuthForm formTitle="Resgister">
                    <Formik
                        initialValues={{
                            email: "",
                            username: "",
                            password: ""
                        }}
                        validationSchema={signupSchema}
                        onSubmit={(values, actions)=>signup(values, actions)}
                        >
                          {({errors, touched})=>(
                              <Form>
                                  <Field type="email" label="Email" name="email" component={MyInput} />
                                  <Field type="text" label="Username" name="username" component={MyInput} />
                                  <Field type="password" label="Password" name="password" component={MyInput} />
                                  <div style={{display:'flex'}}>
                                    
                                    <Button type="submit" color="success" disabled={loadign} >Register</Button>
                                    {loadign ? <Spinner color="primary" /> : null}
                                    <label style={{marginLeft:'auto'}} >Existing user?</label>
                                    <Link  href="/login" >Login</Link>
                                  </div>
                                  <div style={{display:'flex',width:'100%', marginTop:'5px'}}>
                                  {successAlert ? <Alert color="success">Register successfully, please check your inbox for activate your account.</Alert> : null}
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

export default Signup;
