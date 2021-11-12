import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';
import CatApiService from '../app/services/CatApiService';

const VoteButtons = ({ id, onSuccess }) => {
    const [voted, setVoted] = useState(false);

    const sendVote = async (vote) => {
        try {
            setVoted(true);
            await CatApiService.sendCatVote(id, vote);
            if (onSuccess) {
                onSuccess();
            }
        } catch {
            alert("An error occured while voting. Try again");
        }
        finally {
            setVoted(false);
        }
    }

    return (
        <>
            <Button variant="success" disabled={voted} onClick={() => sendVote(1)}
            >Vote Up&nbsp;<HandThumbsUpFill /></Button>&nbsp;
            <Button disabled={voted} variant="danger" onClick={() => sendVote(0)}>
                <HandThumbsDownFill />&nbsp;Vote Down</Button>
        </>
    )
}

export default VoteButtons;