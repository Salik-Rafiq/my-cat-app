import React from 'react';
import { useSelector } from 'react-redux';
import { getCatVoteById } from './VoteCountSlice';

const VoteCount = ({ catId }) => {
    const catVotes = useSelector(state => getCatVoteById(state.voteCount, catId));

    return (<p>Votes: {catVotes ? catVotes : '--'}</p>);
}

export default VoteCount;