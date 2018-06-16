import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCartData } from '../../utils/api';

class Cart extends React.Component {
    // send request to determine if user still ok && get the data come back
    componentDidMount() {
        this.fetchData();
    }
    fetchData = () => {
        getCartData().then(data => {
            console.log('---___---', data);
        })
    }
    render () {
        if (!this.props.user.email) {
            return <Redirect to='/' />;
        }
        return (
            <h1>Welcome: {this.props.user.name} to Cart Route</h1>
        )
    }
}

function mapStateToProps({user}) {
    return {
        user
    }
}

export default connect(mapStateToProps)(Cart);