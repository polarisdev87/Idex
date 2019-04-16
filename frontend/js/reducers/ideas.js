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
import { UPLOAD_FILE_SUCCESS, UPLOAD_FILE_REQUEST, REMOVE_FILES_REQUEST, UPLOAD_FILE_CONTENT_SUCCESS, REMOVE_REMOTE_FILE } from '../actions/files';

export function ideas(state = {
  isFetchingIdeas: false,
  isFetchingComments: false,
  ideasArr: [],
  ideasErrorMessage: undefined,
  commentsErrorMessage: undefined,
  partialFullSwitch: true,
  anonymousMode: false,

}, action) {
	 console.log("IDEAS REDUCER...");
	 console.log(action);
	 console.log(state);
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
      console.log("UPDATE_IDEA_SUCCESS");
      let newIdeas = state.ideasArr;
      const index = state.ideasArr.findIndex(x => x.id === action.idea.id);
      if (index !== -1) {
        console.log(state.ideasArr[index]);
        console.log("action.idea");
        console.log(action.idea);
        const newIdea = Object.assign({},state.ideasArr[index],action.idea);
        console.log("newIdea");
        console.log(newIdea);
        newIdeas = [
          ...state.ideasArr.slice(0, index),
          newIdea,
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
    case UPLOAD_FILE_REQUEST: {
      console.log('UPLOAD_FILE_REQUEST');
      console.log(action.file);
      let newIdeas = state.ideasArr;
      const index = state.ideasArr.findIndex(x => x.id === action.ideaId);
      if (index !== -1) {
        const newIdea = state.ideasArr[index];
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
    // the api endpoint return the file uploaded information (metadata - started to upload the file ) 
    case UPLOAD_FILE_SUCCESS: {
      console.log('reducer:UPLOAD_FILE_SUCCESS');
      console.log(state);
      console.log(action);
      const index = state.ideasArr.findIndex(x => x.id === action.ideaId);
      if (index !== -1) {
        const idea = state.ideasArr[index];
        console.log('idea');
        console.log(idea);
        if (idea.files == null) {
          idea.files = [];
        }
        const fileIndex = idea.files.findIndex(x => x.id === action.htmlFormFile.id);
        if (fileIndex !== -1) {
        	console.log('initial file');
        	console.log(idea.files[fileIndex]);
          const newFile = Object.assign({}, idea.files[fileIndex], {
            cancelledAt: action.uploadedFileMeta.cancelledAt,
            persistenceId: action.uploadedFileMeta.persistenceId,
            uploadedAt: action.uploadedFileMeta.uploadedAt,
          });
      	console.log('newFile');
    	console.log(newFile);
          idea.files = [
            ...idea.files.slice(0, fileIndex),
            newFile,
            ...idea.files.slice(fileIndex + 1),
          ];
        } else {
        	console.log('htmlFormFile');
        	console.log(htmlFormFile);
          const newFile = Object.assign({}, action.htmlFormfile, {
            cancelledAt: action.uploadedFileMeta.cancelledAt,
            persistenceId: action.uploadedFileMeta.persistenceId,
            uploadedAt: action.uploadedFileMeta.uploadedAt,
          });
        	console.log('newFile');
        	console.log(newFile);
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
        console.log('newIdeas');
        console.log(newIdeas);
        return Object.assign({}, state, {
          ideasArr: newIdeas,
        });
      }
      return state;
    }
    // finished to upload file (uploaded completely)
    case UPLOAD_FILE_CONTENT_SUCCESS: {
      console.log('reducer:UPLOAD_FILE_CONTENT_SUCCESS');
      const index = state.ideasArr.findIndex(x => x.id === action.ideaId);
      if (index !== -1) {
        const idea = state.ideasArr[index];
        console.log('idea');
        console.log(idea);
        if (idea.files == null) {
          idea.files = [];
        }
        const fileIndex = idea.files.findIndex(x => x.persistenceId === action.uploadedFileMeta.persistenceId);
        if (fileIndex !== -1) {
            console.log("file =>");
            console.log(idea.files[fileIndex]);
          const newFile = Object.assign({}, idea.files[fileIndex], {
            cancelledAt: action.uploadedFileMeta.cancelledAt,
            persistenceId: action.uploadedFileMeta.persistenceId,
            uploadedAt: action.uploadedFileMeta.uploadedAt,
          });
          console.log("newFile");
          console.log(newFile);
          idea.files = [
            ...idea.files.slice(0, fileIndex),
            newFile,
            ...idea.files.slice(fileIndex + 1),
          ];
        } else {
        	console.log('htmlFormFile');
        	console.log(htmlFormFile);
          const newFile = Object.assign({}, action.htmlFormfile, {
            cancelledAt: action.uploadedFileMeta.cancelledAt,
            persistenceId: action.uploadedFileMeta.persistenceId,
            uploadedAt: action.uploadedFileMeta.uploadedAt,
          });
          console.log("newFile");
          console.log(newFile);
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
        console.log('newIdeas');
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
        const newIdea = newIdeas[index];
        if (newIdea.files != null) {
          for (const fileI in action.fileList.files) {
            const fileIndex = newIdea.files.findIndex(x => x.id == action.fileList.files[fileI].id);
            if (fileIndex !== -1) {
              newIdea.files = [
                ...newIdea.files.slice(0, fileIndex),
                ...newIdea.files.slice(fileIndex + 1),
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
    case REMOVE_REMOTE_FILE: {
        let newIdeas = state.ideasArr;
        const index = state.ideasArr.findIndex(x => x.id === action.ideaId);
        if (index !== -1) {
          const newIdea = newIdeas[index];
          if (newIdea.files != null) {
            const fileIndex = newIdea.files.findIndex(x => x.id == action.file.id);
            if (fileIndex !== -1) {
              newIdea.files = [
                ...newIdea.files.slice(0, fileIndex),
                ...newIdea.files.slice(fileIndex + 1),
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
      }
  default:
    return state;
}
}
