import React from 'react'
import { Link } from 'react-router-dom';
const Item = (props) => {
    const item = props.item;
    return (
        <tr>
            <td><Link to={"/item/" + item._id}>{item.title}</Link></td>
            <td className="muted center_text"><Link to={"/item/" + item._id}><img width="300" src={"/static/" + item.img_url}/></Link></td>
            <td>
                <form action="" method="post">
                    <select name="quantity" onChange={() => null}>
                        <option value="0">0 (Remove)</option>
                    </select>
                </form>
            </td>
            <td>
                {item.price}
            </td>
            <td>
                {item.price}
            </td>
        </tr>
    )
}

export default Item;


