import React, { Component } from 'react';
import './Login-Page.css';
import { API_BASE } from '../constants';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
        };
    };

    dismissError = (event) => {
        this.setState({error: ''});
    }

    handleUserChange = (event) => {
        this.setState({username: event.target.value});
    };

    handlePassChange = (event) => {
        this.setState({password: event.target.value});
    };

    setAuthToken = (token) => {
        window.localStorage.setItem('auth-key', token);
    }
  
    handleSubmit = (event) => {
        event.preventDefault();
        const { username, password } = this.state;
        var fetchOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                'username': username,
                'password': password,
            }),
        }

        fetch(`${API_BASE}rest-auth/login/`, fetchOptions)
        .then(res => res.ok ? res : Error)
        .then(res => res.json())
        .then(res => {
            console.log(res);
            this.props.history.push('/search');
            this.setAuthToken(res['key']);
        }).catch(err => {
            console.log("Error");
            this.setState({error:"The username or password you entered is incorrect."});
            console.log(err);
        });
  }

    render() {
        return (
            <div className="Login">
                <form onSubmit={this.handleSubmit}>
                    <h1>Login</h1>
                    <label>Username</label>
                    <input class = "textinput" type="username" value={this.state.username} onChange={this.handleUserChange} />

                    <label>Password</label>
                    <input class = "textinput" type="password" value={this.state.password} onChange={this.handlePassChange} />
                    <div id = "ErrorBox">
                        {this.state.error &&
                        <label onClick={this.dismissError}>{this.state.error}</label>}
                    </div>
                    <div id = "Signin">
                        <input id = "LoginButton" type = "submit"  value = 'Login' onClick={this.handleSubmit}/>
                    </div>
                </form>
            </div>
        );
    }
}

export default LoginPage;