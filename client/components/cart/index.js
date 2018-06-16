import React from 'react';
import { connect } from 'react-redux';

class Cart extends React.Component {
    // send request to determine if user still ok && get the data come back
    componentDidMount() {
        this.fetchData();
    }
    componentDidUpdate() {
        this.fetchData();
    }
    fetchData = () => {

    }
    render () {
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