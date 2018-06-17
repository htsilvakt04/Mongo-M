import React from 'react';
import { connect } from 'react-redux';
import { getListItemId } from '../../reducers';
import { calculateRating } from './util';

class Item extends React.Component {
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
                        : (<button className="btn btn-primary" type="submit">
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
        isBelongToCart
    }
}

export default connect(mapStateToProps)(Item);