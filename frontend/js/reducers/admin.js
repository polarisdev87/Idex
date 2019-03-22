import {
  GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_REQUEST,
  GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_SUCCESS,
  GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_FAILURE,
  TOGGLE_FILTER_FULL_PARTIAL_ADMIN 
} from '../actions/admin';


export function admin(state = {
  isFetchingIdeas: false,
  isFetchingComments: false,
  ideasSummary: {
      dimensionNames: ["ttm","profit","votes","tag"],
      items:[],
  },
  ideasErrorMessage: undefined,
  partialFullSwitch: true,
  submittedAtMsMin: null,
  submittedAtMsMax: null,
  tags: [],
  votesMin: 0,
  votesMax: 999999,
  profitMin: 0,
  profitMax: 999999,
  implementationTimeMin: 0,
  implementationTimeMax: 999999,
}, action) {

    console.log("admin reducer");
    console.log(action.type);
  switch (action.type) {
    case GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_REQUEST:
      return Object.assign({}, state, {
        isFetchingIdeas: true,
      });
    case GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_SUCCESS:
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasSummary: action.ideasSummary,
        ideasErrorMessage: undefined,
      });
    case GET_SUMMARY_IDEAS_TTM_PROFIT_VOTES_FAILURE:
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasErrorMessage: action.message,
        ideasSummary: {
            dimensionNames: ["ttm","profit","votes","tag"],
            items:[],
        },
      });
    case TOGGLE_FILTER_FULL_PARTIAL_ADMIN: {
      return Object.assign({}, state, {
        partialFullSwitch: !state.partialFullSwitch,
      });
    }
    default:
      return state;
  }
}

