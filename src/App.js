import React from 'react';
import SearchPage from './components/SearchPage';
import LoginPage from './components/Login-Page.js';
import { BrowserRouter, Switch, Route } from 'react-router-dom';


function App() {
    return (
        <div className = "App">
            <BrowserRouter>
                <Switch>
                    <Route exact path='/login' component={LoginPage}></Route>
                    <Route exact path='/search' component={SearchPage}></Route>
                </Switch>
            </BrowserRouter>
        </div>
    );
};

export default App;