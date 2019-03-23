import { API_BASE_URI, ID_TOKEN_KEY } from '../const';

const queryString = require('query-string');


export const GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_REQUEST = 'GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_REQUEST';
export const GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_SUCCESS = 'GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_SUCCESS';
export const GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_FAILURE = 'GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_FAILURE';

function getSummaryIdeasTTMProfitVotesRequest() {
  return {
    type: GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_REQUEST,
  };
}

function getSummaryIdeasTTMProfitVotesError(message) {
  return {
    type: GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_FAILURE,
    message,
  };
}

function getSummaryIdeasTTMProfitVotesSuccess(ideasSummary) {
  return {
    type: GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_SUCCESS,
    ideasSummary,
  };
}


export function fetchIdeasForBubbleGraph(
  submittedAtMsMin, submittedAtMsMax,
  votesMin, votesMax,
  profitMin, profitMax,
  implementationTimeMsMin, implementationTimeMsMax,
  tags, partialFullSwitch,
) {
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;

  let config = {
    method: 'GET',
  };

  const query = {
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

  console.log('actions/admin/fetchIdeasForBubbleGraph');
  return dispatch => {
    console.log('actions/admin.js executing dispatch of request');
    dispatch(getSummaryIdeasTTMProfitVotesRequest());

    const url = `${API_BASE_URI}/ideas/summary-ttm-profit-vote?${queryString.stringify(query)}`;
    console.log('actions/admin.js -> ');
    console.log(url);
    return fetch(url, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(getSummaryIdeasTTMProfitVotesError(`Failed to get ideas. ${body.error}`));
          return Promise.reject(body.error);
        }
        console.log('admin.js.fetchIdeasForBubbleGraph(...) is ok');
        console.log(query);
        console.log(queryString);
        console.log(body);

        dispatch(getSummaryIdeasTTMProfitVotesSuccess(body));
        return true;
      }).catch(err => {
        dispatch(getSummaryIdeasTTMProfitVotesError(`Failed to get ideas. ${err}`));
        console.log('Error: ', err);
      });
  };
}


export const TOGGLE_FILTER_FULL_PARTIAL_ADMIN = 'TOGGLE_FILTER_FULL_PARTIAL_ADMIN';


export function toggleFilterFullPartialAdmin() {
  return {
    type: TOGGLE_FILTER_FULL_PARTIAL_ADMIN,
  };
}

export const SET_START_DATE_ADMIN = 'SET_START_DATE_ADMIN';

export function setStartDate(date) {
  return {
    type: SET_START_DATE_ADMIN,
    date,
  };
}

export const SET_END_DATE_ADMIN = 'SET_END_DATE_ADMIN';

export function setEndDate(date) {
  return {
    type: SET_END_DATE_ADMIN,
    date,
  };
}

