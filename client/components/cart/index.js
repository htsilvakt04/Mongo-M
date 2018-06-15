import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import {isUserExist} from "../../reducers";

class Cart extends React.Component {
    
    render () {
        if (!this.props.isHavingUserDataInStore) {
            return <Redirect to="/" />
        }
        return (
            <h1>Welcome: {this.props.user.name} to Cart Route</h1>
        )
    }
}

function mapStateToProps({user}) {
    return {
        user,
        isHavingUserDataInStore: isUserExist(user)
    };
}

export default connect(mapStateToProps)(Cart);