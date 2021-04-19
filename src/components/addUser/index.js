import React, {useState, useEffect} from 'react';
import styles from './styles.module.css';
import Button from '../button';
import { Modal, Form } from 'react-bootstrap';
import { Link, useRouteMatch } from "react-router-dom";


const AddUser = ({show, onHide, token}) => {
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [status, setStatus] = useState('');

    useEffect(() => {
        setEmail('');
        setType(''); 
        setStatus('');
    }, [show]);

    const handleSubmit = (event) => {
        event.preventDefault()
        var fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 
                    'Authorization': `Token ${token}`},
            body: JSON.stringify({ 'email': email, 'type': type})
        }
        fetch('add-user', fetchOptions)
        .then(res => res.ok ? res : Error)
        .then(res => {
            setStatus("Account created successfully!!")
        }).catch(err => {
            setStatus("Account creation failed :((")
        });
    }

    return (
        <Modal show={show} onHide={onHide} size="md" centered>
            <Modal.Header closeButton>
                <Modal.Title as="h5">Add New User</Modal.Title>
            </Modal.Header>

            <Form className="p-4" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>New User's Email</Form.Label>
                    <Form.Control required type="email" onChange={(e)=>{setEmail(e.target.value)}}/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>User Type</Form.Label>
                    <Form.Check
                        required
                        type="radio" 
                        label="Mobile Market Member" 
                        name="user-type" 
                        id="MMM"
                        onChange={(e)=>{setType(e.target.id)}}/>
                    <Form.Check 
                        required
                        type="radio"
                        label="Groundwork Admin"
                        name="user-type"
                        id="GA"
                        onChange={(e)=>{setType(e.target.id)}}/>
                </Form.Group>
                <div className="text-warning" onClick={()=>setStatus('')}>
                        {status}
                </div>
                <Button className="float-right">Submit</Button>
            </Form>
        </Modal>
    )
}

export default AddUser;