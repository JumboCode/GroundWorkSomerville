import React from 'react';

const ItemType = () => {

    const onClick = () => {
        console.log('Click')
    }

    return (
        <div className="itemType">
            Item Type: 
            <input type="checkbox"/>  Produce
            <input type="checkbox"/> Merchandise
        </div>
    )
}





export default ItemType
