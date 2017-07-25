import React, { Component } from 'react';
import {Router, Route, browserHistory, IndexRoute} from 'react-router';

import { ID_TOKEN_KEY } from './const'
import App from './views/App';
import LoginFull from "./views/LoginFull";
import Register from "./views/Register";
import Users from "./views/Users";

const publicPath = '/';

export const routeCodes = {
  DASHBOARD: publicPath,
  ABOUT: `${ publicPath }about`,
};

function requireAuth(nextState, replace) {
  if (!localStorage.getItem(ID_TOKEN_KEY)) {
    replace({
      pathname: '/login'
    })
  }
}

function requireNotAuth(nextState, replace) {
  if (localStorage.getItem(ID_TOKEN_KEY)) {
    replace({
      pathname: '/users'
    })
  }
}

export default class Routes extends Component {
  render() {
    return (
      <Router history={ browserHistory }>
        <Route path={ "/" } component={ App } >
          <IndexRoute path="" component={ LoginFull } onEnter={ requireNotAuth } />
          <Route path={ "/login" } component={ LoginFull } onEnter={ requireNotAuth } />
          <Route path={ "/register" } component={ Register } />
          <Route path={ "/users" } component={ Users } onEnter={ requireAuth } />
        </Route>
      </Router>
    );
  }
}