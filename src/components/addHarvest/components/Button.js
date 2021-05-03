import PropTypes from 'prop-types'
import React from 'react';

const Button = ({color, text, onClick}) => {


    return (            
        <button onClick={onClick}
        style={{backgroundColor: color}}
        className='btn'>{text}</button>
    )
}

//set default values 
Button.defaultProps = {
    color: 'steelblue'
}

//setting types of props
Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func,
}

export default Button