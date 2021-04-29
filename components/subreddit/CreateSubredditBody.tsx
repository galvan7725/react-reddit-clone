import React, { useState } from 'react'
import { Field, Form, Formik, FormikHelpers } from 'formik';
import AuthForm from '../shared/AuthForm';
import * as Yup from 'yup';
import MyInput from '../shared/FormikInput';
import { Button } from 'reactstrap';
import { subredditData } from '../interfaces';
import { createSubreddit } from '../services/subredditservice';
import { useRouter } from 'next/router';

const CreateSubredditBody = () : JSX.Element=> {


    const [loading, setLoading] = useState<boolean>(false);

    const router = useRouter();
    const createSubredditSchema = Yup.object().shape({
        name: Yup.string().min(3,'Name is too short').max(50, 'Name is too long').required('Name is required'),
        description: Yup.string().min(3,'Description is too short').max(400, 'Description is too long').required('Description is required')
    })

    const createSubredditCall = async(values : subredditData) : Promise<void> => {
        try {
            const response = await createSubreddit(values);
            if(response == null || response.error){
                throw new Error(response);
            }else{
                console.log('subreddit created successfully');
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <AuthForm formTitle="Create Subreddit">
            <Formik
            initialValues={{
                id : 0,
                name: '',
                description: '',
                numberOfPosts:0
            }}
            validationSchema={createSubredditSchema}
            onSubmit={(values : subredditData, actions: FormikHelpers<subredditData>)=>{createSubredditCall(values)}}
            >
                {({errors, touched})=>(
                    <Form>
                        <Field type="text" label="Subreddit Name" name="name" component={MyInput}  />
                        <Field type="textarea" label="Description" name="description" component={MyInput}/>
                        <Button type="submit" color="primary">Create</Button>
                        <Button type="button"  color="danger" onClick={() =>{}} style={{marginLeft:'5px'}}>Cancel</Button>
                    </Form>
                )}

            </Formik>
        </AuthForm>
    )
}

export default CreateSubredditBody;
