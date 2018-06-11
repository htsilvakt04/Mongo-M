import React from 'react';
import moment from 'moment';
import {Fragment} from 'react';
class LatestReview extends React.Component {
    render () {
        let item = this.props.item;
        return (
            <div className="row">
                <div className="col-lg-12">
                    <h3 className="page-header">Latest Reviews</h3>
                </div>
                <div className="col-lg-12">
                {item.reviews && item.reviews.map( (review, index) => {
                    return (
                        <Fragment key={index}>
                            <div>
                                <h4 className="media-heading">{review.name + ' '}
                                    <small> {moment(review.date).format("dddd, MMMM Do YYYY")}</small>
                                </h4>
                                <div className="ratings" style={{paddingLeft: '0px'}}>
                                    {this.determineRating(review)}
                                </div>
                                {review.comment}
                            </div>
                            <hr />
                        </Fragment>
                    )
                })}
                </div>
            </div>
        )
    }

    determineRating = (review) => {
        let stars = review.stars;
        let arrStars = [];
        for (let index = 1; index <= stars; index ++) {
                // arrStars.push(<span key={index} className={ 'glyphicon glyphicon-star-empty'}></span>);
            arrStars.push(<span key={index} className={ 'glyphicon glyphicon-star'}></span>);
        }
        return arrStars;
    }
}
export default LatestReview;