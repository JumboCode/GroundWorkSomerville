import PropTypes from 'prop-types'
import Button from './Button'
import React from 'react';


const Name = () => {

    const onClick = () => {
        console.log('Click')
    }

    return (
        <div className ='input'>
            <div> 
                Name: <input type='text' size='30'/>
            </div>
        </div>
    )
}


export default Name
