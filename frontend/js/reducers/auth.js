import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_SUCCESS, CLEAR_LOGIN_ERRORS,
  SET_ROLE
} from '../actions/auth'

import { ID_TOKEN_KEY } from '../const'

export function auth(state = {
  isFetchingCreds: false,
  isAuthenticated: !!localStorage.getItem(ID_TOKEN_KEY),
  role: 'ROLE_NONE'
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetchingCreds: true,
        isAuthenticated: false
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetchingCreds: false,
        isAuthenticated: true,
        role: action.role,
        loginErrorMessage: ''
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetchingCreds: false,
        isAuthenticated: false,
        loginErrorMessage: action.message
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetchingCreds: false,
        isAuthenticated: false,
        role: 'ROLE_NONE'
      });
    case CLEAR_LOGIN_ERRORS:
      return Object.assign({}, state, {
        loginErrorMessage: ''
      });
    case SET_ROLE:
      return Object.assign({}, state, {
        isAuthenticated: true,
        role: action.role
      });
    default:
      return state
  }
}