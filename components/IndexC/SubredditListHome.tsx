import React, { useEffect, useState } from 'react'
import { Spinner } from 'reactstrap';
import { subredditData } from '../interfaces'
import { getSubreddits } from '../services/subredditservice';
import Link from 'next/link';


const SubredditListHome = () => {


    const [subreddits, setSubreddits] = useState<Array<subredditData>>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const getSubredditsData = async () : Promise<void> =>{
        try {
            const response = await getSubreddits();
            if(response.error || !response){
                console.log(response);
                setLoading(false);
            }else{
                setSubreddits(response);
                setLoading(false);
            }
        } catch (error) {
            
        }
    }

    useEffect(() => {
        getSubredditsData();
        return () => {
         setSubreddits([]);
        }
    }, [])

    return (
        <>
            {loading ? (<>
                <div style={{display:'flex',justifyContent: 'center'}}>
                <Spinner color="primary" />
                </div>
            </>) :  (<>
                    {subreddits.length > 0 ? (<>
                        {subreddits.map((subreddit,i) =>(
                            <div className="subreddit-item" key={i}>
                                <Link  href={`/subreddit/${subreddit.id}`}><span>{subreddit.name}</span></Link>
                            </div>
                        ))}
                    </>) : 
                    (<div>Subreddits not found</div>)}
            </>)}
        </>
    )
}

export default SubredditListHome;
;