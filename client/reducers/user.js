import { combineReducers } from 'redux';

import { FETCH_CART_DATA_SUCCESS } from '../actions/cart';

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

export default combineReducers({email, name});

// some selectors here
export const getUser = (state) => state;
export const getUserEmail = (state) => state.email;
export const getUserName = (state) => state.name;
export const isUserExist = (state) => Boolean(state.email);

export const getUserCart = (state) => state.cart;

