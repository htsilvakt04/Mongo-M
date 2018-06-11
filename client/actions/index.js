import { CATEGORY } from './category';
import { PAGE } from './page';
import { getInitialData } from '../utils/api';
import {ITEM} from './items';

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
        .then(items => {
            dispatch(ITEM.getInit(items));
        })
        .catch((err) => {
            console.log(err);
            alert('Opps, database connection had had some issues')
        })
