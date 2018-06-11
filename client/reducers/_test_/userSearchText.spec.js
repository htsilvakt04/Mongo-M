import userSearchText from '../userSearchText';

describe('Reducer: userSearchText', () => {
    let stateBefore = 'something is nice';
    let stateAfter = 'Kitchen';

    it('have initial state as expected', () => {
        expect(userSearchText(undefined, {})).toEqual('');
    })
    it('return new state if UPDATE_USER_INPUT action is dispatched', () => {
        expect(userSearchText(stateBefore, {type: 'UPDATE_USER_INPUT', input: 'Kitchen'})).toEqual(stateAfter);
    })
    it('return current state if receive weird action type', () => {
        expect(userSearchText(stateBefore, {type: 'GET_INIT_ITEM', input: 'Kitchen'})).toEqual('something is nice');
    })
})