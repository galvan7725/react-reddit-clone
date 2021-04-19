import { faArrowDown, faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { Col } from 'reactstrap';
import { VoteCountData } from '../interfaces';

const VoteCount = ({voteCount}: VoteCountData ): JSX.Element => {
    return (
        <Col xs={1} md={1}>
            <div className="votes-container">
                <div className="votes-section">
                    <FontAwesomeIcon icon={faArrowUp} />
                </div>
                <div className="votes-section">
                    <div>{voteCount == null ? 0 : voteCount}</div>
                </div>
                <div className="votes-section">
                    <FontAwesomeIcon icon={faArrowDown} />
                </div>
            </div>
        </Col>
    )
}

export default VoteCount;
