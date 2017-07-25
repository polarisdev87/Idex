import jwtDecode from 'jwt-decode';
import { browserHistory } from 'react-router'

import { receiveLogin } from './auth';
import { fetchUsers } from './users'
import { API_BASE_URI, ID_TOKEN_KEY } from '../const'

export const REGISTRATION_REQUEST = 'REGISTRATION_REQUEST';
export const REGISTRATION_SUCCESS = 'REGISTRATION_SUCCESS';
export const REGISTRATION_FAILURE = 'REGISTRATION_FAILURE';
export const REGISTRATION_CLEAR_ERRORS = 'REGISTRATION_CLEAR_ERRORS';

function requestRegistration() {
  return {
    type: REGISTRATION_REQUEST
  }
}

function receiveRegistration(user) {
  return {
    type: REGISTRATION_SUCCESS,
    id_token: user.id_token
  }
}

function registrationError(message) {
  return {
    type: REGISTRATION_FAILURE,
    message: message
  }
}

export function registrationClearErrors() {
  return {
    type: REGISTRATION_CLEAR_ERRORS
  }
}

export function handleRegistrationError(message) {
  return dispatch => {
    dispatch(registrationError(message));
  }
}

export function registerUser(creds) {

  let payload = {
    firstName: creds.firstName,
    lastName: creds.lastName,
    username: creds.username,
    email: creds.email,
    confirmEmail: creds.confirmEmail,
    password: creds.password,
    confirmPassword: creds.confirmPassword
  };

  let config = {
    method: 'POST',
    headers: { 'Content-Type':'application/json' },
    body: JSON.stringify(payload)
  };

  return dispatch => {
    dispatch(requestRegistration());

    return fetch(`${API_BASE_URI}/auth/create`, config)
      .then(response =>
        response.json()
          .then(body => ({ body, response }))
      ).then(({ body, response}) => {
          if(!response.ok) {
            dispatch(handleRegistrationError(body.error));
            return Promise.reject(body.error);
          } else {
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

            browserHistory.push('/users');
          }
        }
      )
  }
}