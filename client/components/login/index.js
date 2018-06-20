import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import LoginForm from '../shared/LoginForm';
import { signIn } from '../../utils/api';
import Error from '../../config';
import { handleSignIn } from '../../actions';
import { getUserName } from '../../reducers';
import { App } from '../../config';
import { constructScript } from './util';
import {isUserExist} from "../../reducers";


class LoginPage extends React.Component {
    state = {
        modal: {
            show: false,
            title: 'We need your email field',
            type: 'warning'
        }
    }

    componentWillUnmount() {
        document.getElementById('facebookSDK').remove();
    }
    componentWillMount () {
        // append script to body tag and wait for it to be downloaded
        const facebookSDK = constructScript();
        document.body.appendChild(facebookSDK);
    }

    toggleModal = (props) => {
        props ? this.setState(prevState => ({
            modal: {...props, show: !prevState.modal.show}
        }))  : this.setState(prevState => ({
            modal: {...prevState.modal, show: !prevState.modal.show}
        }))
    }

    handleLoginSocial = (event) => {
        FB.login( response => {
            const code = response.authResponse;
            if (!code) return;

            signIn('/api/login/social/verify/facebook', code).then( ({message, status}) => {

                if (status === 400 && message === Error.MISSING_EMAIL) {
                    return this.toggleModal()
                }
                if (status >= 400) {
                    return this.toggleModal({type: 'error', title: 'Error! Please try again'})
                }

                // dispatch auth action here
                this.props.handleSignIn({data: message});

                this.props.history.push('/');
            }).catch( err => this.toggleModal({type: 'error', title: 'Error! Please try again'}))

        },{scope: 'public_profile,email', auth_type: 'rerequest', return_scopes: true});
    }

    handleSubmit = (event) => {

    }
    render () {
        if (this.props.isHavingUserDataInStore) {
            return <Redirect to="/" />
        }
        return (
            <div>
                <SweetAlert {...this.state.modal} onConfirm={this.toggleModal} />
                <LoginForm handleLoginSocial={this.handleLoginSocial} handleSubmit={this.handleSubmit}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        email: getUserName(state),
        isHavingUserDataInStore: isUserExist(state)
    }
}
export default connect(mapStateToProps, { handleSignIn })(LoginPage)