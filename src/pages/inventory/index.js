import React from 'react';
import './styles.module.css';
import InventoryTab from '../../components/inventoryTab';
import InventoryFilter from '../../components/inventoryFilter';

const Inventory = (props) => {
    return (
        <div id="inventory">
            <InventoryTab/>
            <InventoryFilter/>
        </div>
    )
}

export default Inventory;