import React from 'react';
import { Col, Row , Button, Container} from 'reactstrap';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import MyInput from './FormikInput';


const Signup = () : JSX.Element => {

    const signupSchema = Yup.object().shape({
        email :Yup.string().email('Invalid Email').required('Required'),
        username :Yup.string().min(5,'Too short').max(50,'Too long').required('Required'),
        password :Yup.string().min(5,'Password in too short').max(50,'Password in too long').required('Password is required')
    })

    const signup = (values, actions) =>{
        alert('Signup works');
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
                                  <Button type="submit" color="success" >Register</Button>
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
