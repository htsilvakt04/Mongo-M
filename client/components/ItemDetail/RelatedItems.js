import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getItemsByCat } from '../../reducers';

class RelatedItems extends React.Component {
    render () {
        let {items} = this.props;
        return (
            <div className="row">

                <div className="col-lg-12">
                    <h3 className="page-header">Related Products</h3>
                </div>
                {items.map( (item, index) => {

                   if (index >= 4) { // minimum max 4 items
                       return;
                   }
                    return (
                        <div key={item._id} className="col-sm-3 col-xs-6">
                            <Link to={'/item/' + item._id}>
                                <img className="img-responsive portfolio-item"
                                     src={'/static/' + item.img_url}
                                     alt=""/>
                            </Link>
                        </div>
                    )
                })}
            </div>
        )
    }
}

function mapStateToProps(state, currentProps) {
    const cat = currentProps.cat;
    return {
        items: getItemsByCat(state, cat)
    }
}

export default connect(mapStateToProps)(RelatedItems);