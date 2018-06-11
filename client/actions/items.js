import {PAGE} from './page';
import {addReview} from '../utils/api';
export const GET_INIT_ITEM = 'GET_INIT_ITEM';
export const CHANGE_ITEM_BY_SEARCH = 'CHANGE_ITEM_BY_SEARCH';
export const CHANGE_ITEM_BY_CAT = 'CHANGE_ITEM_BY_CAT';
export const ADD_REVIEW = 'ADD_REVIEW';

export const ITEM = {
    getInit: function (data) {
        return {
            type: GET_INIT_ITEM,
            data
        }
    },
    change: function (id) {
        return {
            type: CHANGE_ITEM_BY_CAT,
            id
        }
    },
    changeBySearch: function (search) {
        return {
            type: CHANGE_ITEM_BY_SEARCH,
            search
        }
    },
    addReview: function (review) {
        return {
            type: ADD_REVIEW,
            review
        }
    }
}

export function handleSearch(input) {
    return (dispatch) => {
        dispatch({
            type: 'UPDATE_USER_INPUT',
            input
        })
        dispatch(
            PAGE.change(1)
        )
    }
}

export function handleAddReview(data) {
    return (dispatch) => {
        dispatch(
            ITEM.addReview(data)
        )
        return addReview(data)
            .catch(err => {
                alert('Opps, Can not add your review... please do it again');
                // TODO: should remove review here
            });
    }
}