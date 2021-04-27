import React,{ useState,useContext } from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Spinner } from 'reactstrap';
import { VoteCountData } from '../interfaces';
import { setVote } from '../services/PostService';
import { useChangePostStatus } from '../../context/PostContext';
import ErrorHandler from '../Util/ErrorHandler';


const VoteCount = ({voteCount,postId,upVote,downVote}: VoteCountData ): JSX.Element => {

    const [loading, setLoading] = useState<boolean>(false);

    const {dispatch} = useChangePostStatus();

    const upVoteCall = async(postId:number) : Promise<void> => {
        try {
            const response = await setVote({postId: postId, voteType: 'UPVOTE'});
            if (response.error || response != 200){
                console.log(response);
                ErrorHandler(response.message, response.trace);
            }else{
                dispatch({type:'changeStatus'});
            }
        } catch (error) {
            //handleVote(false);
            console.log(error);
        }
    }

    const downVoteCall = async(postId: number): Promise<void> => {
        try {
            const response = await setVote({postId: postId, voteType: 'DOWNVOTE'});
            if (response.error || response != 200){
                console.log(response);
                ErrorHandler(response.message, response.trace);
            }else{
                dispatch({type:'changeStatus'});
            }
        } catch (error) {
            //handleVote(false);
            console.log(error);
        }
    }

    const voteUpButtonStyle = {
        color: upVote ? 'blue' : 'black'
    }

    const voteDownButtonStyle = {
        color: downVote ? 'blue' : 'black'
    }

    return (
        <Col xs={1} md={1}>
            <div className="votes-container">
                <div className="votes-section">
                    {loading ? (<><Spinner color="primary" /></>) :
                     (<span className="vote-icons" onClick={()=>{upVoteCall(postId)}} style={voteUpButtonStyle}><FontAwesomeIcon icon={faArrowUp} /></span>)}
                </div>
                <div className="votes-section">
                    <div>{voteCount == null ? 0 : voteCount}</div>
                </div>
                <div className="votes-section">
                    <span className="vote-icons" onClick={()=>{downVoteCall(postId)}} style={voteDownButtonStyle}><FontAwesomeIcon icon={faArrowDown} /></span>
             
                </div>
                
            </div>
        </Col>
    )
}

export default VoteCount;
