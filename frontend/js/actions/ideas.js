import { API_BASE_URI, ID_TOKEN_KEY } from '../const';

const queryString = require('query-string');


export const GET_IDEAS_REQUEST = 'GET_IDEAS_REQUEST';
export const GET_IDEAS_SUCCESS = 'GET_IDEAS_SUCCESS';
export const GET_IDEAS_FAILURE = 'GET_IDEAS_FAILURE';

function getIdeasRequest() {
  return {
    type: GET_IDEAS_REQUEST,
  };
}

function getIdeasError(message) {
  return {
    type: GET_IDEAS_FAILURE,
    message,
  };
}

function getIdeasSuccess(ideas) {
  const newIdeas = ideas.map((idea) => { idea.anonymousMode = false; return idea; });

  return {
    type: GET_IDEAS_SUCCESS,
    ideas: newIdeas,
  };
}

/**
 *
 * Get the ideas according to the filter
 *
 * @param {} filter
 *      Value entered on the sortby field (main filter is Newest or Top)
 * @param {*} stages
 *      Asked stages : Any Stage (default) / Incubation / Prototyping / Launched / Cancelled
 * @param {*} submittedAtMsMin
 *      Type of top filter Past Hour / Past Day / Past Week / Past Month / Past Year / All time
 * @param {*} submittedAtMsMax
 * @param {*} votesMin
 * @param {*} votesMax
 * @param {*} profitMin
 * @param {*} profitMax
 * @param {*} implementationTimeMsMin
 * @param {*} implementationTimeMsMax
 * @param {*} tags
 */
export function fetchIdeas(
  filter, stages, submittedAtMsMin, submittedAtMsMax,
  votesMin, votesMax, profitMin, profitMax, implementationTimeMsMin,
  implementationTimeMsMax, tags, partialFullSwitch,
) {
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;


  let config = {
    method: 'GET',
  };

  const query = {
    filter,
    stages,
    submittedAtMsMin,
    submittedAtMsMax,
    votesMin,
    votesMax,
    profitMin,
    profitMax,
    implementationTimeMsMin,
    implementationTimeMsMax,
    tags,
    partialFullSwitch,
  };

  if (token) {
    config = {
      headers: { Authorization: `${token}` },
    };
  } else {
    throw 'No token saved!';
  }

  console.log('actions/fetchIdeas');
  console.log(filter);
  return dispatch => {
    dispatch(getIdeasRequest());

    const url = `${API_BASE_URI}/ideas?${queryString.stringify(query)}`;

    return fetch(url, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(getIdeasError(`Failed to get ideas. ${body.error}`));
          return Promise.reject(body.error);
        }
        console.log('ideas.js.fetchIdeas(...) is ok');
        console.log(query);
        console.log(queryString);
        console.log(body);

        dispatch(getIdeasSuccess(body));
        return true;
      }).catch(err => {
        dispatch(getIdeasError(`Failed to get ideas. ${err}`));
        console.log('Error: ', err);
      });
  };
}

export const UPDATE_IDEA_REQUEST = 'UPDATE_IDEA_REQUEST';
export const UPDATE_IDEA_SUCCESS = 'UPDATE_IDEA_SUCCESS';
export const UPDATE_IDEA_FAILURE = 'UPDATE_IDEA_FAILURE';

function updateIdeaRequest() {
  return {
    type: UPDATE_IDEA_REQUEST,
  };
}

function updateIdeaError(message) {
  return {
    type: UPDATE_IDEA_FAILURE,
    message,
  };
}

function updateIdeaSuccess(idea, anonymousMode) {
  console.log('updateIdeaSuccess');
  console.log(idea);
  console.log(anonymousMode);
  const newIdea = Object.assign({}, idea, { anonymousMode });
  console.log(newIdea);

  return {
    type: UPDATE_IDEA_SUCCESS,
    idea: newIdea,
  };
}

export function handleUpdateIdeaError(message) {
  return dispatch => {
    dispatch(updateIdeaError(message));
  };
}

export function updateIdea(idea, files) {
  console.log('updateIdea(idea) initial');
  console.log(idea);
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if (token) {
    const jsFiles = files.map((file) => ({
      lastModified: file.lastModified,
      lastModifiedDate: file.lastModifiedDate,
      name: file.name,
      size: file.size,
      type: file.type,
    }));

    const newIdea = Object.assign({}, idea, { files: jsFiles });
    console.log('idea to post');
    console.log(newIdea);
    config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(newIdea),
    };
  } else {
    throw 'No token saved!';
  }
  return dispatch => {
    dispatch(updateIdeaRequest());
    console.log('updateIdea(idea)');
    console.log(idea);
    return fetch(`${API_BASE_URI}/ideas`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(updateIdeaError(`Failed to update idea. ${body.error}`));
          return Promise.reject('Failed to update idea');
        }
        // TODO: Take anonymousMode from userSession property
        dispatch(updateIdeaSuccess(body, idea.anonymousMode));
        return true;
      }).catch(err => {
        dispatch(updateIdeaError(`Failed to update user. ${err}`));
        console.log('Error: ', err);
      });
  };
}


export const DELETE_IDEAS_REQUEST = 'DELETE_IDEAS_REQUEST';
export const DELETE_IDEAS_SUCCESS = 'DELETE_IDEAS_SUCCESS';
export const DELETE_IDEAS_FAILURE = 'DELETE_IDEAS_FAILURE';

function deleteIdeasRequest() {
  return {
    type: DELETE_IDEAS_REQUEST,
  };
}

function deleteUsersError(message) {
  return {
    type: DELETE_IDEAS_FAILURE,
    message,
  };
}

function deleteUsersSuccess(ideas) {
  return {
    type: DELETE_IDEAS_SUCCESS,
    ideas,
  };
}

export function deleteIdeas(ideaIds) {
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if (token) {
    config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(ideaIds),
    };
  } else {
    throw 'No token saved!';
  }

  return dispatch => {
    dispatch(deleteIdeasRequest());
    return fetch(`${API_BASE_URI}/ideas`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(deleteIdeasError(`Failed to delete idea. ${body.error}`));
          return Promise.reject('Failed to update idea');
        }
        dispatch(deleteIdeasSuccess(body));
      }).catch(err => {
        dispatch(deleteIdeasError(`Failed to delete idea. ${err}`));
        console.log('Error: ', err);
      });
  };
}


/**
 * Add a new idea async
 */

export const ADD_IDEA_REQUEST = 'ADD_IDEA_REQUEST';
export const ADD_IDEA_SUCCESS = 'ADD_IDEA_SUCCESS';
export const ADD_IDEA_FAILURE = 'ADD_IDEA_FAILURE';


function addIdeaRequest() {
  return {
    type: ADD_IDEA_REQUEST,
  };
}

function addIdeaError(message) {
  return {
    type: ADD_IDEA_FAILURE,
    message,
  };
}

function addIdeaSuccess(idea, anonymousMode) {
  const newIdea = Object.assign({}, idea, { anonymousMode });
  return {
    type: ADD_IDEA_SUCCESS,
    idea: newIdea,
  };
}

export function handleAddIdeaError(message) {
  return dispatch => {
    dispatch(addIdeaError(message));
  };
}

export function addIdea(idea) {
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if (token) {
    config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(idea),
    };
  } else {
    throw 'No token saved!';
  }

  return dispatch => {
    dispatch(addIdeaRequest());
    return fetch(`${API_BASE_URI}/ideas`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(addIdeaError(`Failed to add idea. ${body.error}`));
          return Promise.reject('Failed to add idea');
        }
        console.log('addIdea(...) -> body');
        console.log(body);
        dispatch(addIdeaSuccess(body, idea.anonymousMode));
        return true;
      }).catch(err => {
        dispatch(addIdeaError(`Failed to add idea. ${err}`));
        console.log('Error: ', err);
      });
  };
}


export const TOGGLE_FILTER_FULL_PARTIAL = 'TOGGLE_FILTER_FULL_PARTIAL';


export function toggleFilterFullPartial() {
  return {
    type: TOGGLE_FILTER_FULL_PARTIAL,
  };
}


export const TOGGLE_VOTE = 'TOGGLE_VOTE';


export function toggleVote(ideaId) {
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if (token) {
    config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify({ ideaId }),
    };
  } else {
    throw 'No token saved!';
  }

  return dispatch => {
    dispatch(toggleVoteRequest());
    return fetch(`${API_BASE_URI}/ideas/vote`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(toggleVoteError(`Failed to toggle vote. ${body.error}`));
          return Promise.reject('Failed to toggle vote');
        }
        dispatch(toggleVoteSuccess(body));
        return true;
      }).catch(err => {
        dispatch(toggleVoteError(`Failed to toggle vote. ${err}`));
        console.log('Error: ', err);
      });
  };
}


export const TOGGLE_VOTE_REQUEST = 'TOGGLE_VOTE_REQUEST';
export const TOGGLE_VOTE_SUCCESS = 'TOGGLE_VOTE_SUCCESS';
export const TOGGLE_VOTE_FAILURE = 'TOGGLE_VOTE_FAILURE';

function toggleVoteRequest() {
  return {
    type: TOGGLE_VOTE_REQUEST,
  };
}

function toggleVoteError(message) {
  return {
    type: TOGGLE_VOTE_FAILURE,
    message,
  };
}

function toggleVoteSuccess(idea) {
  const newIdea = Object.assign({}, idea, { anonymousMode: false });
  console.log(newIdea);

  return {
    type: TOGGLE_VOTE_SUCCESS,
    idea: newIdea,
  };
}

