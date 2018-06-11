import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { handleChangeCat } from '../../actions';
import { generateHomePageLink, generateHomePageWithCatLink } from '../../utils/helpers';


const Breadcrum = ({ item, handleChangeCat }) => {
    return (
        <div className="row">
            <div className="col-md-12">
                <ol className="breadcrumb">
                    <li><Link to={generateHomePageLink()} onClick={() => handleChangeCat('All')}>Home</Link></li>
                    <li><Link to={generateHomePageWithCatLink(item.category)} onClick={() => handleChangeCat(item.category)}>{item.category}</Link></li>
                    <li className="active">{item.title}</li>
                </ol>
            </div>
        </div>
    )
}

export default connect(null, { handleChangeCat })(Breadcrum);