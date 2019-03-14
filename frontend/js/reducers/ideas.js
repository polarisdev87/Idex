import {
  GET_IDEAS_REQUEST, GET_IDEAS_SUCCESS, GET_IDEAS_FAILURE
} from '../actions/ideas';

import {
  ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE
} from '../actions/comments';


export function ideas(state = {
  isFetchingIdeas: false,
  ideasArr: [],
  ideasErrorMessage: undefined,
}, action) {
  switch (action.type) {
    case GET_IDEAS_REQUEST:
      return Object.assign({}, state, {
        isFetchingIdeas: true,
      });
    case GET_IDEAS_SUCCESS:
      console.log("ideasReducer");
      console.log(action.ideas);
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
    case ADD_COMMENT_SUCCESS:
      // calculate index in case user applied another filter before finishing request
      console.log("ADD_COMMENT_SUCCESS case");
      console.log(state.ideasArr);
      let newIdeas=state.ideasArr;
      let index = state.ideasArr.findIndex(x => x.id == action.idea.id);
      console.log(index);
      if (index!=-1) {
        console.log("commentsReducer");
        console.log(state.ideasArr);
        console.log(action.idea);
        newIdeas = [
            ...state.ideasArr.slice(0, index),
            action.idea,
            ...state.ideasArr.slice(index+1)
          ];
        console.log(newIdeas);

      }

      return Object.assign({}, state, {
        isFetchingComments: false,
        ideasArr: newIdeas,
        commentsErrorMessage: undefined,
      });
    default:
      return state;
  }
}
