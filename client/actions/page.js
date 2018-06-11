export const CHANGE_PAGE = 'CHANGE_PAGE';

export const PAGE = {
    change: function (id) {
        return {
            type: CHANGE_PAGE,
            id
        }
    }
}