import { CATEGORY } from './category';
import { PAGE } from './page';
import { getInitialData } from '../utils/api';
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

export const handleSignIn = (response) => (dispatch) =>
    dispatch(
        USER.signIn(response)
    )

export const changeItemQuantity = (item_id, value) => (dispatch) => {
    dispatch(CART.changeQuantitySuccess(item_id, value.newValue));


}

