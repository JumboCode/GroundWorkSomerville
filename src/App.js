import React, { Component } from 'react';
import NavBar from './components/navbar/NavBar';
import Vegetables from './pages/home/Vegetables';
import InfoPage from './pages/info/InfoPage';
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
                        <Route exact path='/info' component={InfoPage}></Route>
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};
export default App;