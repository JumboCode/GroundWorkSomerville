import React, { Component } from 'react';
import NavBar from './components/NavBar';
import Vegetables from './components/Vegetables';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className = "App">
                <BrowserRouter>
                    <Switch>
                        <Route path='/' component={NavBar}></Route>
                    </Switch>
                    <Switch>
                        <Route exact path='/' component={Vegetables}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};
export default App;