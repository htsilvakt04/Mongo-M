import React from 'react'
import SweetAlert from 'react-bootstrap-sweetalert';
import { connect } from 'react-redux';
import LoginForm from '../shared/LoginForm';
import { signIn } from '../../utils/api';
import Error from '../../config';
import { handleSignIn } from '../../actions';
import { getUserName } from '../../reducers';
import { App } from '../../config';
import { constructScript } from './util';

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
        window.removeEventListener('load', this.initFBSDK)
    }
    componentWillMount () {
        // append script to body tag and wait for it to be downloaded
        const facebookSDK = document.createElement("script");
        constructScript(facebookSDK);
        document.body.appendChild(facebookSDK);

        this.initFBSDK = function() {
            const facebookSDKINIT = document.createElement("script");
            // todo: move app id to config ---> App variable above already inported
            facebookSDKINIT.text = "FB.init({appId: '1877035595944613', cookie: true, status: true, xfbml: true, state: 'silva', version : 'v2.9'})";
            document.body.appendChild(facebookSDKINIT);
        }

        window.addEventListener('load', this.initFBSDK)
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
            }).catch( err => this.toggleModal({type: 'error', title: 'Error! Please try again'}))

        },{scope: 'public_profile,email', auth_type: 'rerequest', return_scopes: true});
    }

    handleSubmit = (event) => {

    }
    render () {
        return (
            <div>
                <SweetAlert {...this.state.modal} onConfirm={this.toggleModal} />
                <LoginForm handleLoginSocial={this.handleLoginSocial} handleSubmit={this.handleSubmit}/>
                <h2>Welcome: {this.props.email}</h2>
            </div>
        )
    }
}

function mapStateToProps({user}) {
    return {
        email: getUserName(user)
    }
}
export default connect(mapStateToProps, { handleSignIn })(LoginPage)