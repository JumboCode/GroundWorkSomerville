import React from 'react';

const Button = (props) => {
    const {onClick, children} = props;
    const style = {
        backgroundColor: "#1fb25a", 
        borderRadius: 20,
        border: 0,
        padding: "4px 15px 4px 15px",
        color: "white",
    };

    return (
        <button style={style} onClick={onClick}>{children}</button>
    )
}

export default Button;