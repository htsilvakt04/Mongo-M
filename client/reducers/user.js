const user = (state = {email: '', name: '', cart: null}, action) => {

    switch (action.type) {
        case 'SIGN_IN':
            return {...state, ...action.data};
        case 'GET_USER_CART':
        case 'GET_USER_INFO':
            return action.error ? {email: '', name: '', cart: null} : state;
        default:
            return state;
    }

}

// some selector here
export const getUser = (state) => state;

export default user;