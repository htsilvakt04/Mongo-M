import byIds, * as fromByIds from './byIDs';
import byCat, * as fromByCat from './byCat';
import user, * as fromUser from './user';
import cart, * as fromCart from './cart';
import * as fromUserSearchText from './userSearchText';
import currentPage from './currentPage';
import userSearchText from './userSearchText';
import { combineReducers } from 'redux';

export default combineReducers({byIds, byCat, currentPage, userSearchText, user, cart});

export const getItemsByCatAndFilter = (state, cat) => {
    if (cat === 'All') {
        return fromByIds.getAll(state.byIds, state.userSearchText)
    } else {
        //@param @object    the object of object
        //@param @string    the text which user typed in
        //@param @array     an array of all item id in a specific category
        //return @array
        return fromByIds.getItemsByFilter(state.byIds, state.userSearchText, fromByCat.getItemsIds(state.byCat, cat));
    }
}

export const getItemsByCat = (state, cat) => {
    return cat === 'All'
        ? fromByIds.getAll(state.byIds)
        : fromByIds.getItems(state.byIds, fromByCat.getItemsIds(state.byCat, cat));
}
export const getCatNameAndTotal = (state) =>
    fromByCat.getCatNameAndTotal(state.byCat)

export const getItemsById = (state, id) =>
    fromByIds.getItemById(state.byIds, id)

export const handleChangeBySearch = (state, val) =>
    fromByIds.changeItemBySearch(state.byIds, val)

export const getUserSearchText = (state) =>
    fromUserSearchText.getText(state.userSearchText)

export const getUser = (state) => fromUser.getUser(state)
export const getUserName = (state) => fromUser.getUserName(state)
export const getUserEmail = (state) => fromUser.getUserEmail(state)
export const isUserExist = (state) => fromUser.isUserExist(state)


export const getCartItemList = (state) => fromCart.getListItem(state)
export const getCartError = (state) => fromCart.getError(state)
export const getCartIsFetching = (state) => fromCart.getIsFetching(state)




