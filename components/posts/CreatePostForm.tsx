import React, { useState, useEffect} from 'react'
import {FormGroup, Label, Input, FormFeedback, Spinner, Button, Row, Col } from 'reactstrap';
import { createPostData, subredditData } from '../interfaces';
import AuthForm from '../shared/AuthForm';
import { getSubreddits } from '../services/subredditservice';
import ErrorHandler from '../Util/ErrorHandler';
import validator from 'validator';
import { createPost } from '../services/PostService';
import { useRouter } from 'next/router';
import { createPostSuccess } from '../Util/NotificationHandler';

interface createPostValidationsErrors {
    postNameError : string,
    subredditNameError: string,
    urlError: string,
    descriptionError: string
}

const CreatePostForm = () => {

    const initialValues = {
        postName: '',
        description:'',
        id: 0,
        url:'',
        subredditName:''
    }

    const initialErrorValues = {
        postNameError: '',
        urlError:'',
        subredditNameError:'',
        descriptionError:''
    }

    const [subreddits, setSubreddits] = useState<Array<subredditData>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [values, setValues] = useState<createPostData>(initialValues);
    const [validations, setValidations] = useState<createPostValidationsErrors>(initialErrorValues);
    const [loadingSubmit, setLoadingSubmit] = useState<boolean>(false);
    const router = useRouter();

    const getSubredditsData = async() : Promise<void> => {
        try {
            const response = await getSubreddits();
            if (response.error || response == null){
                setLoading(false);
                ErrorHandler('','');
            }else{
                setSubreddits(response);
                response.length > 0 ? setValues({...values,subredditName:response[0].name}) : {} ;
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

    const isValid = () : boolean =>{
        let aux = true;
        let auxO = {
            postNameError: '',
            urlError:'',
            subredditNameError:'',
            descriptionError:''
        }
        if(!validator.isLength(values.postName,{min:1,max:100}) || validator.isEmpty(values.postName.trim())){
                //error
                //setValidations({...validations,postNameError:'Post Name must be between 1 and 100 characters'});
                auxO.postNameError = 'Post Name must be between 1 and 100 characters';
                aux = false;
        } 
        if(validator.isEmpty(values.url) || !validator.isURL(values.url)){
                //error
                //setValidations({...validations,urlError: 'Invalid URL'});
                auxO.urlError = 'Invalid URL';
                aux = false;
        }
        if(validator.isEmpty(values.subredditName)){
                //error
                //setValidations({...validations,subredditNameError: 'Invalid subreddit name'})
                auxO.subredditNameError = 'Invalid subreddit name';
                aux = false;
        }
        if(validator.isEmpty(values.description) || !validator.isLength(values.description,{min: 2, max:200})){
                //error
                //setValidations({...validations,descriptionError:'Post description must be between 2 and 200 characters'})
                auxO.descriptionError = 'Post description must be between 2 and 200 characters';
                aux = false;
        }
        setValidations(auxO);
        return aux;
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        setValues({...values,[event.target.name]: event.target.value});
        switch (event.target.name) {
            case 'postName':
                setValidations({...validations,postNameError:''});
                break;
            case 'description':
                setValidations({...validations,descriptionError:''});
                break;
            case 'url':
                setValidations({...validations,urlError:''});
                break;
            case 'subredditName':
                setValidations({...validations,subredditNameError:''});
                break;
            default:
                break;
        }
    }

    const submit = async(event : React.FormEvent<HTMLFormElement>) : Promise<void> => {
            event.preventDefault();
            console.log('submit');
            if(isValid()){
                setLoadingSubmit(true);
                try {
                    const response = await createPost(values);
                    if(response.error || response == null){
                        console.log(response);
                        setLoadingSubmit(false);
                    }else{
                        setLoadingSubmit(false);
                        createPostSuccess();
                        router.push('/');
                    }
                } catch (error) {
                    console.log(error);
                }
            }else{

            }
    }

    return (
        <Row style={{marginTop:'5px'}}>
          <Col xs={12} md={{size:6, order:2 , offset:3}}>
        <AuthForm formTitle="Create Post">
            <>
            <form onSubmit={submit}>
            <FormGroup>
                <Label for="postName">Post Name</Label>
                <Input type="text"  name="postName" onChange={handleChange}/>
                {validations.postNameError.length > 0 ? <FormFeedback style={{display:'flex'}}>{validations.postNameError}</FormFeedback> : null}
            </FormGroup>
            <FormGroup>
                <Label for="subredditName">Subreddit Name</Label>
                {loading ? (
                    <Spinner color="primary" />
                ) : (
                    <Input type="select"  name="subredditName" onChange={handleChange}>
                    {subreddits.length > 0 ? (
                        <>
                        {subreddits.map((subreddit,i)=>(
                            <option key={i} value={subreddit.name}>{subreddit.name}</option>
                        ))}
                        </>
                    ) :
                    (<>
                    
                    </>)}
                </Input>
                )}
                {validations.subredditNameError.length > 0 ? <FormFeedback style={{display:'flex'}}>{validations.subredditNameError}</FormFeedback> : null}
            </FormGroup>
            <FormGroup>
                <Label for="url">url</Label>
                <Input type="text"  name="url" onChange={handleChange}/>
                {validations.urlError.length > 0 ? <FormFeedback style={{display:'flex'}}>{validations.urlError}</FormFeedback> : null}
            </FormGroup>
            <FormGroup>
                <Label for="description">Post Description</Label>
                <Input type="textarea"  name="description" onChange={handleChange}/>
                {/*<textarea name="description" id="description" onChange={handleChange} cols={30} rows={10}></textarea>*/}
                {validations.descriptionError.length > 0 ? <FormFeedback style={{display:'flex'}}>{validations.descriptionError}</FormFeedback> : null}
            </FormGroup>
            <div>
                <Button type="submit" color="success" disabled={loading || loadingSubmit}>Submit</Button>
                <Button type="button" color="danger">Cancel</Button>
            </div>
            </form>
            </>
        </AuthForm>
        </Col>
        </Row>
    )
}

export default CreatePostForm;
