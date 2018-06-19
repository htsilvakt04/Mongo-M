export const FETCH_CART_DATA = 'FETCH_CART_DATA';
export const FETCH_CART_DATA_SUCCESS = 'FETCH_CART_DATA_SUCCESS';
export const FETCH_CART_DATA_FAIL = 'FETCH_CART_DATA_FAIL';
export const ADD_ITEM_TO_CART_SUCCESS = 'ADD_ITEM_TO_CART_SUCCESS';
export const CHANGE_ITEM_QUANTITY_SUCCESS = 'CHANGE_ITEM_QUANTITY_SUCCESS';
export const CHANGE_ITEM_QUANTITY_FAIL = 'CHANGE_ITEM_QUANTITY_FAIL';


export const CART = {
    success(data) {
        return {
            type: FETCH_CART_DATA_SUCCESS,
            data
        }
    },
    fail (error) {
        return {
            type: FETCH_CART_DATA_FAIL,
            error
        }
    },
    start: {
        type: FETCH_CART_DATA
    },
    addItemToCart (item) {
        return {
            type: ADD_ITEM_TO_CART_SUCCESS,
            item
        }
    },
    changeQuantitySuccess(item_id, quantity) {
        return {
            type: CHANGE_ITEM_QUANTITY_SUCCESS,
            quantity,
            item_id
        }
    },
    changeQuantityFail(item_id, quantity) {
        return {
            type: CHANGE_ITEM_QUANTITY_FAIL,
            quantity,
            item_id
        }
    }
}