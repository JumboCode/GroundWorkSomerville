import React, { Component } from 'react';
import Home from './components/Home.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <div className = "App">
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    };
};

export default App;