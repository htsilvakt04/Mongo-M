import React from 'react'
import { Link } from 'react-router-dom';
import style from './css/Item.css';
const Item = (props) => {
    const item = props.item;
    const {handleChangeQuantity} = props;
    const {handleRemoveItem} = props;
    return (
        <tr>
            <td><Link to={"/item/" + item._id}>{item.title}</Link></td>
            <td className="muted center_text"><Link to={"/item/" + item._id}><img width="300" src={"/static/" + item.img_url}/></Link></td>
            <td>
                <form action="" method="post">
                    <select name="quantity" onChange={(event) => handleChangeQuantity(item, event.target.value)}>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </select>
                    <button onClick={() => handleRemoveItem(item._id)} className={"btn " + style["remove-btn"]}>X</button>
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


