import React, {useState} from 'react';
import { Form, Col } from 'react-bootstrap';
import Button from '../../components/button';
import { useHistory } from "react-router";

const EditAccount = ({token, activate, activated}) => {
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');
    const [newUname, setNewUname] = useState('');
    const history = useHistory();

    const handleSubmit = (event) => {
        event.preventDefault();
        var fetchOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json', 
                      'Authorization': `Token ${token}`},
            body: JSON.stringify({'oldPass': oldPass, 'newPass': newPass, 'newUname': newUname})
        }
        fetch('changepass', fetchOptions)
        .then(res => {
            if (res.ok) {
                activate()
                history.push('/')
            } else {
                console.log("error")
            }
        })
    }

    const style = {padding:'2%', maxWidth:500}
    return (
        <div id="edit-account" style={style}>
            <h3>Edit User Account</h3>
            {!activated && <div className='text-warning py-2'>Please change username and password upon first login</div>}
            <Form onSubmit={handleSubmit}>
                <Form.Group as={Form.Row}>
                    <Col sm={4}>Old Password</Col>
                    <Col><Form.Control
                    type="password"
                    value={oldPass}
                    onChange={(e)=>{setOldPass(e.target.value)}}/></Col>
                </Form.Group>
                <Form.Group as={Form.Row}>
                    <Col sm={4}>New Username</Col> 
                    <Col><Form.Control
                    type="username"
                    value={newUname}
                    onChange={(e)=>{setNewUname(e.target.value)}}/></Col>
                </Form.Group>
                <Form.Group as={Form.Row}>
                    <Col sm={4}>New Password</Col> 
                    <Col><Form.Control
                    type="password"
                    value={newPass}
                    onChange={(e)=>{setNewPass(e.target.value)}}/></Col>
                </Form.Group>
                <Form.Group as={Form.Row}>
                    <Col sm={4}>Confirm Password</Col> 
                    <Col><Form.Control
                    type="password"/></Col>
                </Form.Group>
                <Form.Group className="text-center">
                    <Button variant="success" type="submit">Change Password</Button>
                </Form.Group>
            </Form>
        </div>
    )
}

export default EditAccount;