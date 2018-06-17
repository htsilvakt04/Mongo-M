import { combineReducers } from 'redux';
import { FETCH_CART_DATA_SUCCESS } from '../actions/cart';
import { GET_INIT_ITEM } from '../actions/items';

const email = (state = '', action) => {
    switch (action.type) {
        case 'SIGN_IN':
            return action.data.email;
        case 'GET_USER_CART':
        case 'GET_USER_INFO':
            return action.error ? '' : state;
        case GET_INIT_ITEM:
            return action.data.user.email;
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
        case GET_INIT_ITEM:
            const name = action.data.user.name || '';
            return name;
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

