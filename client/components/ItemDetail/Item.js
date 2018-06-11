import React from 'react';

class Item extends React.Component {
    render () {
        let item = this.props.item;
        let reviews = item.reviews;
        let {stars} = this.calculateRating(item);

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

                    <form action={'/user/' + '558098a65133816958968d88' + '/cart/items/' +item._id} role="form" method="post">
                        <button className="btn btn-primary" type="submit">
                            Add to cart
                            <span className="glyphicon glyphicon-chevron-right"></span>
                        </button>
                    </form>

                </div>

            </div>

    )
    }

    calculateRating = (item) => {
        let stars = 0;
        let numReviews = 0;
        let avg = 0;

        if ("reviews" in item) {
            numReviews = item.reviews.length;

            for (let i=0; i<numReviews; i++) {
                stars += Number(item.reviews[i].stars);
            }

            avg = stars / numReviews;
        }
        return {
            stars: Math.round(avg)
        }
    }
}
export default Item;