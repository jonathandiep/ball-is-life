import React from 'react';
import { Link } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/d3.basketball-shot-chart.css';

App.propTypes = {
  children: React.PropTypes.element.isRequired,
};

function App({ children }) {
  return (
    <div>
      <nav className="navbar navbar-light bg-faded">
        <ul className="nav navbar-nav">
          <li className="nav-item">
            <Link to="/" className="nav-link" activeClassName="active">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/team" className="nav-link" activeClassName="active">Team</Link>
          </li>
        </ul>
      </nav>
      <div>
        {children}
      </div>
    </div>
  );
}

export default App;
