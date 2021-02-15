import React, { useState } from 'react';
import './styles.module.css';
import EditItem from '../editItem';
import { Modal } from 'react-bootstrap';

const InventoryTab = (props) => {
    const [showAddItem, setShowAddItem] = useState(false);
    return (
        <div id="inventory-tab">
            <button onClick={()=> setShowAddItem(true)}>Edit</button>
            <Modal show={showAddItem} onHide={()=> setShowAddItem(false)} size="lg" centered>
                <EditItem/>
            </Modal>
        </div>
    )
}

export default InventoryTab;