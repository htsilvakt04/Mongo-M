import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import { getUserSearchText } from '../../reducers';
import { handleSearch } from '../../actions/items';

import style from './navbar.css';
class Navbar extends React.Component {
    handleSearch = (event) => {
        let val = event.target.value;
        // dispatch here
        this.props.handleSearch(val);
    }
    render () {
        return (
            <nav className="navbar navbar-inverse navbar-fixed-top" role="navigation">
                <div className="container">
                    <div className="row">
                        <div className="navbar-header col-xs-3 col-md-2">
                            <Link className="navbar-brand" to="/" style={{color: '#fff', fontSize: 'inherit'}}>M.Mart</Link>
                        </div>
                        <div className="col-xs-6">
                            {this.props.location.pathname.indexOf('/item') === -1
                                ? <form className="navbar-form" onKeyUp={this.handleSearch}>
                                    <input type="text" value={this.props.searchText}  className="form-control" placeholder="Search" style={{width: '100%'}}/>
                                </form>
                                : <form className="navbar-form" onKeyUp={this.moveUserToHomePage}>
                                    <input type="text" value={this.props.searchText}  className="form-control" placeholder="Search" style={{width: '100%'}}/>
                                </form>
                            }
                        </div>
                        <ul className="nav navbar-nav navbar-right col-xs-3">
                            <li>
                                <Link to="/login" style={{color: '#fff'}}>
                                    <span className={"glyphicon glyphicon-shopping-cart " + style["cart-icon"]} aria-hidden="true"></span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
    moveUserToHomePage = () => {
        this.props.history.push('/');
    }
}

function mapStateToProps(state) {
    return {
        searchText: getUserSearchText(state)
    }
}
export default connect(null, { handleSearch })(Navbar);
