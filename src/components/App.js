import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import logo from '../assets/bball.png';


function App({ children }) {
  return (
    <div>
      <nav className="navbar navbar-light bg-faded">
        <Link className="navbar-brand" to="/">
          <img src={logo} alt="logo" width="30" height="30" />
          Ball is Life
        </Link>
        <ul className="nav">
          <li className="nav-item">
            <Link to="/" className="nav-link" activeClassName="active">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/saved-players" className="nav-link" activeClassName="active">Saved Players</Link>
          </li>
          <li className="nav-item">
            <Link to="/teams" className="nav-link" activeClassName="active">NBA Teams</Link>
          </li>
        </ul>
      </nav>
      <div className="container">
        {children}
      </div>
    </div>
  );
}

App.propTypes = {
  children: PropTypes.element.isRequired,
};

export default App;
