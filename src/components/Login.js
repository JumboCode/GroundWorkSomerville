import React, { Component } from 'react';
import './Login.css';
import { API_BASE } from '../constants';
import { Button, Form } from 'react-bootstrap';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            error: '',
        };
        this.dismissError = this.dismissError.bind(this);
        this.handleUserChange = this.handleUserChange.bind(this);
        this.handlePassChange = this.handlePassChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this); 
        this.innerRef = React.createRef(); 
    };

    componentDidMount() {
        setTimeout(() => {
          this.innerRef.current.focus();
        }, 1);
    }
    
    dismissError(event){
        this.setState({error: ''});
    }

    handleUserChange(event){
        this.setState({username: event.target.value});
    };

    handlePassChange(event){
        this.setState({password: event.target.value});
    };
  
    handleSubmit(event){
        event.preventDefault();
        const { username, password } = this.state;
        const { setAuthToken } = this.props;
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
            setAuthToken(res['key']);
        }).catch(err => {
            this.setState({error:"The username or password you entered is incorrect."});
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
                        ref={this.innerRef}
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

export default Login;