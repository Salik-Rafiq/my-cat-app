import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import { HandThumbsUpFill, HandThumbsDownFill } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import CatApiService from '../app/services/CatApiService';
import { registerVote } from '../features/votecount/VoteCountSlice';

const VoteButtons = ({ id, onClicked = null, onSuccess = null }) => {
    const [voted, setVoted] = useState(false);
    const dispatch = useDispatch();

    const sendVote = async (vote) => {
        if (onClicked) {
            onClicked();  //usually async so loads next one
        }
        try {
            setVoted(true);
            await CatApiService.sendCatVote(id, vote);
            /* register this vote with the Redux */
            dispatch(registerVote({ "image_id": id, "value": vote }));
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