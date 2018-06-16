import { getItems, _addReview} from './_DATA.js'
import { formatItems} from './helpers';
import { normalize } from 'normalizr';
import { cartItems } from '../actions/schema';
import {CART} from "../actions/cart";

export const getInitialData = () =>
    getItems().then(items => formatItems(items))

export function addReview(data) {
    return _addReview(data);
}

export const signIn =  (url, code) =>
    fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({code})
    }).then( response => response.json().then( message => ({message, status: response.status})))

export const getCartData = () => (dispatch) => {
    dispatch(CART.start);

    const url = '/api/cart';
    fetch(url, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest'
        },
    }).then( response => response.json().then( message => {
        const data = {data: message.data, status: response.status};
        if (data.status === 400) {
            dispatch(
                CART.fail({error: data})
            )
        }
        if (data.status === 500) { // in this time just leave it like that
            dispatch(
                CART.fail({error: data})
            )
        }

        dispatch(
            CART.success(normalize(data.data, cartItems))
        )
    }))
}


