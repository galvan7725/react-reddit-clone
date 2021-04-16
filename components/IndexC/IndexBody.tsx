import React,{ useState, useEffect} from 'react';
import { Container } from 'reactstrap';
import { PostData } from '../interfaces';
import { refreshToken } from '../services/authService';
import { getAllPosts } from '../services/PostService';

const IndexBody = () : JSX.Element => {

    const [posts, setPosts] = useState<Array<PostData>>([]);
    const [loading, setLoading] = useState<boolean>(true);


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
        getPostsData();
    }, [])

    return (
        <Container>
            {posts.length > 0 ? (<><p>{posts.map((p,i)=>JSON.stringify(p))}</p></>) :
            (<>Posts not found</>)
            }
        </Container>
    )
}

export default IndexBody;
