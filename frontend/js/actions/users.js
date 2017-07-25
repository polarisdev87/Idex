import { API_BASE_URI, ID_TOKEN_KEY } from '../const'


export const GET_USERS_REQUEST = 'GET_USERS_REQUEST';
export const GET_USERS_SUCCESS = 'GET_USERS_SUCCESS';
export const GET_USERS_FAILURE = 'GET_USERS_FAILURE';

function getUsersRequest() {
  return {
    type: GET_USERS_REQUEST
  }
}

function getUsersError(message) {
  return {
    type: GET_USERS_FAILURE,
    message
  }
}

function getUsersSuccess(users) {
  return {
    type: GET_USERS_SUCCESS,
    users
  }
}

export function fetchUsers() {

  let token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if(token) {
    config = {
      headers: { 'Authorization': `${token}` }
    };
  } else {
    throw "No token saved!"
  }

  return dispatch => {
    dispatch(getUsersRequest());
    return fetch(`${API_BASE_URI}/manage/users`, config)
      .then(response =>
        response.json()
          .then(body => ({ body, response }))
      ).then(({ body, response }) =>  {
        if (!response.ok) {
          dispatch(getUsersError('Failed to get users. ' + body.error));
          return Promise.reject(body.error)
        } else {
          dispatch(getUsersSuccess(body));
        }
      }).catch(err => {
        dispatch(getUsersError('Failed to get users. ' + err));
        console.log("Error: ", err)
      })
  };
}



export const UPDATE_USER_REQUEST = 'UPDATE_USER_REQUEST';
export const UPDATE_USER_SUCCESS = 'UPDATE_USER_SUCCESS';
export const UPDATE_USER_FAILURE = 'UPDATE_USER_FAILURE';

function updateUserRequest() {
  return {
    type: UPDATE_USER_REQUEST
  }
}

function updateUserError(message) {
  return {
    type: UPDATE_USER_FAILURE,
    message
  }
}

function updateUserSuccess(users) {
  return {
    type: UPDATE_USER_SUCCESS,
    users
  }
}

export function updateUser(user) {

  let token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if(token) {
    config = {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(user)
    };
  } else {
    throw "No token saved!"
  }

  return dispatch => {
    dispatch(updateUserRequest());
    return fetch(`${API_BASE_URI}/manage/user`, config)
      .then(response =>
        response.json()
          .then(body => ({ body, response }))
      ).then(({ body, response }) =>  {
        if (!response.ok) {
          dispatch(updateUserError('Failed to update user. ' + body.error));
          return Promise.reject('Failed to update user');
        } else {
          dispatch(updateUserSuccess(body));
        }
      }).catch(err => {
        dispatch(updateUserError('Failed to update user. ' + body.error));
        console.log("Error: ", err)
      })
  };
}


export const DELETE_USERS_REQUEST = 'DELETE_USERS_REQUEST';
export const DELETE_USERS_SUCCESS = 'DELETE_USERS_SUCCESS';
export const DELETE_USERS_FAILURE = 'DELETE_USERS_FAILURE';

function deleteUsersRequest() {
  return {
    type: DELETE_USERS_REQUEST
  }
}

function deleteUsersError(message) {
  return {
    type: DELETE_USERS_FAILURE,
    message
  }
}

function deleteUsersSuccess(users) {
  return {
    type: DELETE_USERS_SUCCESS,
    users
  }
}

export function deleteUsers(userIds) {

  let token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if(token) {
    config = {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      body: JSON.stringify(userIds)
    };
  } else {
    throw "No token saved!"
  }

  return dispatch => {
    dispatch(deleteUsersRequest());
    return fetch(`${API_BASE_URI}/admin/user`, config)
      .then(response =>
        response.json()
          .then(body => ({ body, response }))
      ).then(({ body, response }) =>  {
        if (!response.ok) {
          dispatch(deleteUsersError('Failed to delete user. ' + body.error));
          return Promise.reject('Failed to update user');
        } else {
          dispatch(deleteUsersSuccess(body));
        }
      }).catch(err => {
        dispatch(deleteUsersError('Failed to delete user. ' + err));
        console.log("Error: ", err);
      })
  };
}