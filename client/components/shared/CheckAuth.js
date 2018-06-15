import React, { Component } from 'react';
import { Route, withRouter, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import { isUserExist } from '../../reducers';

class CheckAuth extends Component {
    render() {
        const { component: Component, isHavingUserDataInStore, ...rest } = this.props;
        const shouldRedirect = isHavingUserDataInStore && document.cookie.indexOf('silvaApp-session') !== -1;

        return <Route {...rest} render={props => shouldRedirect ? <Redirect push to="/" /> : (<Component {...props} />)} />;
    }
}

function mapStateToProps({user}) {
    return {
        isHavingUserDataInStore: isUserExist(user)
    }
}
export default withRouter(connect(mapStateToProps)(CheckAuth));