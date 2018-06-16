import { combineReducers } from 'redux';

const email = (state = '', action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return action.data.email;
        case 'GET_USER_CART':
        case 'GET_USER_INFO':
            return action.error ? '' : state;
        default:
            return state;
    }
}
const name = (state = '', action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return action.data.name;
        case 'GET_USER_CART':
        case 'GET_USER_INFO':
            return action.error ? '' : state;
        default:
            return state;
    }
}

const cart = (state = {}, action) => {
    switch (action.type) {
        case 'GET_USER_CART':
        case 'GET_USER_INFO':
            if (action.error) {
                return state;
            }
            return action.data.cart;
        default:
            return state;
    }
}

export default combineReducers({email, name, cart});

// some selector here
export const getUser = (state) => state;
export const getUserEmail = (state) => state.email;
export const getUserName = (state) => state.name;
export const isUserExist = (state) => Boolean(state.email);

export const getUserCart = (state) => state.cart;

