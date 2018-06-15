import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
    render () {
        return (
            <h1>Welcome: {this.props.user.name} to Cart Route</h1>
        )
    }
}

function mapStateToProps({user}) {
    return {user};
}
export default connect(mapStateToProps)(Cart);