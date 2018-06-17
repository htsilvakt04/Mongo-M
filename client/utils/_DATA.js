import axios from 'axios';
import { cartItems, Items } from '../actions/schema';
import { initCart, initItem } from './api';
import { normalize } from 'normalizr';

function constructCartData (cartData) {
    if (cartData.error) { // no authentication
        return {
            error: 'no authentication',
            entities: {},
            result: []
        };
    }
    if (cartData.data.length === 0) { // authentication but no item in cart
        return {
            entities: {},
            result: []
        }
    }
    return normalize(cartData.data, cartItems);
}

export function getItems(category = 'All', skip = 0, limit = 100) {

    const items = initItem(category, skip, limit);
    const cart = initCart();
    
    return Promise.all([items, cart]).then( ([itemsData, cartData]) => ({
        items: itemsData.entities.item,// {1: {}, 2: {}...}
        cart: constructCartData(cartData),
        user: cartData.user || {email: '', name: ''}
    }))
}

export function getCategories(name) {
    return new Promise((res, rej) => {
        let url = '/api/category/' + name;
        return axios.get(url).then(({data}) => res(data)).catch(err => rej(err));
    })
}

export function _addReview({review, name ,stars, id}) {
    let url = '/api/item/' + id  + '/reviews';

    return axios.post(url, {
        review, name, stars
    }).then(({data}) => data).catch(err => err);
}