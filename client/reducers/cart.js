import { combineReducers } from 'redux';
import { GET_INIT_ITEM } from '../actions/items';
import {
    FETCH_CART_DATA_SUCCESS, FETCH_CART_DATA, FETCH_CART_DATA_FAIL,
    ADD_ITEM_TO_CART_SUCCESS, CHANGE_ITEM_QUANTITY_SUCCESS, CHANGE_ITEM_QUANTITY_FAIL,
    REMOVE_ITEM_FAIL, REMOVE_ITEM_SUCCESS
} from '../actions/cart';

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
    const item = (state = {}, action) => { // mini reducer
        switch (action.type) {
            case ADD_ITEM_TO_CART_SUCCESS:
                return {
                    [action.item._id]: {
                        ...action.item
                    }
                }
            case CHANGE_ITEM_QUANTITY_SUCCESS:
            case CHANGE_ITEM_QUANTITY_FAIL:
                return {
                    [state._id]: {
                        ...state,
                        quantity: action.quantity
                    }
                }
            case REMOVE_ITEM_FAIL:
                return {
                    [action.item._id]: {
                        ...action.item
                    }
                }
            default:
                return state;
        }
    }

    const byID = (state = {}, action) => {
        switch (action.type) {
            case GET_INIT_ITEM:
                if (action.data.cart.error) return state
                return {...action.data.cart.entities.items}
            case FETCH_CART_DATA_SUCCESS:
                return {...action.data.entities.items} // normalize here
            case ADD_ITEM_TO_CART_SUCCESS:
                return {...state, ...item(undefined, action)}
            case CHANGE_ITEM_QUANTITY_SUCCESS:
            case CHANGE_ITEM_QUANTITY_FAIL:
                return {...state, ...item(state[action.item_id], action)}
            case REMOVE_ITEM_SUCCESS:
                let { [action.item_id]: unUsed, ...newState } = state;
                return newState;
            case REMOVE_ITEM_FAIL:
                return {...state, ...item(state[action.item._id], action)}
            default:
                return state;
        }
    }

    const IDs = (state = [], action) => {
        switch (action.type) {
            case GET_INIT_ITEM:
                if (action.data.cart.error) return state;
                return [ ...action.data.cart.result];
            case FETCH_CART_DATA_SUCCESS:
                return [...action.data.result]; // normalize here
            case ADD_ITEM_TO_CART_SUCCESS:
                return [...state, action.item._id];
            case REMOVE_ITEM_SUCCESS:
                return state.filter(id => id !== action.item_id)
            case REMOVE_ITEM_FAIL:
                return [...state, action.item._id]
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
export const getListItemId = (state) => state.items.IDs;