import React, { useState } from 'react';
import './styles.module.css';
import AddItem from '../addItem';
import { Modal } from 'react-bootstrap';

const InventoryFilter = (props) => {
    const [showAddItem, setShowAddItem] = useState(false);
    return (
        <div id="inventory-filter">
            <button onClick={()=> setShowAddItem(true)}>Add Item</button>
            <Modal show={showAddItem} onHide={()=> setShowAddItem(false)} size="lg" centered>
                <AddItem/>
            </Modal>
        </div>
    )
}

export default InventoryFilter;