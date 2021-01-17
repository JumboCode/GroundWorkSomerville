import React, { Component } from 'react';
import Login from './Login.js';
import NavBar from './NavBar.js';
import { Modal } from 'react-bootstrap';
import './Home.css';

class Home extends Component {
    constructor(props) {
        super(props)
        this.state = {showLogin: false, isAuth: false}
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
        this.setState({ showLogin: logBool })
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
        this.setState({ isAuth: true, showLogin: false })
    }

    render() {
        const { showLogin, isAuth } = this.state;
        return (
            <div>
                <NavBar setLoginView={this.setLoginView} isAuth={isAuth} logOut={this.logOut}/>
                <Modal 
                show={showLogin} 
                onHide={() => this.setLoginView(false)}
                size="lg"
                className="login-modal">
                    <Login setAuthToken={this.setAuthToken}/>
                </Modal>
            </div>
        )
    }
}

export default Home;