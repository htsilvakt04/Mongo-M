import React, {Fragment} from 'react'

const Item = (props) => {
    const item = props.item;
    return (
        <Fragment>
            <li>{item.title}</li>
        </Fragment>
    )
}

export default Item;