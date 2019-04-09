import {
  GET_IDEAS_REQUEST,
  GET_IDEAS_SUCCESS,
  GET_IDEAS_FAILURE,
  TOGGLE_FILTER_FULL_PARTIAL,
  UPDATE_IDEA_SUCCESS,
  ADD_IDEA_SUCCESS,
  TOGGLE_VOTE_SUCCESS
} from '../actions/ideas';
import { ADD_COMMENT_REQUEST, ADD_COMMENT_SUCCESS, ADD_COMMENT_FAILURE, TOGGLE_ANONYMOUS } from '../actions/comments';
import { CHANGE_FILES, UPLOAD_FILE_SUCCESS, UPLOAD_FILE_REQUEST, REMOVE_FILES_REQUEST } from '../actions/files';

export function ideas(state = {
  isFetchingIdeas: false,
  isFetchingComments: false,
  ideasArr: [],
  ideasErrorMessage: undefined,
  commentsErrorMessage: undefined,
  partialFullSwitch: true,
  anonymousMode: false,
  files: [],

}, action) {
  switch (action.type) {
    case GET_IDEAS_REQUEST:
      return Object.assign({}, state, {
        isFetchingIdeas: true,
      });
    case GET_IDEAS_SUCCESS: {
      console.log('reducer action.ideas');
      console.log(action.ideas);
      return Object.assign({}, state, {
        isFetchingIdeas: false,
        ideasArr: action.ideas,
        ideasErrorMessage: undefined,
      });
    }
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
    case TOGGLE_VOTE_SUCCESS: {
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
      let newIdeas = state.ideasArr;
      const index = state.ideasArr.findIndex(x => x.id === action.ideaId);
      if (index !== -1) {
        const oldAnonymousMode = state.ideasArr[index].anonymousMode;
        const toggledIdea = Object.assign({}, state.ideasArr[index], { anonymousMode: !oldAnonymousMode });
        newIdeas = [
          ...state.ideasArr.slice(0, index),
          toggledIdea,
          ...state.ideasArr.slice(index + 1),
        ];
      }
      return Object.assign({}, state, {
        ideasArr: newIdeas,
      });
    }
    case CHANGE_FILES: {
      return Object.assign({}, state, {
        files: action.files,
      });
    }
    case UPLOAD_FILE_REQUEST: {
      let newIdeas = state.ideasArr;
      const index = state.ideasArr.findIndex(x => x.id === action.ideaId);
      if (index !== -1) {
        let newIdea = newIdeas[index];
        if (newIdea.files == null) {
          newIdea.files = [action.file];
        } else {
          newIdea.files = [
            ...newIdea.files,
            action.file,
          ];
        }
        newIdeas = [
          ...state.ideasArr.slice(0, index),
          newIdea,
          ...state.ideasArr.slice(index + 1),
        ];
      }
      return Object.assign({}, state, {
        ideasArr: newIdeas,
      });
    }
    // the api endpoint return the file uploaded information
    case UPLOAD_FILE_SUCCESS: {
      console.log('reducer:UPLOAD_FILE_SUCCESS');
      const index = state.ideasArr.findIndex(x => x.id === action.ideaId);
      if (index !== -1) {
        const idea = state.ideasArr[index];
        console.log('idea');
        console.log(idea);
        if (idea.files == null) {
          idea.files = [];
        }
        const fileIndex = idea.files.findIndex(x => x.id === action.file.id);
        if (fileIndex !== -1) {
          const newFile = Object.assign({}, idea.files[fileIndex], {
            cancelledAt: action.uploadedFile.cancelledAt,
            persistenceId: action.uploadedFile.persistenceId,
            uploadedAt: action.uploadedFile.uploadedAt,
          });
          idea.files = [
            ...idea.files.slice(0, fileIndex),
            newFile,
            ...idea.files.slice(fileIndex + 1),
          ];
        } else {
          const newFile = Object.assign({}, action.file, {
            cancelledAt: action.uploadedFile.cancelledAt,
            persistenceId: action.uploadedFile.persistenceId,
            uploadedAt: action.uploadedFile.uploadedAt,
          });
          idea.files = [
            ...idea.files,
            newFile,
          ];
        }
        const newIdeas = [
          ...state.ideasArr.slice(0, index),
          idea,
          ...state.ideasArr.slice(index + 1),
        ];
        console.log("newIdeas");
        console.log(newIdeas);
        return Object.assign({}, state, {
          ideasArr: newIdeas,
        });
      }
      return state;
    }
    case REMOVE_FILES_REQUEST: {
      let newIdeas = state.ideasArr;
      const index = state.ideasArr.findIndex(x => x.id === action.fileList.ideaId);
      if (index !== -1) {
        let newIdea = newIdeas[index];
        if (newIdea.files != null) {
          for (const file in action.fileList.files) {
            const fileIndex = newIdea.files.findIndex(x => x.id === file.id);
            if (fileIndex !== -1) {
                newIdea.files = [
                ...idea.files.slice(0, fileIndex),
                ...idea.files.slice(fileIndex + 1),
              ];
            }
          }
          newIdeas = [
            ...state.ideasArr.slice(0, index),
            newIdea,
            ...state.ideasArr.slice(index + 1),
          ];
        }
        return Object.assign({}, state, {
          ideasArr: newIdeas,
        });
      }
    }
    default:
      return state;
  }
}
