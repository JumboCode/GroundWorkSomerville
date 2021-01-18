import React, { Component } from 'react';
import Login from './Login.js';
import NavBar from './NavBar.js';
import { Modal } from 'react-bootstrap';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {loginShow: false, isAuth: false}
        this.setLoginView = this.setLoginView.bind(this);
        this.logOut = this.logOut.bind(this);
        this.setAuthToken = this.setAuthToken.bind(this);
        
        // Might need verification from the backend
        const key = window.localStorage.getItem('auth-key')
        if (key) {
            this.setState({isAuth: true})
        }
    };

    setLoginView(logBool){
        this.setState({ loginShow: logBool })
    }

    logOut(){
        fetch('API_BASE/rest-auth/logout/', {method: 'POST'})
        .then((res) => {
            if (res.ok) {
                window.localStorage.removeItem('auth-key')
                this.setState({ isAuth: false })
            }
        })
    }

    setAuthToken(key){
        window.localStorage.setItem('auth-key', key);
        this.setState({ isAuth: true, loginShow: false })
    }

    render() {
        const { loginShow, isAuth } = this.state;
        const hideLogin = () => this.setLoginView(false);
        return (
            <div>
                <NavBar setLoginView={this.setLoginView} isAuth={isAuth} logOut={this.logOut}/>
                <Modal show={loginShow} onHide={hideLogin} size="lg" className="login-modal" centered>
                    <Login setAuthToken={this.setAuthToken}/>
                </Modal>
            </div>
        )
    }
}

export default Home; 