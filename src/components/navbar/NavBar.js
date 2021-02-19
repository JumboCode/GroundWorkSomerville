import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import logo from './logo.png';
import helpIcon from './help.png';
import cart from './cart.png';

const NavBar = ({ isAuth, logout, showLogin }) => {
    const history = useHistory()
    const style = {
        borderRadius: "0 0 25px 25px",
        boxShadow: "0px 1px 6px 0px rgba(62, 78, 65, 0.5)"
    }
    const handleLog = isAuth ? ()=>{logout(); history.push('/')} : showLogin
    const help = window.innerWidth < 580 ? "Help" : <Image src= {helpIcon} height="15"/>
    return(
        <Navbar collapseOnSelect className="navContainer" expand="sm" sticky="top" bg="light" style={style}>
            <Navbar.Brand>
                <Link to="/">
                    <Image src={logo} height="100"/>
                </Link>
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse>
            <Nav className="ml-auto pr-5">
                <Nav.Item className="m-auto"><Link to="/info">{help} </Link></Nav.Item>
                <Nav.Link className="m-auto" onClick={handleLog}>
                    {isAuth ? "Logout": "Login"}
                </Nav.Link>
                <Nav.Link className="m-auto" >
                    <Image src={cart} height="15" className="pr-1"/>
                    Cart
                </Nav.Link>
            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;