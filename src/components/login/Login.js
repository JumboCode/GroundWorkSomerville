import React, { useState, useRef, useEffect } from 'react';
import './Login.css';
import { Form, Modal } from 'react-bootstrap';
import Button from '../button';

const Login = ({show, onHide, login}) => {
    const [uname, setUname] = useState('');
    const [paswd, setPaswd] = useState('');
    const [showError, setShowError] = useState(false);
    const txt = useRef();
    useEffect(() => {
        if (show){ txt.current.focus() }
    }, [show]);
    
    const handleSubmit = (event) => {
        event.preventDefault();
        var fetchOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 'username': uname, 'password': paswd})
        }
        
        fetch('rest-auth/login/', fetchOptions)
        .then(res => res.ok ? res : Error)
        .then(res => res.json())
        .then(res => {
            login(res['key']);
        }).catch(err => {
            setShowError(true);
        });
    }

    return (
        <Modal show={show} size="lg" className="Login" centered onHide={onHide}>
            <div>
                <h2 className="text-center">Login</h2>
                <Form onSubmit={handleSubmit}>
                    <Form.Group size="lg" controlId="email">
                        <Form.Label>Username</Form.Label>
                        <Form.Control
                        type="username"
                        value={uname}
                        ref = {txt}
                        onChange={(e)=>{setUname(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group size="lg" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type="password"
                        value={paswd}
                        onChange={(e)=>{setPaswd(e.target.value)}}/>
                    </Form.Group>
                    <Form.Group className="errorContainer">
                        {showError && 
                        <Form.Text onClick={()=>{setShowError(false)}}>
                            The username or password you entered is incorrect.    
                        </Form.Text>}
                    </Form.Group>
                    <Form.Group className="text-center">
                        <Button variant="success" type="submit">Login</Button>
                    </Form.Group>
                </Form>
            </div>
        </Modal>
    );
}

export default Login;