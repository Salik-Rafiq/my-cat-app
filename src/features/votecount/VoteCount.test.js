/* test the reducers */
import reducer, { initialState, loadVotes, registerVote } from './VoteCountSlice';

const startingState = { ...initialState, votes: [{ "image_id": 123, "value": 0 }, { "image_id": 456, "value": 2 }] };

describe('vote count reducer', () => {
    it('check Initial State', () => {
        expect(reducer(undefined, {}))
            .toEqual(initialState);
    })
    it('read cat votes', () => {
        const catVotes = [{ "image_id": 123, "value": 0 }, { "image_id": 456, "value": 2 }];
        const expected = { status: 'loaded', votes: catVotes };
        expect(reducer(undefined, loadVotes.fulfilled(catVotes)))
            .toEqual(expected);
    });
    it('add cat vote up for cat 1', () => {
        const newCatVotes = { ...startingState, votes: [{ "image_id": 123, "value": 1 }, { "image_id": 456, "value": 2 }] };
        expect(reducer(startingState, registerVote({ "image_id": 123, "value": 1 })))
            .toEqual(newCatVotes);
    })
    it('add cat vote down cat 2', () => {
        const newCatVotes = { ...startingState, votes: [{ "image_id": 123, "value": 0 }, { "image_id": 456, "value": 2 }] };
        expect(reducer(startingState, registerVote({ "image_id": 456, "value": 0 })))
            .toEqual(newCatVotes);
    })
    it('add a new cate vote', () => {
        const newCatVotes = { ...startingState, votes: [{ "image_id": 123, "value": 0 }, { "image_id": 456, "value": 2 }, { "image_id": 395, "value": 1 }] };
        expect(reducer(startingState, registerVote({ "image_id": 395, "value": 1 })))
            .toEqual(newCatVotes);
    })
})
