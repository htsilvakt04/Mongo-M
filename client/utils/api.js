import {getCategories, getItems, _addReview} from './_DATA.js'
import {formatCategories, formatItems} from './helpers';

export function getInitialData () {
    return Promise.all([
        getCategories('All'),
        getItems()
    ]).then(([categories, items]) => ({
        categories: formatCategories(categories),
        items: formatItems(items)
    }))
}
export function addReview(data) {
    return _addReview(data);
}