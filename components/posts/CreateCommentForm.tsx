import { Field, Form, Formik, FormikHelpers } from 'formik';
import React from 'react'
import { Button, Col, Row } from 'reactstrap';
import * as Yup from 'yup';
import { createCommentPayload } from '../interfaces';
import MyInput from '../shared/FormikInput';

interface _postId{
    postId:number
}

const CreateCommentForm = ({postId} : _postId): JSX.Element => {
    const creareCommentSchema = Yup.object().shape({
        text : Yup.string().required('Required'),
        postId:Yup.number().required('postId is required'),
        id:Yup.number(),
        createdDate: Yup.string(),
        userName : Yup.string()
    })
    return (
        <Row>
           <Col xs={12} md={{size:11, order:2, offset:1}}>
               <Formik
               initialValues={{
                   text:'',
                   postId:postId,
                   id:0,
                   createdDate:'',
                   userName:''
               }}
               validationSchema={creareCommentSchema}
               onSubmit={(values : createCommentPayload, actions:FormikHelpers<createCommentPayload>)=>console.log('submit',JSON.stringify(values))}
               >
                   {({errors, touched})=>(
                       <Form>
                           <Field type="text" label="" name="text" placeholder="Write a comment" component={MyInput}/>
                           <Button type="submit" color="success" disabled={false}>Comment</Button>
                       </Form>
                   )}
               </Formik>
           </Col>
        </Row>
    )
}

export default CreateCommentForm;
