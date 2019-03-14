import {
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
} from '../actions/comments';

export function comments(state = {
  isFetchingComments: false,
  ideasArr: undefined,
  commentsErrorMessage: undefined,
}, action) {
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return Object.assign({}, state, {
        isFetchingComments: true,
      });
    case ADD_COMMENT_SUCCESS:
      // calculate index in case user applied another filter before finishing request
      let newIdeas=state.ideasArr;
      let index = state.ideasArr.findIndex(x => x.id == action.idea.id);
      if (index!=-1) {
        newIdeas = [
            ...state.ideasArr.slice(0, index),
            action.idea,
            ...state.ideasArr.slice(index)
          ]; 
      }

      return Object.assign({}, state, {
        isFetchingComments: false,
        ideasArr: newIdeas,
        commentsErrorMessage: undefined,
      });
    case ADD_COMMENT_FAILURE:
      return Object.assign({}, state, {
        isFetchingComments: false,
        commentsErrorMessage: action.message,
      });
    default:
      return state;
  }
}
