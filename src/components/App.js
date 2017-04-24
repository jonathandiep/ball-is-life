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
          <img src={logo} alt="logo" width="30" height="30" className="d-inline-block align-top" />
          Ball is Life
        </Link>
        <div className="nav">
          <Link to="/" className="nav-item nav-link">Home</Link>
          <Link to="/saved-players" className="nav-item nav-link">Saved Players</Link>
          <Link to="/teams" className="nav-item nav-link">NBA Teams</Link>
        </div>
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
