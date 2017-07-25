import React from 'react'
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux'
import Routes from 'routes';
import thunk from 'redux-thunk';
import pipelineApp from './reducers/index'

import 'babel-polyfill';


// Load SCSS
import '../scss/app.scss';

const isProduction = process.env.NODE_ENV === 'production';

// Creating store
let store = null;

if (isProduction) {
  // In production adding only thunk middleware
  const middleware = applyMiddleware(thunk)(createStore);

  store = createStore(
    pipelineApp,
    middleware
  );
} else {
  // In development mode beside thunk
  // DevTools are added
  const middleware = applyMiddleware(thunk);
  const enhancer = compose(
    middleware,
    // Enable DevTools if browser extension is installed
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() // eslint-disable-line
  );

  store = createStore(
    pipelineApp,
    enhancer
  );
}

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);
