import React, { useEffect, useState } from 'react'
import { Spinner } from 'reactstrap';
import { subredditData } from '../interfaces'
import { getSubreddits } from '../services/subredditservice';
import Link from 'next/link';


const SubredditListHome = () => {


    const [subreddits, setSubreddits] = useState<Array<subredditData>>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const formatSubreddits =(subreddits_ : Array<subredditData>) : Array<subredditData> =>{
        if(subreddits_.length > 3){
            return subreddits_.slice(0, 3);
        }else{
            return subreddits_;
        }
    }

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
                    {formatSubreddits.length > 0 ? (<>
                        {subreddits.map((subreddit,i) =>(
                            <div className="subreddit-item" key={i}>
                                <Link  href={`/subreddit/${subreddit.id}`}><span className="subreddit-link">{subreddit.name}</span></Link>
                            </div>
                        ))}
                        {subreddits.length > 3 ? (
                            <div>
                                <Link href={`/subreddits/all`}><span className="subreddit-link">View all</span></Link>
                            </div>
                        ) : (<></>)}
                    </>) : 
                    (<div>Subreddits not found</div>)}
            </>)}
        </>
    )
}

export default SubredditListHome;
;