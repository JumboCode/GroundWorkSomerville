import React, { useState } from 'react';
import './styles.module.css';
import AddItem from '../addItem';
import AddUser from '../addUser';
import { Modal } from 'react-bootstrap';

const InventoryFilter = ({token}) => {
    const [showAddItem, setShowAddItem] = useState(false);
    const [showAddUser, setShowAddUser] = useState(false);
    return (
        <div id="inventory-filter">
            <button onClick={()=> setShowAddItem(true)}>Add Item</button>
            <button onClick={()=> setShowAddUser(true)}>Add User</button>
            <Modal show={showAddItem} onHide={()=> setShowAddItem(false)} size="lg" centered>
                <AddItem/>
            </Modal>

            <AddUser show={showAddUser} onHide={()=> setShowAddUser(false)} token={token}/>

        </div>
    )
}

export default InventoryFilter;