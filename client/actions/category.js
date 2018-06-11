export const GET_INIT_CATEGORY = 'GET_INIT_CATEGORY';
export const CHANGE_CAT = 'CHANGE_CAT';

export const CATEGORY = {
    getInit: function (data) {
        return {
            type: GET_INIT_CATEGORY,
            data
        }
    },
    change: function (name) {
        return {
            type: CHANGE_CAT,
            name
        }
    }
}
