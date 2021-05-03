import { Field, Form, Formik, FormikHelpers } from 'formik';
import React, { useState } from 'react'
import { Button, Col, Row, Spinner } from 'reactstrap';
import * as Yup from 'yup';
import { commentPayload } from '../interfaces';
import { createComment } from '../services/commentService';
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

    const [loading, setLoading] = useState<boolean>(false);


    const createCommentCall = async(data :commentPayload) : Promise<void> => {
        try {
            setLoading(true);
            const response = await createComment(data);
            if (response == null || !response.data) {
                console.log(response);
                setLoading(false);
            }else{
                console.log(response);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

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
               onSubmit={(values : commentPayload, actions:FormikHelpers<commentPayload>)=>createCommentCall(values)}
               >
                   {({errors, touched})=>(
                       <Form>
                           <Field type="text" label="" name="text" placeholder="Write a comment" component={MyInput}/>
                           <Button type="submit" color="primary" disabled={loading}>Comment</Button>
                           {loading ? <Spinner color="primary"/> : null}
                       </Form>
                   )}
               </Formik>
           </Col>
        </Row>
    )
}

export default CreateCommentForm;
