export const FETCH_CART_DATA = 'FETCH_CART_DATA';
export const FETCH_CART_DATA_SUCCESS = 'FETCH_CART_DATA_SUCCESS';
export const FETCH_CART_DATA_FAIL = 'FETCH_CART_DATA_FAIL';

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
    }
}