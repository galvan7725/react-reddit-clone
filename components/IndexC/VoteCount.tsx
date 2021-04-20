import React,{ useState,useContext } from 'react';
import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Spinner } from 'reactstrap';
import { VoteCountData } from '../interfaces';
import { postUpVote,postDownVote } from '../services/PostService';
import { useChangePostStatus } from '../../context/PostContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

type Action = {type: 'setFalse'} | {type : 'setTrue'};
type Dispatch = (action : Action) => void;
type State = {status :  boolean};

const VoteCount = ({voteCount,postId}: VoteCountData ): JSX.Element => {

    const [loading, setLoading] = useState<boolean>(false);

    const {dispatch} = useChangePostStatus();

    const upVote = async(postId:number) : Promise<void> => {
        try {
            const response = await postUpVote({postId: postId, voteType: 'UPVOTE'});
            if (response.error || response != 200){
                console.log(response);
            }else{
                notifyVote();
                dispatch({type:'changeStatus'});
            }
        } catch (error) {
            //handleVote(false);
            console.log(error);
        }
    }

    const downVote = async(postId: number): Promise<void> => {
        try {
            const response = await postDownVote({postId: postId, voteType: 'DOWNVOTE'});
            if (response.error || response != 200){
                console.log(response);
            }else{
                dispatch({type:'changeStatus'});
            }
        } catch (error) {
            //handleVote(false);
            console.log(error);
        }
    }

    const notifyVote = () => {
        console.log('toast');
        toast('🦄 Wow so easy!', {
                                    position: "top-right",
                                    autoClose: 5000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    pauseOnHover: true,
                                    draggable: true,
                                    progress: undefined,
                                    });     

                                }
    return (
        <Col xs={1} md={1}>
            <div className="votes-container">
                <div className="votes-section">
                    {loading ? (<><Spinner color="primary" /></>) :
                     (<span className="vote-icons" onClick={()=>{upVote(postId)}}><FontAwesomeIcon icon={faArrowUp} /></span>)}
                </div>
                <div className="votes-section">
                    <div>{voteCount == null ? 0 : voteCount}</div>
                </div>
                <div className="votes-section">
                    <span className="vote-icons" onClick={()=>{downVote(postId)}}><FontAwesomeIcon icon={faArrowDown} /></span>
             
                </div>
                
            </div>
        </Col>
    )
}

export default VoteCount;
