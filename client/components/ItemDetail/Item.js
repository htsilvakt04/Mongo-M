import React from 'react';
import { connect } from 'react-redux';
import { getListItemId } from '../../reducers';
import { calculateRating } from './util';
import { addItemToCart } from '../../utils/api';

class Item extends React.Component {
    state = {
        isAdding: false
    }

    addItemToCart = () => {
        this.setState(prevState => ({isAdding: !prevState.isAdding}), () => {
            this.props.addItemToCart().then((data, error) => {
                this.setState(prevState => ({isAdding: !prevState.isAdding}));
                if (error) alert('can not add item to cart');
            })
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
                        : this.state.isAdding
                            ? <span>spinner here</span>
                            : (<button className="btn btn-primary" onClick={this.addItemToCart}>
                                    Add to cart
                                    <span className="glyphicon glyphicon-chevron-right"></span>
                              </button>)}
                </div>
            </div>
        )
    }
}

function mapStateToProps({cart}, {item}) {
    const isBelongToCart = getListItemId(cart).includes(item._id);

    return {
        isBelongToCart,
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