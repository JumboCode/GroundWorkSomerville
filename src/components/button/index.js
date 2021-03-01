import React from 'react';
import './styles.css';

const Button = (props) => {
    const {onClick, children, className} = props;
    return (
        <button 
            onClick={onClick}
            className = {"gs-button " + className}>
            {children}
        </button>
    )
}

export default Button;