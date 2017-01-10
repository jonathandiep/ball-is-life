import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import Home from './components/Home';
import Team from './components/Team';
import Player from './components/Player';

ReactDOM.render(
  <Router history={browserHistory}>
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/team" component={Team} />
      <Route path="/player/:playerId" component={Player} />
    </Route>
  </Router>,
  //<App />,
  document.getElementById('root')
);
