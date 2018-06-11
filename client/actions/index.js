import { CATEGORY } from './category';
import { PAGE } from './page';
export const handleChangeCat = (cat) => (dispatch) => {
    dispatch(
        CATEGORY.change(cat)
    )
    dispatch(
        PAGE.change(1)
    )
}