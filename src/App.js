import React, { Component } from 'react';
import NavBar from './components/navbar/NavBar';
import Login from './components/login/Login';
import Vegetables from './pages/home/Vegetables';
import InfoPage from './pages/info/InfoPage';
import Inventory from './pages/inventory';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loginShow: false, isAuth: false}
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
    };

    componentDidMount(){
        // Might need verification from the backend
        const key = window.localStorage.getItem('auth-key')
        if (key) {
            this.setState({ isAuth: true });
        }
    }

    logout(){
        const token = window.localStorage.getItem('auth-key')
        axios.post('rest-auth/logout/', null, {
            headers: {'Authorization': `Token ${token}`}
        })
        window.localStorage.removeItem('auth-key')
        this.setState({ isAuth: false })
    };

    login(key){
        window.localStorage.setItem('auth-key', key);
        this.setState({ isAuth: true, loginShow: false });
    }

    render() {
        const {loginShow, isAuth} = this.state;
        const hideLogin = () => {this.setState({loginShow: false})}
        const showLogin = () => {this.setState({loginShow: true})}
        return (
            <div className = "App">
                <BrowserRouter>
                    <NavBar isAuth={isAuth} logout={this.logout} showLogin={showLogin}/>
                    <Login show={loginShow} onHide={hideLogin} login={this.login}/>
                    <Switch>
                        <Route exact path='/' component={Vegetables}></Route>
                        <Route exact path='/info' component={InfoPage}></Route>
                        <Route exact path='/inventory' component={Inventory}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};
export default App;