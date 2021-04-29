import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from 'reactstrap';
import SubredditListHome from './SubredditListHome';

const Sidebar = () : JSX.Element => {

    const router = useRouter();

    return (
        <div className="sidebar-container">
            <div className="sidebar-header">
                <div className="sidebar-header-image">
                    <Image src="/b1.jpg" alt="SidebarHeader" width={500} height={200} />
                </div>
                <div className="sidebar-header-body">
                    <p>Welcome to Reddit clone using Spring Boot and React. Come here to check in with your favorite subreddits</p>
                    <Button block color="primary" onClick={()=>{router.push('/create_post')}} >CREATE POST</Button>
                    <Button block color="primary" outline onClick={()=>{router.push('/create_subreddit')}}>CREATE SUBREDDIT</Button>
                </div>
            </div>
            <div className="sidebar-footer">
                <div className="sidebar-footer-title">
                    <h5>Browse Subreddits</h5>
                    <hr style={{width:'100%'}}/>
                </div>
                <SubredditListHome />
            </div>
            
        </div>
    )
}

export default Sidebar;
