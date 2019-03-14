import {
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
} from '../actions/comments';

export function comments(state = {
  isFetchingComments: false,
  ideasArr: [],
  commentsErrorMessage: undefined,
}, action) {

  console.log("commentsSuccessMethods");
  console.log(action);
  switch (action.type) {
    case ADD_COMMENT_REQUEST:
      return Object.assign({}, state, {
        isFetchingComments: true,
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
