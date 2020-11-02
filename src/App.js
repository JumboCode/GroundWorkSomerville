import React from 'react';
import './BoardGame.js'
import LoginPage from './Login-Page.js';
import BoardGame from './BoardGame.js';
import { Switch, Route } from 'react-router-dom';


class App extends React.Component {
    render() {
      return (
        <div className = "App">
          <Main />
        </div>
      );
    }
  }
  
  const Main = () => (
    <Switch>
      <Route exact path='/login' component={LoginPage}></Route>
      <Route exact path='/boardgame' component={BoardGame}></Route>
    </Switch>
  );

  // ========================================
  // /* the difference between ()=> props.onClick(), props.onClick() and props.onClick */
  // ReactDOM.render(
  //   <Game />,
  //   document.getElementById('root')
  // );
  
  export default App;
