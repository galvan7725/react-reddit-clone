import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import { Col } from 'reactstrap';
import { subredditData } from '../interfaces';
import { getSubreddits } from '../services/subredditservice';
import Loading from '../shared/Loading';

const ListSubreddits = (): JSX.Element => {

    const [subreddits, setSubreddits] = useState<Array<subredditData>>([]);
    const [loading, setLoading] = useState<boolean>(true);


    const getSubredditsData = async (): Promise<void> => {
        try {
            const response = await getSubreddits();
            if (response == null || response.error) {
                setLoading(false);
            } else {
                setSubreddits(response.reverse());
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
            {loading ? <Loading /> :
                (<Col xs={12} md={{size:6, order:2, offset:1}} style={{marginTop:'10px'}}>
                    <h3>List of Subreddits</h3>
                    {subreddits.length > 0 ?
                        (<div className="subreddit-list-container">
                            {subreddits.map((subreddit, i) => (
                                <span className="subreddit-list-item" key={i}><Link href={`/subreddits/${subreddit.id}`}><span>&#9658;{subreddit.name}</span></Link></span>
                            ))}
                        </div>)
                        : <h1>Subreddits not found</h1>}
                </Col>)}
        </>
    )
}

export default ListSubreddits;
