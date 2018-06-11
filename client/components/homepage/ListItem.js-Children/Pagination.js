import React from 'react';
import {connect} from 'react-redux';
import {PAGE} from '../../../actions/page';
class Pagination extends React.Component {
    handleChangePage = (i) => {
        this.props.dispatch(
            PAGE.change(i)
        )
    }
    render () {
        let {perPage, page, total} = this.props;

        let numberOfPages = 1;
        if (total > perPage) {
            numberOfPages = Math.ceil(total / perPage);
        }

        let pages = [];
        for (let i = 1; i <= numberOfPages; i++) {
            pages.push (
                <li key={i} onClick={this.handleChangePage.bind(this, i)} className={ page === i ? 'active' : 'inactive'}>
                    <a style={{cursor: 'pointer'}}>{i}</a>
                </li>
            )
        }
        return (
            <div className="row text-center">
                <div className="col-lg-12">
                    <ul className="pagination">
                        {pages}
                    </ul>
                </div>
            </div>
        )
    }

}

export default connect()(Pagination);