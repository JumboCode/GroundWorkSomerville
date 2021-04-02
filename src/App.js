import React, { Component } from 'react';
import NavBar from './components/navbar/NavBar';
import Login from './components/login/Login';
import Vegetables from './pages/home/Vegetables';
import InfoPage from './pages/info/InfoPage';
import Inventory from './pages/inventory';
import Checkout from './pages/checkout/Checkout';
import EditAccount from './pages/editAccount';
import Cart from './pages/publicCart/PublicCart';

import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {loginShow: false, 
                      isAuth: false, 
                      isAdmin: false, 
                      token: '',
                      activated: false}
        this.logout = this.logout.bind(this);
        this.login = this.login.bind(this);
    };

    componentDidMount(){
        const key = window.localStorage.getItem('auth-key')
        if (key) {
            var fetchOptions = {
                method: 'GET',
                headers: {'Authorization': `Token ${key}`},
            }
            fetch('user', fetchOptions)
            .then(res => res.ok ? res : Error)
            .then(res => res.json())
            .then(res => {
                const {isAdmin, activated} = res
                this.setState({ isAuth: true, token: key, isAdmin: isAdmin, activated: activated });
            }).catch(err => {
                window.localStorage.removeItem('auth-key')
            });
        }
    }

    logout(){
        const token = window.localStorage.getItem('auth-key')
        axios.post('logout', null, {
            headers: {'Authorization': `Token ${token}`}
        })
        window.localStorage.removeItem('auth-key')
        this.setState({ isAuth: false, isAdmin: false, token: '' })
    };

    login({token, activated, isAdmin}){
        window.localStorage.setItem('auth-key', token);
        this.setState({ isAuth: true, 
                        loginShow: false, 
                        isAdmin: isAdmin, 
                        token: token,
                        activated: activated
                    });
    }

    render() {
        const {loginShow, isAuth, isAdmin, token, activated} = this.state;
        const hideLogin = () => {this.setState({loginShow: false})}
        const showLogin = () => {this.setState({loginShow: true})}
        const activate = () => {this.setState({activated: true})}
        let home;
        if (isAuth) {
            if (!activated) { home = <Redirect to='/edit-account'/> }
                else { home = isAdmin ? <Inventory token={token}/> : "MM Placeholder" }}
        else { home = <Vegetables/> }

        return (
            <div className = "App">
                <BrowserRouter>
                    <NavBar isAuth={isAuth} logout={this.logout} showLogin={showLogin}/>
                    <Login show={loginShow} onHide={hideLogin} login={this.login}/>
                    <Switch>
                        <Route exact path='/'>{home}</Route>
                        <Route exact path='/info' component={InfoPage}></Route>
                        <Route exact path='/checkout' component={Checkout}></Route>
                        <Route exact path='/inventory' component={Inventory}></Route>
                        <Route exact path='/cart' component={Cart}></Route>
                        {/* <Route exact path='inventory/editItem' component={EditItem}></Route> */}
                        <Route exact path='/edit-account'>
                            {isAuth ? <EditAccount token={token} activate={activate} activated={activated}/> : <Redirect to='/'/>}
                        </Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};
export default App;