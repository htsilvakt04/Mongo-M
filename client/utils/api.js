import {getCategories, getItems, _addReview} from './_DATA.js'
import {formatCategories, formatItems} from './helpers';

export const getInitialData = () =>
    getItems().then(items => formatItems(items))

export function addReview(data) {
    return _addReview(data);
}