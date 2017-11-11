import {
  GET_IDEAS_REQUEST, GET_IDEAS_SUCCESS, GET_IDEAS_FAILURE
} from '../actions/ideas';

export function ideas(state = {
  isFetchingIdeas: false,
  ideasArr: undefined,
  ideasErrorMessage: undefined,
}, action) {
  switch (action.type) {
    case GET_IDEAS_REQUEST:
      return Object.assign({}, state, {
        isFetchingIdeas: true,
      });
    case GET_IDEAS_SUCCESS:
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasArr: action.ideas,
        ideasErrorMessage: undefined,
      });
    case GET_IDEAS_FAILURE:
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasErrorMessage: action.message,
      });
    default:
      return state;
  }
}
