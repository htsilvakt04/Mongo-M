import {getCategories, getItems, _addReview} from './_DATA.js'
import {formatCategories, formatItems} from './helpers';

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

export const getCartData = () => {
    const url = '/api/cart';
    return fetch(url, {
        credentials: 'same-origin',
        method: 'GET',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest'
        },
    }).then( response => response.json().then( message => ({message, status: response.status})))
}


