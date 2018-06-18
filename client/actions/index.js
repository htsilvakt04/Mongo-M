import { CATEGORY } from './category';
import { PAGE } from './page';
import { getInitialData, requestChangeItemQuantity } from '../utils/api';
import { ITEM } from './items';
import { USER } from '../actions/user';
import { CART } from '../actions/cart';

export const handleChangeCat = (cat) => (dispatch) => {
    dispatch(
        CATEGORY.change(cat)
    )
    dispatch(
        PAGE.change(1)
    )
}


export const handleInitialData = () => (dispatch) =>
    getInitialData()
        .then(data => {
            dispatch(ITEM.getInit(data));
        })
        .catch((err) => {
            console.log(err);
            alert('Opps, database connection had had some issues')
        })

export const handleSignIn = (response) => (dispatch) => dispatch(USER.signIn(response))

export const changeItemQuantity = (item_id, quantity) => (dispatch) => {
    dispatch(CART.changeQuantitySuccess(item_id, quantity));
    requestChangeItemQuantity(item_id, quantity)
        .then(data => {
            if (data.error) return dispatch(CART.changeQuantityFail(item_id, quantity));
        })
        .catch(err => dispatch(CART.changeQuantityFail(item_id, quantity)));
}

