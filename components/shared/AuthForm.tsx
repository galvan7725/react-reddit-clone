import React from 'react';
import { Col, Container, Row } from 'reactstrap';

interface Props{
    children?: JSX.Element | null,
    formTitle?: string
}

const AuthForm = ({children, formTitle}: Props) => {
    return (
        <>
          <Row style={{marginTop:'5px'}}>
             <Col xs={12} md={{size:6, order:2 , offset:3}}>
                <div className="form-container">
                    <Container className="form-title text-center" style={{backgroundColor:'#f8f9fa'}}>
                        <Col xs={12} md={{size:6, order:2, offset:3}}>
                            <h3>{formTitle}</h3>
                        </Col>
                    </Container>
                    <Container style={{padding:'10px'}}>
                        {children}
                        {/*
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
                              </Form>
                          )}  
                        </Formik>
                        */}
                    </Container>
                </div>
             </Col>
          </Row>    
        </>
    )
}

export default AuthForm;
