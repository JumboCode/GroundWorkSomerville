import React from 'react';
import PropTypes from 'prop-types'

const Price = () => {

    const onClick = () => {
        console.log('Click')
    }

    return (
        <div className ='input'>
            <div> 
                Price: <input type='text'/>
            </div>
        </div>
    )
}


export default Price
