import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter as Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { persistStore, autoRehydrate } from 'redux-persist';

import App from './components/App';
import reducers from './redux/reducers';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(
  applyMiddleware(),
  autoRehydrate(),
));

persistStore(store);

const history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root'),
);

/*
ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
        <IndexRoute component={Home} />
      </Route>
      <Route path="/saved-players" component={SavedPlayers} />
      <Route path="/player/:playerId" component={Player} />
      <Route path="/teams" component={Teams} />
      <Route path="/team/:teamId" component={Team} />
    </Router>
  </Provider>,
  document.getElementById('root'),
);
*/
