import React from 'react';
import styles from './styles.module.css';
import { Form } from 'react-bootstrap';
import Button from '../button';
import { Modal } from 'react-bootstrap';

const AddUser = ({show, onHide}) => {
    const handleSubmit = (event) => {
        event.preventDefault();
    }

    return (
        <Modal show={show} onHide={onHide} size="md" centered>
            <Form className="p-5" onSubmit={handleSubmit}>
                <Form.Group>
                    <Form.Label>New User's Email</Form.Label>
                    <Form.Control required type="text"/>
                    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
                </Form.Group>
                <Form.Group>
                    <Form.Label>User Type</Form.Label>
                    <Form.Check
                        required
                        type="radio" 
                        label="Mobile Market Member" 
                        name="user-type" 
                        id="MMM"/>
                    <Form.Check 
                        required
                        type="radio"
                        label="Groundwork Admin"
                        name="user-type"
                        id="GA"/>
                </Form.Group>
                <Button onClick={handleSubmit} className="float-right">Submit</Button>
            </Form>
        </Modal>
    )
}

export default AddUser;