import React from 'react'
import { Link } from 'react-router-dom';
import style from './css/Item.css';
const Item = (props) => {
    const { item, handleChangeQuantity, handleRemoveItem } = props;

    return (
        <tr>
            <td><Link to={"/item/" + item._id}>{item.title}</Link></td>
            <td className="muted center_text"><Link to={"/item/" + item._id}><img width="300" src={"/static/" + item.img_url}/></Link></td>
            <td>
                <form action="">
                    <select name="quantity" value={item.quantity} onChange={(event) => handleChangeQuantity(item._id, event.target.value)}>
                        {[1,2,3,4,5].map(value =>
                            <option key={value} value={value} >{value}</option>
                        )}
                    </select>
                    <button onClick={(event) => {
                        event.preventDefault();
                        handleRemoveItem(item)
                    }} className={"btn " + style["remove-btn"]}>X</button>
                </form>
            </td>
            <td>
                {item.price}
            </td>
            <td>
                {item.price * item.quantity}
            </td>
        </tr>
    )
}

export default Item;


