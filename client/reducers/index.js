import byIds, * as fromByIds from './byIDs';
import byCat, * as fromByCat from './byCat';
import * as fromUserSearchText from './userSearchText';
import currentPage from './currentPage';
import userSearchText from './userSearchText';

import { combineReducers } from 'redux';

export default combineReducers({byIds, byCat, currentPage, userSearchText});

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




