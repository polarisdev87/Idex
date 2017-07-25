import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router'

import { registrationClearErrors } from './register'
import { fetchUsers } from './users'
import { API_BASE_URI, ID_TOKEN_KEY } from '../const'

export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';

function requestLogin() {
  return {
    type: LOGIN_REQUEST
  }
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    role: user.role,
    id_token: user.id_token
  }
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    message
  }
}

export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';

function removeLoginErrors() {
  return {
    type: CLEAR_LOGIN_ERRORS
  }
}


export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';

function requestLogout() {
  return {
    type: LOGOUT_REQUEST
  }
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS
  }
}

export function clearLoginErrors() {
  return dispatch => {
    dispatch(removeLoginErrors())
  }
}

export function handleLoginError(message) {
  return dispatch => {
    dispatch(loginError(message));
  }
}


export function loginUser(creds) {

  let payload = {
    username: creds.username,
    password: creds.password
  };

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  };

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin());
    return fetch(`${API_BASE_URI}/auth`, config)
      .then(response =>
        response.json()
          .then(body => ({ body, response }))
      ).then(({ body, response }) =>  {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(body.error));
          return Promise.reject(body.error)
        }
        else {
          // If login was successful, set the token in local storage
          localStorage.setItem(ID_TOKEN_KEY, body.token);

          const user = {
            token: body.token,
            role: jwtDecode(body.token).role.authority
          };

          // Dispatch the success action
          dispatch(receiveLogin(user));
          dispatch(registrationClearErrors());
          dispatch(fetchUsers());

          browserHistory.push('/users');
        }
      }).catch(err => {
        dispatch(loginError(err));
        console.log("Error: ", err)
      })
  }
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem(ID_TOKEN_KEY);
    dispatch(receiveLogout());
    browserHistory.push('/');
  }
}

export const SET_ROLE = 'SET_ROLE';

function setRole(role) {
  return {
    type: SET_ROLE,
    role
  }
}

export function setRoleFromJwt() {

  let token = localStorage.getItem(ID_TOKEN_KEY) || null;

  if(token) {
    const role = jwtDecode(token).role.authority;
    return dispatch => {
      dispatch(setRole(role));
    }
  } else {
    return dispatch => {
      dispatch(setRole('ROLE_NONE'));
    }
  }
}
