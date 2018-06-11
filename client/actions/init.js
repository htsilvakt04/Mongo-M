import {getInitialData} from '../utils/api';
import {CATEGORY} from './category';
import {ITEM} from './items';
const AUTHED_ID = 'tylermcginnis'; // we can get it from cookies (session ID)

export function handleInitialData () {
    return (dispatch) => {
        getInitialData()
            .then(({items}) => {
                dispatch(ITEM.getInit(items));
            })
            .catch((err) => {
            console.log(err);
                alert('Opps, database connection had had some issues')
            })
    }
}