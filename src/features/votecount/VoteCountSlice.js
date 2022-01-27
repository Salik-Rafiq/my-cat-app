import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import CatApiService from "../../app/services/CatApiService";

export const loadVotes = createAsyncThunk('votes/loadVotes', async () => {
    const response = await CatApiService.loadVotes();
    return response.data;
});

const initialState = {
    status: 'empty',
    votes: []
}
const VoteCountReducer = createSlice({
    name: 'vote counts',
    initialState,
    reducers: {
        registerVote(state, action) {
            const newVote = action.payload;
            const existingCatVote = state.votes.find(vote => vote.image_id == newVote.image_id);
            if (existingCatVote) {
                existingCatVote.value += newVote.value;
            } else {
                state.votes.push(newVote);
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(loadVotes.fulfilled, (state, action) => {
            state.status = 'loaded';
            state.votes = action.payload;
        })
    }
});

export const { registerVote } = VoteCountReducer.actions;
export { initialState };
export default VoteCountReducer.reducer;