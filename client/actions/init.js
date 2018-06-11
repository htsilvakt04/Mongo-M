import {getInitialData} from '../utils/api';
import {ITEM} from './items';

export const handleInitialData = () => (dispatch) => getInitialData()
            .then(({items}) => {
                dispatch(ITEM.getInit(items));
            })
            .catch((err) => {
                console.log(err);
                alert('Opps, database connection had had some issues')
            })

