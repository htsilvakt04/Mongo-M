import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCartData } from '../../utils/api';
import ListItem from './ListItem';
import { CART } from '../../actions/cart';
import style from './css/index.css';

class Cart extends React.Component {
    // send request to determine if user still ok && get the data come back
    componentDidMount() {
        console.log('---___---', style);
        if(!this.props.user.email) return;

        this.fetchData();
    }

    fetchData = () => {
        getCartData().then(data => {
            console.log('---___---', data);
            if (data.status === 400) {
                // error about authentication
            }
            if (data.status === 500) {
                // error about internal server
            }
            this.props.dispatch(
                CART.success(data.data)
            )
            // dispatch here
        })
    }
    
    render () {
        const {name, cart} = this.props.user;
        if (!this.props.user.email) return <Redirect to='/' />;

        if (this.props.user.cart.isFetching) {
            return (
                <div className={style.spinner}>
                    <div className={style.cube1}></div>
                    <div className={style.cube2}></div>
                </div>
            )
        }
        
        return (
            <div>
                <h1>Welcome: {name} to your Cart</h1>
                <hr/>
                {cart.length > 0
                    ? <ListItem items={cart}/>
                    : <h3>There is no item yet!</h3>
                }
            </div>
        )
    }
}

function mapStateToProps({user}) {
    return {
        user
    }
}

export default connect(mapStateToProps)(Cart);