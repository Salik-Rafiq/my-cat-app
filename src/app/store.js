import { configureStore } from "@reduxjs/toolkit";
import VoteCountReducer from '../features/votecount/VoteCountSlice'

export default configureStore({
    reducer: {
        voteCount: VoteCountReducer
    }
});