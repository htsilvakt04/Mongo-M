import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { getItemsById } from '../../reducers';
import BreadCrum from './Breadcrum';
import Heading from './Heading';
import Item from './Item';
import LatestReview from './LatestReview';
import CommentForm from './CommentForm';
import RelatedItems from './RelatedItems';

class ItemDetail extends React.Component {
    render () {
        let {item} = this.props;
        return (
           <div className="container">
                <BreadCrum item={item}/>
                <Heading item={item}/>
                <Item item={item}/>
                <LatestReview item={item}/>
                <CommentForm item={item}/>
                <hr/>
                <RelatedItems cat={item.category}/>
           </div>
        )
    }
}

function mapStateToProps(state, currentProps) {
    const id = currentProps.match.params.id;
    return {
        item: getItemsById(state, id)
    }
}
export default withRouter(connect(mapStateToProps)(ItemDetail));