import { Field, Form, Formik } from 'formik';
import React, { useState, useEffect } from 'react'
import { Button, Col, Container, Row, Spinner } from 'reactstrap';
import AuthForm from '../shared/AuthForm';
import * as Yup from 'yup';
import MyInput from '../shared/FormikInput';
import MyInputSelect from '../shared/FormikInputSelect';
import { subredditData } from '../interfaces';
import { getSubreddits } from '../services/subredditservice';
import CreatePostForm from './CreatePostForm';

const CreatePostBody = () => {

    const [subreddits,setSubreddits] = useState<Array<subredditData>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [subredditSelected, setSubredditSelected] = useState<string>("");

    const createPostSchema = Yup.object().shape({
        description: Yup.string().min(5,'Too short').max(50,'Too long').required('Description is required'),
        postName : Yup.string().min(3,'Too short').max(50,'Too long').required('Post name is required'),
        subredditName: Yup.string(),
        url : Yup.string().min(5,'Too short').max(100,'Too long').required('URL is required')
    })

    const getSubredditsData = async () : Promise<void> =>{
        try {
            const response = await getSubreddits();
            if(response.error || response == null){
                setLoading(false);
            }else{
                setSubreddits(response);
                setLoading(false);
            }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getSubredditsData();
        return () => {
            setSubreddits([]);
        }
    }, [])

    const handleSelect = () =>{
        console.log("handleSelect");
    }

    const subredditSelect = (options: Array<subredditData>,name: string) : JSX.Element =>{
        return (
            <>
         <><Field as="select" name="subredditName">
         {subreddits.map((o,i)=>{
                    return (
                        <><option value={o.name}>{o.name}</option></>
                    )
                })}
            </Field></>)
    
            </>
        )
    }

    return (
       <CreatePostForm />
    )

    
}


export default CreatePostBody;
