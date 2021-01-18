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
        const help = window.innerWidth < 580 ? "Help" : <Image src="/static/help.png" height="15"/>
        return(
            <Navbar collapseOnSelect className="navContainer" expand="sm">
                <Navbar.Brand>
                    <Image src="/static/logo.png" height="100"/>
                </Navbar.Brand>
                <Navbar.Toggle/>
                <Navbar.Collapse>
                <Nav className="ml-auto pr-5">
                    <Nav.Link className="m-auto" >{help}</Nav.Link>
                    <Nav.Link className="m-auto" onClick={this.handleLogButton}>
                        {isAuth ? "Logout": "Login"}
                    </Nav.Link>
                    <Nav.Link className="m-auto" >
                        <Image src="/static/cart.png" height="15" className="pr-1"/>
                        Cart
                    </Nav.Link>
                </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default NavBar;