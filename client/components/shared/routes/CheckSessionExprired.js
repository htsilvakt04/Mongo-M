import React, { Component } from 'react';
import { Route, withRouter, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import { isUserExist } from '../../../reducers/index';

const CheckSessionExprired = (props) => {
    const { component: Component, isHavingUserDataInStore, ...rest } = props;
    const shouldRedirect = isHavingUserDataInStore && document.cookie.indexOf('silvaApp-session') !== -1;

    return <Route {...rest} render={props => shouldRedirect ? <Redirect push to="/" /> : (<Component {...props} />)} />;
}

function mapStateToProps(state) {
    return {
        isHavingUserDataInStore: isUserExist(state)
    }
}
export default withRouter(connect(mapStateToProps)(CheckSessionExprired));