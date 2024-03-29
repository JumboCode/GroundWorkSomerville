import React from 'react';
import { Navbar, Nav, Image } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';
import logo from './logo.png';
import helpIcon from './help.png';
import cart from './cart.png';
import externalpage from './external-page.png';


const NavBar = ({ isAuth, logout, showLogin, showCart}) => {
    const history = useHistory()
    const style = {
        borderRadius: "0 0 25px 25px",
        boxShadow: "0px 1px 6px 0px rgba(62, 78, 65, 0.5)"
    }
    const handleLog = isAuth ? ()=>{logout(); history.push('/')} : showLogin
    const help = window.innerWidth < 580 ? "Help" : <Image src= {helpIcon} height="25"/>
    return(
        <Navbar collapseOnSelect expand="sm" sticky="top" bg="light" style={style}>
            <Navbar.Brand>
                <Link to="/" onClick={(e) => showCart(false)}>
                    <Image src={logo} height="80"/>
                </Link>
            </Navbar.Brand>
            <a href = "http://www.groundworksomerville.org/">
                    <Image src={externalpage} height="40"/>
            </a>
            <Navbar.Toggle/>
            <Navbar.Collapse>
            <Nav className="ml-auto pr-5">
                <Nav.Item className="m-auto"><Link to="/info">{help} </Link></Nav.Item>
                <Nav.Link className="m-auto" onClick={(e) => showCart("toggle")}>
                    <Image src={cart} height="25" className="pr-1" />
                </Nav.Link>
                <Nav.Link className="m-auto" onClick={handleLog}>
                    {isAuth ? "Logout": "Login"}
                </Nav.Link>

            </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}

export default NavBar;