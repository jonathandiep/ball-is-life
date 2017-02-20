import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';
import reducers from './redux/reducers';

import Home from './containers/Home';
import Player from './containers/Player';
import Team from './containers/Team';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware()
));

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
        <Route path="/team" component={Team} />
        <Route path="/player/:playerId" component={Player} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
