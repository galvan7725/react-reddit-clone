import React,{ useState, useEffect} from 'react';
import { Col, Container } from 'reactstrap';
import { PostStateProvider, useChangePostStatus } from '../../context/PostContext';
import { PostData } from '../interfaces';
import { refreshToken } from '../services/authService';
import { getAllPosts } from '../services/PostService';
import Loading from '../shared/Loading';
import PostContainer from './PostContainer';
import Sidebar from './Sidebar';

const IndexBody = () : JSX.Element => {

    const [posts, setPosts] = useState<Array<PostData>>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [changeData, setChangeData] = useState<boolean>(false);

    const handleVoteEvent = (success: boolean) : void => {
        setChangeData(true);
    }

    const {state} =  useChangePostStatus();

    const getPostsData = async () : Promise<void> => {
        try {
            const response = await getAllPosts();
               if(response == null || response.error){
                   setLoading(false);
                  //getPostsData();
               }else{
                   setLoading(false);
                   setPosts(response);
                   console.log(response);
               }
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {  
        console.log(state.status);
        getPostsData();
    }, [state.status])

    return (
        <Container>
            {
                loading ? (
                    <Loading/>
                ) : (
                        <>
                        <Col xs={12} md={8}>
                            {posts.length > 0 ? (<>
                                {posts.map((post,i)=>{
                                    return(
                                        <Col xs={12} md={12}>
                                                    <PostContainer {...post} {...handleVoteEvent}/>
                                        </Col> 
                                    )
                                })}
                            </>) : (<>
                                <p>Posts not found</p>
                            </>)}
                        </Col>
                        <Col xs={12} md={4}>
                            <Sidebar />
                        </Col>
                       </>
                    )
            }
        </Container>
    )
}

export default IndexBody;