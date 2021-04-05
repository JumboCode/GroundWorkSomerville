import React, { useState } from 'react';
import './styles.css';
import AddItem from '../addItem';
import AddUser from '../addUser';
import { Modal, Form, Col, Dropdown, Button as BsButton} from 'react-bootstrap';
import Button from '../button';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const InventoryFilter = ({token}) => {
    const [showAddItem, setShowAddItem] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);

    return (
        <div id="inventory-filter">
            <Form>
                <Form.Row>
                    <Col><Form.Control type="text"/></Col>
                    <Col xs={4}><Button>Search</Button></Col>
                </Form.Row>
            </Form>
            <div className="date-picker">
                <div>Date viewing:</div>
                <DatePicker/>
            </div>
            <div className="sort-inventory">
                <div>Sort by:</div>
                <Dropdown>
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Sort inventory table by
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Alphabetically</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Amt. available:least to most</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Amt. available:most to least</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Total amt.:most to least</Dropdown.Item>
                </Dropdown.Menu>
                </Dropdown>
            </div>
            <div className="add-buttons">
                <Button onClick={()=> setShowAddItem(true)} className="mb-2">Add New Item</Button>
                <Button>Add New Harvest</Button>
            </div>
            <BsButton onClick={()=> setShowAddUser(true)} variant="outline-success" className="saurav">Add New User</BsButton>

            <Modal show={showAddItem} onHide={()=> setShowAddItem(false)} size="lg" centered> 
                <AddItem/>
            </Modal>

            <AddUser show={showAddUser} onHide={()=> setShowAddUser(false)} token={token}/>

        </div>
    )
}

export default InventoryFilter;