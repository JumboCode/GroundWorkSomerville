import React, { Component } from 'react';
import { Navbar, Nav, Image, Modal} from 'react-bootstrap';
import './NavBar.css'
import Login from './Login.js';
import axios from 'axios';
import { Link } from 'react-router-dom';
import logo from '../assets/logo.png';
import helpIcon from '../assets/help.png';
import cart from '../assets/cart.png';

class NavBar extends Component {
    constructor(props) {
        super(props);
        this.state = {loginShow: false, isAuth: false}
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
        this.handleLogButton = this.handleLogButton.bind(this);
    };

    componentDidMount(){
        // Might need verification from the backend
        const key = window.localStorage.getItem('auth-key')
        if (key) {
            this.setState({ isAuth: true });
        }
    }

    handleLogButton(){
        if (this.state.isAuth) {
            this.logout()
        } else {
            this.setState({ loginShow: true })
        }
    }

    logout(){
        const token = window.localStorage.getItem('auth-key')
        axios.post('rest-auth/logout/', null, {
            headers: {'Authorization': `Token ${token}`}
        })
        window.localStorage.removeItem('auth-key')
        this.setState({ isAuth: false })
        this.props.history.push('/')
    }

    login(key){
        window.localStorage.setItem('auth-key', key);
        this.setState({ isAuth: true, loginShow: false });
    }

    render() {
        const help = window.innerWidth < 580 ? "Help" : <Image src= {helpIcon} height="15"/>
        const hideModal = () => this.setState({ loginShow: false });
        return(
                <Navbar collapseOnSelect className="navContainer" expand="sm" sticky="top" bg="light">
                    <Navbar.Brand>
                        <Link to="/">
                            <Image src={logo} height="100"/>
                        </Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                    <Navbar.Collapse>
                    <Nav className="ml-auto pr-5">
                        <Nav.Link className="m-auto"><Link to="/info">{help} </Link></Nav.Link>
                        <Nav.Link className="m-auto" onClick={this.handleLogButton}>
                            {this.state.isAuth ? "Logout": "Login"}
                        </Nav.Link>
                        <Nav.Link className="m-auto" >
                            <Image src={cart} height="15" className="pr-1"/>
                            Cart
                        </Nav.Link>
                    </Nav>
                    </Navbar.Collapse>

                    <Modal show={this.state.loginShow} onHide={hideModal} size="lg" className="login-modal" centered>
                        <Login login={this.login}/>
                    </Modal>
                </Navbar>
        );
    }
}

export default NavBar;