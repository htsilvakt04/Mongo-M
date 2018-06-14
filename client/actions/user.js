export const SIGN_IN = 'SIGN_IN';
export const GET_USER_INFO = 'GET_USER_INFO';
export const GET_USER_CART = 'GET_USER_CART';

export const USER = {
    signIn(response) {
        return {
            type: SIGN_IN,
            data: {...response.data}
        }
    },
    getUserInfo(response) {
        return {
            type: GET_USER_INFO,
            data: response.data,
            error: response.error
        }
    },
    getUserCart(response) {
        return {
            type: GET_USER_CART,
            data: response.data,
            error: response.error
        }
    }
}