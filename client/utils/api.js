import { getItems, _addReview} from './_DATA.js'
import { normalize } from 'normalizr';
import {cartItems, Items} from '../actions/schema';
import { CART } from '../actions/cart';
import axios from "axios/index";

export const getInitialData = () => getItems()

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

export const initCart = () => {
    let cartUrl = '/api/cart';

    return fetch(cartUrl, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest'
        },
    }).then( response => {
        if (! response.ok) {
            return {
                error: 'no authentication',
                entities: {},
                result: []
            };
        }
        return response.json();
    });
}
export const initItem = (category, skip, limit) => {
    let url = '/api/items';
    let query = {params: {category, skip, limit}};

    return axios.get(url, query).then( ({data}) => normalize(data.data, Items) )
}