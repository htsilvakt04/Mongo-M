import React from 'react'
import Item from './Item';
class ListItem extends React.Component {
    render () {
        const items = this.props.items;
        return (
            <ul>
                {items.map(item =>
                    <Item key={item._id} item={item}/>
                )}
            </ul>
        )
    }
}

export default ListItem;