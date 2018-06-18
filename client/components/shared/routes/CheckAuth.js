import React, { Component } from 'react';
import { Route, withRouter, Redirect  } from 'react-router-dom';
import { connect } from 'react-redux';
import { isUserExist } from '../../../reducers/index';

const CheckAuth = (props) => {
    const { component: Component, isHavingUserDataInStore, ...rest } = props;

    return <Route {...rest} render={props => isHavingUserDataInStore ? (<Component {...props} />) : <Redirect push to="/login" /> } />;
}

function mapStateToProps(state) {
    return {
        isHavingUserDataInStore: isUserExist(state)
    }
}
export default withRouter(connect(mapStateToProps)(CheckAuth));