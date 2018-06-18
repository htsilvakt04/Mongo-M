import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { getCartData } from '../../utils/api';
import ListItem from './ListItem';
import style from './css/index.css';
import { getCartError, getCartItemList, getCartIsFetching } from '../../reducers';

class Cart extends React.Component {
    // send request to determine if user still ok && get the data come back
    componentDidMount() {
        if(!this.props.user.email) return;
        this.fetchData();
    }

    fetchData = () => this.props.getCartData()
    
    render () {
        const {name, email} = this.props.user;
        const cart = this.props.cart;
        const items = cart.items;

        if (!email) return <Redirect to='/' />;

        if (cart.isFetching) {
            return (
                <div className={style.spinner}>
                    <div className={style.cube1}></div>
                    <div className={style.cube2}></div>
                </div>
            )
        }
        
        return (
            <div className="container">
                <div className="row">

                    <h1>Welcome: {name} to your Cart</h1>
                    {cart.error &&
                        <h2>There were some errors, please try agian</h2>
                    }
                    {items.length > 0
                        ? <ListItem items={items}/>
                        : <h3>There is no item yet!</h3>
                    }
                    
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        user: state.user,
        cart: {
            error: getCartError(state),
            isFetching: getCartIsFetching(state),
            items: getCartItemList(state)
        }
    }
}

export default connect(mapStateToProps, { getCartData })(Cart);