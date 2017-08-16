import { API_BASE_URI, ID_TOKEN_KEY } from '../const'


export const GET_IDEAS_REQUEST = 'GET_IDEAS_REQUEST';
export const GET_IDEAS_SUCCESS = 'GET_IDEAS_SUCCESS';
export const GET_IDEAS_FAILURE = 'GET_IDEAS_FAILURE';

function getIdeasRequest() {
  return {
    type: GET_IDEAS_REQUEST
  }
}

function getIdeasError(message) {
  return {
    type: GET_IDEAS_FAILURE,
    message
  }
}

function getIdeasSuccess(ideas) {
  return {
    type: GET_IDEAS_SUCCESS,
    ideas
  }
}

export function fetchIdeas() {

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
    dispatch(getIdeasRequest());
    return fetch(`${API_BASE_URI}/ideas/all`, config)
      .then(response =>
        response.json()
          .then(body => ({ body, response }))
      ).then(({ body, response }) =>  {
        if (!response.ok) {
          dispatch(getIdeasError('Failed to get ideas. ' + body.error));
          return Promise.reject(body.error)
        } else {
          dispatch(getIdeasSuccess(body));
        }
      }).catch(err => {
        dispatch(getIdeasError('Failed to get ideas. ' + err));
        console.log("Error: ", err)
      })
  };
}

export const UPDATE_IDEA_REQUEST = 'UPDATE_IDEA_REQUEST';
export const UPDATE_IDEA_SUCCESS = 'UPDATE_IDEA_SUCCESS';
export const UPDATE_IDEA_FAILURE = 'UPDATE_IDEA_FAILURE';

function updateIdeaRequest() {
  return {
    type: UPDATE_IDEA_REQUEST
  }
}

function updateIdeaError(message) {
  return {
    type: UPDATE_IDEA_FAILURE,
    message
  }
}

function updateIdeaSuccess(users) {
  return {
    type: UPDATE_IDEA_SUCCESS,
    users
  }
}

export function updateIdea(idea) {

  let token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if(token) {
    config = {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify(idea)
    };
  } else {
    throw "No token saved!"
  }

  return dispatch => {
    dispatch(updateIdeaRequest());
    return fetch(`${API_BASE_URI}/ideas`, config)
      .then(response =>
        response.json()
          .then(body => ({ body, response }))
      ).then(({ body, response }) =>  {
        if (!response.ok) {
          dispatch(updateIdeaError('Failed to update idea. ' + body.error));
          return Promise.reject('Failed to update idea');
        } else {
          dispatch(updateIdeaSuccess(body));
        }
      }).catch(err => {
        dispatch(updateIdeaError('Failed to update user. ' + err));
        console.log("Error: ", err)
      })
  };
}


export const DELETE_IDEAS_REQUEST = 'DELETE_IDEAS_REQUEST';
export const DELETE_IDEAS_SUCCESS = 'DELETE_IDEAS_SUCCESS';
export const DELETE_IDEAS_FAILURE = 'DELETE_IDEAS_FAILURE';

function deleteIdeasRequest() {
  return {
    type: DELETE_IDEAS_REQUEST
  }
}

function deleteUsersError(message) {
  return {
    type: DELETE_IDEAS_FAILURE,
    message
  }
}

function deleteUsersSuccess(ideas) {
  return {
    type: DELETE_IDEAS_SUCCESS,
    ideas
  }
}

export function deleteIdeas(ideaIds) {

  let token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if(token) {
    config = {
      headers: {
        'Authorization': `${token}`,
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
      body: JSON.stringify(ideaIds)
    };
  } else {
    throw "No token saved!"
  }

  return dispatch => {
    dispatch(deleteIdeasRequest());
    return fetch(`${API_BASE_URI}/ideas`, config)
      .then(response =>
        response.json()
          .then(body => ({ body, response }))
      ).then(({ body, response }) =>  {
        if (!response.ok) {
          dispatch(deleteUsersError('Failed to delete idea. ' + body.error));
          return Promise.reject('Failed to update idea');
        } else {
          dispatch(deleteUsersSuccess(body));
        }
      }).catch(err => {
        dispatch(deleteUsersError('Failed to delete idea. ' + err));
        console.log("Error: ", err);
      })
  };
}