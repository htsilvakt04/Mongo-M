import { searchItemInState } from './utils/util';
import byID from './byID';

const byIDs = (state = {}, action) => {
    switch (action.type) {
        case 'GET_INIT_ITEM':
            const { data } = action;

            return Object.keys(data).reduce((init, key) => {
                init[data[key]._id] = data[key];

                return init;
            }, {});
        case 'ADD_REVIEW':
            return {
                ...state,
                ...byID(state[action.review.id], action)
            };
        default:
            return state;
    }
}

export default byIDs;

// selectors
export const getItems = (state, arrayIds) => arrayIds.map(id => state[id])
export const getItemById = (state, id) => state[id]
export const getAll = (state, filterText) => searchItemInState(state, filterText)
export const getItemsByFilter = (state, filterText, arrayOfItemsId) => searchItemInState(state, filterText, arrayOfItemsId)
export const changeItemBySearch = (state, searchText) => searchItemInState(state, searchText);
