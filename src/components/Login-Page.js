import React, { Component } from 'react';
import './Login-Page.css';
import { API_BASE } from '../constants';
import { Button, Form, Container } from 'react-bootstrap';

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
        const { username, password, error } = this.state;
        return (
            <div className="Login">
                <h2 className="text-center">Login</h2>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                        autoFocus
                        type="username"
                        value={username}
                        onChange={this.handleUserChange}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={password}
                        onChange={this.handlePassChange}/>
                    </Form.Group>
                    <Form.Group className="errorContainer">
                        <Form.Text
                        onClick={this.dismissError}>{error}</Form.Text>
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button variant="success" type="submit">Login</Button>
                    </Form.Group>
                </Form>
            </div>
        );
    }
}

export default LoginPage;