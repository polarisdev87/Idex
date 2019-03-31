import { GET_IDEAS_REQUEST, GET_IDEAS_SUCCESS, GET_IDEAS_FAILURE, TOGGLE_FILTER_FULL_PARTIAL, UPDATE_IDEA_SUCCESS, ADD_IDEA_SUCCESS } from '../actions/ideas';
import { ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, TOGGLE_ANONYMOUS } from '../actions/comments';

export function ideas(state = {
  isFetchingIdeas: false,
  isFetchingComments: false,
  ideasArr: [],
  ideasErrorMessage: undefined,
  commentsErrorMessage: undefined,
  partialFullSwitch: true,
  anonymousMode : false,

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
    case ADD_COMMENT_SUCCESS: {
      let newIdeas = state.ideasArr;
      const index = state.ideasArr.findIndex(x => x.id === action.idea.id);
      if (index !== -1) {
        newIdeas = [
          ...state.ideasArr.slice(0, index),
          action.idea,
          ...state.ideasArr.slice(index + 1),
        ];
      }
      return Object.assign({}, state, {
        isFetchingComments: false,
        ideasArr: newIdeas,
        commentsErrorMessage: undefined,
      });
    }
    case ADD_COMMENT_REQUEST:
      return Object.assign({}, state, {
        isFetchingComments: true,
      });
    case ADD_COMMENT_FAILURE: {
      return Object.assign({}, state, {
        isFetchingComments: false,
        commentsErrorMessage: action.message,
      });
    }
    case TOGGLE_FILTER_FULL_PARTIAL: {
      return Object.assign({}, state, {
        partialFullSwitch: !state.partialFullSwitch,
      });
    }
    case UPDATE_IDEA_SUCCESS: {
      let newIdeas = state.ideasArr;
      const index = state.ideasArr.findIndex(x => x.id === action.idea.id);
      if (index !== -1) {
        newIdeas = [
          ...state.ideasArr.slice(0, index),
          action.idea,
          ...state.ideasArr.slice(index + 1),
        ];
      }
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasArr: newIdeas,
        ideasErrorMessage: undefined,
      });
    }
    case ADD_IDEA_SUCCESS: {
      const newIdeas = [
        action.idea,
        ...state.ideasArr,
      ];
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasArr: newIdeas,
        ideasErrorMessage: undefined,
      });
    }
    case TOGGLE_ANONYMOUS: {
      return Object.assign({}, state, {
        anonymousMode: !state.anonymousMode,
      });
    }
    default:
      return state;
  }
}
