import React,{useState} from 'react';
import { Col, Row , Button, Container, FormGroup} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MyInput from './FormikInput';
import Link from 'next/link';
import { signUp } from './ApiCalls';



const Signup = () : JSX.Element => {

    const [loadign, setLoadign] = useState<boolean>(false);
    const [erros, setErros] = useState<String>("");
    const signupSchema = Yup.object().shape({
        email :Yup.string().email('Invalid Email').required('Required'),
        username :Yup.string().min(5,'Too short').max(50,'Too long').required('Required'),
        password :Yup.string().min(5,'Password in too short').max(50,'Password in too long').required('Password is required')
    })

    const signup = async (values, actions) : Promise<any> => {
        console.log('Signup works'+JSON.stringify(values));
        setLoadign(true);
        try {
            const response = await signUp(values);
            if (response.error) {
                setLoadign(false);
                setErros(response.error);
            }else{
                setLoadign(false);
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
                <div className="form-container">
                    <Container className="form-title text-center" style={{backgroundColor:'#f8f9fa'}}>
                        <Col xs={12} md={{size:6, order:2, offset:3}}>
                            <h3>Register</h3>
                        </Col>
                    </Container>
                    <Container style={{padding:'10px'}}>
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
                                    <Button type="submit" color="success" >Register</Button>
                                    <label style={{marginLeft:'auto'}} >Existing user?</label>
                                    <Link  href="/login" >Login</Link>
                                  </div>
                              </Form>
                          )}  
                        </Formik>
                    </Container>
                </div>
             </Col>
          </Row>  
        </>
    )
}

export default Signup;
