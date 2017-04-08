import React from 'react';
import { Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/bball.png';

import Team from './Team';
import Teams from './Teams';

import Home from '../containers/Home';
import Player from '../containers/Player';
import SavedPlayers from '../containers/SavedPlayers';

function App() {
  return (
    <div>
      <nav className="navbar navbar-light bg-faded">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" width="30" height="30" />
          Ball is Life
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/saved-players" className="nav-link">Saved Players</Link>
          </li>
          <li className="nav-item">
            <Link to="/teams" className="nav-link">NBA Teams</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        <Route exact path="/" component={Home} />
        <Route path="/saved-players" component={SavedPlayers} />
        <Route path="/teams" component={Teams} />
        <Route path="/team/:teamId" component={Team} />
        <Route path="/player/:playerId" component={Player} />
      </div>
    </div>
  );
}

export default App;
