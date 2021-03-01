import React from 'react';
import './styles.module.css';
import InventoryTab from '../../components/inventoryTab';
import InventoryFilter from '../../components/inventoryFilter';

const Inventory = ({token}) => {
    return (
        <div id="inventory">
            <InventoryTab/>
            <InventoryFilter token={token}/>
        </div>
    )
}

export default Inventory;