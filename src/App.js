import React, { Component } from 'react';
import {
    HashRouter,
    NavLink,
    Route,
} from 'react-router-dom';
import './App.css';
import NewGame from './screens/NewGame';
import Leaderboards from './screens/Leaderboards';

class App extends Component {
  render() {
    return (
      <HashRouter>
          <div className="App">
              <header className="App-header">
                  <h1 className="App-title">Pool Leaderboards</h1>
                  <ul>
                      <li><NavLink to="/new-game">New Game</NavLink></li>
                      <li><NavLink to="/leaderboards">Leaderboards</NavLink></li>
                  </ul>
              </header>
              <div className="App-content">
                  <Route path="/new-game" component={NewGame}/>
                  <Route path="/leaderboards" component={Leaderboards}/>
              </div>
          </div>
      </HashRouter>
    );
  }
}

export default App;
