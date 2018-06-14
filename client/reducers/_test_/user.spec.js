import user from '../user';

describe('Reducer: user', () => {
    const generateAction = (auth = false, type = 'SIGN_IN') =>
         auth ?
             {data: {email: 'someone@gmail.com', name: 'siva'}, type}
             : {data: {}, type};

    it('Should return correct default structure', () => {
        const actual = user(undefined, generateAction());
        const expected = {email: '', name: '', cart: null};
        
        expect(actual).toEqual(expected);
    })

    describe('Action: SIGN_IN', () => {
        it('Should update the user field in store if the request is good and authenticated', () => {
            const actual = user(undefined, generateAction(true));
            const expected = {email: 'someone@gmail.com', name: 'siva', cart: null};

            expect(actual).toEqual(expected);
        })
        it('return default state if the request is not authenicated', () => {
            const actual = user(undefined, generateAction(false));
            const expected = {email: '', name: '', cart: null};
            expect(actual).toEqual(expected);
        })
    });
    describe('Action: GET_USER_CART', () => {
        it('Should convert the state back to default if somehow the user request is not authenticated anymore (session expired, remove cookie...)', () => {
            const action = {
                type: 'GET_USER_CART',
                data: {},
                error: true
            }
            const actual = user(undefined, action);
            const actual2 = user({email: 'silva@gmail.com', name: 'silva', cart: []}, action);
            const expected = {email: '', name: '', cart: null};
            expect(actual).toEqual(expected);
            expect(actual2).toEqual(expected);
        })
    });

});