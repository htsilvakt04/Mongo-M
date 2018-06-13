import {getCategories, getItems, _addReview} from './_DATA.js'
import {formatCategories, formatItems} from './helpers';

export const getInitialData = () =>
    getItems().then(items => formatItems(items))

export function addReview(data) {
    return _addReview(data);
}

export function signIn(url, code) {
    return fetch(url, {
        credentials: 'same-origin',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({code})
    }).then( response => response.json().then( message => ({message, status: response.status})))
}