import React from 'react';

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
            <div>
                <form action="/login" method="post" onSubmit={this.handleSubmit}>
                    <div>
                        <label>Email:</label>
                        <input type="text" name="email"/><br/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password"/>
                    </div>
                    <div>
                        <input type="submit" value="Submit"/>
                    </div>
                </form>
                <div className="social-login">
                    <button id="facebook-login" onClick={this.props.handleLoginSocial}>
                        Login with Facebook
                    </button>
                </div>
            </div>
        )
    }
}


export default LoginForm;