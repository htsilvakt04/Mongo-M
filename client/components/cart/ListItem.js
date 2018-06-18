import React from 'react';
import { connect } from 'react-redux';
import style from './css/ListItem.css';
import { changeItemQuantity } from '../../actions';
import Item from './Item';
import TableHead from '../dump/TableHead';
import TableBody from '../dump/TableBody';
import RowWithCol from '../dump/RowWithCol';

class ListItem extends React.Component {
    handleChangeQuantity = (item, newValue) => {
        // should check if value === 0 => alert('Are you sure?')
        const { quantity: oldValue, _id: id } = item;

        this.props.changeItemQuantity(id, {oldValue, newValue});
    }
    render () {
        const items = this.props.items;
        return (
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered table-striped">
                        <TableHead>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Quantity</th>
                            <th>Unit Price</th>
                            <th>Total</th>
                        </TableHead>
                        <TableBody>
                            {items.map(item =>
                                <Item key={item._id} item={item} handleChangeQuantity={this.handleChangeQuantity}/>
                            )}
                            <tr>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td>&nbsp;</td>
                                <td><strong>{items.length}</strong></td>
                            </tr>
                        </TableBody>
                    </table>
                </div>
                <RowWithCol col={"col-md-12 " + style.checkout}>
                    <button className="btn btn-success" type="submit">Proceed to Checkout</button>
                </RowWithCol>
        </div>
        )
    }
}

export default connect(null, { changeItemQuantity })(ListItem);