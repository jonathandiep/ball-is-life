import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { BrowserRouter } from 'react-router-dom';
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
    <BrowserRouter history={history}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
);
