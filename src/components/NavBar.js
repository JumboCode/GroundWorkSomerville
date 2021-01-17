import React, { Component } from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import './NavBar.css'

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.handleLogButton = this.handleLogButton.bind(this);
    };

    handleLogButton(){
        const { isAuth, setLoginView, logOut } = this.props
        if (isAuth) {
            logOut()
        } else {
            setLoginView(true)
        }
    }

    render() {
        const { isAuth } = this.props;
        return(
            <Navbar className="navContainer" variant="dark">
                <Navbar.Brand>
                    <Image src="/static/logo.png" height="100"/>
                </Navbar.Brand>
                <Nav className="button-container">
                    <Image src="/static/help.png" height="35" className="nav-pad"/>
                    <button className="nav-button nav-pad" onClick={this.handleLogButton}>
                        {isAuth ? "Logout": "Login"}
                    </button>
                    <button className="nav-button nav-pad">
                        <Image src="/static/cart.png" height="15" className="cart-image"/>
                        Cart
                    </button>
                </Nav>
            </Navbar>
        );
    }
}

export default NavBar;