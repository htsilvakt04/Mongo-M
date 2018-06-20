import React from 'react';
import style from './LoginForm.css';

class LoginForm extends React.Component {
    state = {
        email: '',
        password: '',
        errors: {email: [], password: []}
    }
    handleSubmit = (event) => {

        // ping the parent: hey the data is ok
        this.props.handleSubmit({
            email: this.state.email,
            password: this.state.password
        });
    }
    render () {
        return (
            <div className="container">
                <div className="row margin-login">
                    <button id="facebook-login"
                            onClick={this.props.handleLoginSocial} className={ style.loginBtn + ' ' + style["loginBtn--facebook"] + " col-md-push-3 col-md-6"}>
                        Login with Facebook
                    </button>
                </div>
            </div>
        )
    }
}


export default LoginForm;