import { combineReducers } from 'redux';

import { FETCH_CART_DATA_SUCCESS, FETCH_CART_DATA, FETCH_CART_DATA_FAIL } from "../actions/cart";

const isFetching = (state = false, action) => {
    switch (action.type) {
        case FETCH_CART_DATA:
            return true;
        case FETCH_CART_DATA_SUCCESS:
        case FETCH_CART_DATA_FAIL:
            return false;
        default:
            return state;
    }
}
const error = (state = '', action) => {
    if (!action.error) return state;

    switch (action.type) {
        case FETCH_CART_DATA_FAIL:
            return action.error.data;
        default:
            return state;
    }
}

const items = () => {
    const byID = (state = {}, action) => {
        switch (action.type) {
            case FETCH_CART_DATA_SUCCESS:
                return {...state, ...action.data.entities.items}; // normalize here
            default:
                return state;
        }
    }
    const IDs = (state = [], action) => {
        switch (action.type) {
            case FETCH_CART_DATA_SUCCESS:
                return [...state, ...action.data.result]; // normalize here
            default:
                return state;
        }
    }
    return combineReducers({byID, IDs});
}

export default combineReducers({isFetching, error, items: items()});

// selectors here

export const getListItem = (state) => state.items.IDs.map(id => state.items.byID[id]);
export const getError = (state) => state.error;
export const getIsFetching = (state) => state.isFetching;