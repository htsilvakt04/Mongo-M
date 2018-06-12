import { Component } from 'react';
class LoginForm extends Component{
    componentDidMount () {
        const script1 = document.createElement("script");
        const script2 = document.createElement("script");
        const script3 = document.createElement("script");
        script3.text =
            `FB.init({
                appId   : '123',
                cookie  : true,
                status  : true,
                xfbml   : true,
                state: 'silva',
                version : 'v2.9'
            })`
        script1.src = "https://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js";
        script2.src = "https://connect.facebook.net/en_US/sdk.js";
        document.body.appendChild(script1);
        document.body.appendChild(script2);
        document.body.appendChild(script3);
    }
    render () {
        return (
            <form action="/login" method="post">
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
        )
    }
}

export default LoginForm;