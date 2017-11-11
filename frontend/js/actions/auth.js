import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router';

// import { registrationClearErrors } from './register';
import { fetchUsers } from './users';
import { API_BASE_URI, ID_TOKEN_KEY } from '../const';

/** ------------------------------------------------------------- **/
/** Login Actions **/
/** ------------------------------------------------------------- **/
export const LOGIN_REQUEST = 'LOGIN_REQUEST';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const CLEAR_LOGIN_ERRORS = 'CLEAR_LOGIN_ERRORS';
export const LOGOUT_REQUEST = 'LOGOUT_REQUEST';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAILURE = 'LOGOUT_FAILURE';
export const SET_ROLE = 'SET_ROLE';
export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const REGISTRATION_CLEAR_ERRORS = 'REGISTRATION_CLEAR_ERRORS';

function requestLogin() {
  return {
    type: LOGIN_REQUEST,
  };
}

export function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    role: user.role,
    id_token: user.id_token,
  };
}

function loginError(message) {
  return {
    type: LOGIN_FAILURE,
    message,
  };
}

function removeLoginErrors() {
  return {
    type: CLEAR_LOGIN_ERRORS,
  };
}

function requestLogout() {
  return {
    type: LOGOUT_REQUEST,
  };
}

function receiveLogout() {
  return {
    type: LOGOUT_SUCCESS,
  };
}

export function clearLoginErrors() {
  return dispatch => {
    dispatch(removeLoginErrors());
  };
}

export function registrationClearErrors() {
  return {
    type: REGISTRATION_CLEAR_ERRORS,
  };
}

export function handleLoginError(message) {
  return dispatch => {
    dispatch(loginError(message));
  };
}

export function loginUser(creds) {
  const payload = {
    username: creds.username,
    password: creds.password,
  };

  const config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return dispatch => {
    // We dispatch requestLogin to kickoff the call to the API
    dispatch(requestLogin());
    return fetch(`${API_BASE_URI}/auth`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          // If there was a problem, we want to
          // dispatch the error condition
          dispatch(loginError(body.error));
          return Promise.reject(body.error);
        }
        // If login was successful, set the token in local storage
        localStorage.setItem(ID_TOKEN_KEY, body.token);

        const user = {
          token: body.token,
          role: jwtDecode(body.token).role.authority,
        };

        // Dispatch the success action
        dispatch(receiveLogin(user));
        dispatch(registrationClearErrors());
        dispatch(fetchUsers());

        browserHistory.push('/ideas');
        return true;
      }).catch(err => {
        dispatch(loginError(err));
        console.log("Error: ", err);
      });
  };
}

export function logoutUser() {
  return dispatch => {
    dispatch(requestLogout());
    localStorage.removeItem(ID_TOKEN_KEY);
    dispatch(receiveLogout());
    browserHistory.push('/');
  };
}

function setRole(role) {
  return {
    type: SET_ROLE,
    role,
  };
}

export function setRoleFromJwt() {
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
  if (token) {
    const role = jwtDecode(token).role.authority;
    return dispatch => {
      dispatch(setRole(role));
    };
  }
  return dispatch => {
    dispatch(setRole('ROLE_NONE'));
  };
}

/** ------------------------------------------------------------- **/
/** Register Actions **/
/** ------------------------------------------------------------- **/

function requestRegistration() {
  return {
    type: REGISTRATION_REQUEST,
  };
}

function receiveRegistration(user) {
  return {
    type: REGISTRATION_SUCCESS,
    id_token: user.id_token,
  };
}

function registrationError(message) {
  return {
    type: REGISTRATION_FAILURE,
    message: message,
  };
}

export function handleRegistrationError(message) {
  return dispatch => {
    dispatch(registrationError(message));
  };
}

export function registerUser(creds) {

  let payload = {
    firstName: creds.firstName,
    lastName: creds.lastName,
    username: creds.username,
    email: creds.email,
    confirmEmail: creds.confirmEmail,
    password: creds.password,
    confirmPassword: creds.confirmPassword,
  };

  let config = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  };

  return dispatch => {
    dispatch(requestRegistration());

    return fetch(`${API_BASE_URI}/auth/create`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(handleRegistrationError(body.error));
          return Promise.reject(body.error);
        }
        console.log('body ===> ', body);
        localStorage.setItem(ID_TOKEN_KEY, body.token);
        // Dispatch the success action
        dispatch(receiveRegistration(body));
        const user = {
          token: body.token,
          role: jwtDecode(body.token).role.authority
        };
        dispatch(receiveLogin(user));
        dispatch(registrationClearErrors());
        dispatch(fetchUsers());
        browserHistory.push('/ideas');
        return true;
      }).catch(err => {
        dispatch(registrationError(err));
        console.log("Error: ", err);
      });
  };
}
