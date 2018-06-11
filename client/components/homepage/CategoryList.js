const queryString = require('query-string');
import React from 'react';
import {connect} from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { getCatNameAndTotal } from '../../reducers';
import { PAGE } from '../../actions/page';

class CategoryList extends React.Component {
    render () {
        let {categories, currentCat} = this.props;
        return (
            <div className="col-md-2 hidden-xs">
                <div className="list-group">
                {Object.keys(categories).map( key => {
                    let {name, num} = categories[key];
                    
                    return (
                        <Link to={{pathname: '/', search: `?cat=${name}`}} key={name} onClick={() => this.props.changePage()} className={currentCat === name ? 'list-group-item active' : 'list-group-item inactive'}>
                            {name}
                            <span className="badge">
                                {num}
                            </span>
                        </Link>
                    )
                })}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state, { location }) {
    const currentCat = queryString.parse(location.search).cat || 'All';

    return {
        categories: getCatNameAndTotal(state),
        currentCat
    }
}
function mapDispatchToProps (dispatch) {
    return {
        changePage: () => {
            dispatch(PAGE.change(1))
        }
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CategoryList));