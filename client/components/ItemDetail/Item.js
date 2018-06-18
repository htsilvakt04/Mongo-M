import React from 'react';
import { connect } from 'react-redux';
import { getListItemId, isUserExist } from '../../reducers';
import { calculateRating } from './util';
import { addItemToCart } from '../../utils/api';

class Item extends React.Component {
    addItemToCart = () => {
        if (!this.props.isUserLoggedin) {
            const button = document.getElementById('add-to-cart').innerText = 'You need to login!!!';
            return;
        }
        this.props.addItemToCart().then((data, error) => {
            if (error) alert('can not add item to cart');
        })
    }
    render () {
        let item = this.props.item;
        let reviews = item.reviews;
        let {stars} = calculateRating(item);

        let arrStars = [];
        for (let index = 1; index <= stars; index ++) {
            arrStars.push(<span key={index} className="glyphicon glyphicon-star"></span>);
        }

        return (
            <div className="row">
                <div className="col-md-8">
                    <img className="img-responsive" src={'/static/' + item.img_url } alt=""/>
                </div>
                <div className="col-md-4">
                    <h3>Product Description</h3>
                    <div className="ratings" style={{paddingLeft: '0px'}}>
                        { reviews &&
                            <p className="pull-right">{item.reviews.length} reviews</p>
                        }
                        <p>
                            {arrStars}
                        </p>
                    </div>
                    <p>
                        {item.description}
                    </p>
                    {this.props.isBelongToCart
                        ? <button className="btn btn-primary" disabled>This item was in your cart</button>
                        : (<button className="btn btn-primary" id="add-to-cart" onClick={this.addItemToCart}>
                                Add to cart
                                <span className="glyphicon glyphicon-chevron-right"></span>
                          </button>)}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, {item}) {
    const isBelongToCart = getListItemId(state).includes(item._id);
    const isUserLoggedin = isUserExist(state);

    return {
        isBelongToCart,
        isUserLoggedin
    }
}

function mapDispatchToProps(dispatch, ownProps) {
    const id = ownProps.item._id;
    return {
        addItemToCart: () =>
            dispatch(addItemToCart(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Item);