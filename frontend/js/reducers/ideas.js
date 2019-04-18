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
import { UPLOAD_FILE_ON_NEW_COMMENT_SUCCESS, UPLOAD_FILE_ON_NEW_COMMENT_REQUEST, REMOVE_FILES_ON_NEW_COMMENT_REQUEST, UPLOAD_FILE_ON_NEW_COMMENT_CONTENT_SUCCESS, REMOVE_REMOTE_FILE_ON_NEW_COMMENT } from '../actions/files';


function updateFileOnElement(element, htmlFormFile, uploadedFileMeta) {
	console.log("updateFileOnElement");
	console.log(element);
	
	console.log("htmlFormFile");
	console.log(htmlFormFile);
    if (element.files == null) {
    	element.files = [];
      }
      const fileIndex = element.files.findIndex(x => x.id === htmlFormFile.id);
      if (fileIndex !== -1) {
      	console.log('initial file');
      	console.log(element.files[fileIndex]);
        const newFile = Object.assign({}, element.files[fileIndex], {
          cancelledAt: uploadedFileMeta.cancelledAt,
          persistenceId: uploadedFileMeta.persistenceId,
          uploadedAt: uploadedFileMeta.uploadedAt,
        });
    	console.log('newFile');
    	console.log(newFile);
    	element.files = [
          ...element.files.slice(0, fileIndex),
          newFile,
          ...element.files.slice(fileIndex + 1),
        ];
      } else {
      	console.log('htmlFormFile');
      	console.log(htmlFormFile);
        const newFile = Object.assign({}, htmlFormFile, {
          cancelledAt: uploadedFileMeta.cancelledAt,
          persistenceId: uploadedFileMeta.persistenceId,
          uploadedAt: uploadedFileMeta.uploadedAt,
        });
      	console.log('newFile');
      	console.log(newFile);
      	element.files = [
          ...element.files,
          newFile,
        ];
      }
      console.log(element);
      return element;
}


function completeFileOnIdea(idea, htmlFormFile, uploadedFileMeta) {
	
    if (idea.files == null) {
        idea.files = [];
      }
      const fileIndex = idea.files.findIndex(x => x.persistenceId === uploadedFileMeta.persistenceId);
      if (fileIndex !== -1) {
          console.log("file =>");
          console.log(idea.files[fileIndex]);
        const newFile = Object.assign({}, idea.files[fileIndex], {
          cancelledAt:  uploadedFileMeta.cancelledAt,
          persistenceId: uploadedFileMeta.persistenceId,
          uploadedAt: uploadedFileMeta.uploadedAt,
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
      	
      	if (htmlFormFile) {
            const newFile = Object.assign({}, htmlFormFile, {
                cancelledAt: uploadedFileMeta.cancelledAt,
                persistenceId: uploadedFileMeta.persistenceId,
                uploadedAt: uploadedFileMeta.uploadedAt,
              });
              console.log("newFile");
              console.log(newFile);
              idea.files = [
                ...idea.files,
                newFile,
              ];
      	}
      }

      return idea;
}


function addFileOnElement(element,file) {
	console.log("addFileOnElement");
	console.log(element);
    if (element.files == null) {
    	element.files = [file];
      } else {
    	  element.files = [
          ...element.files,
          file,
        ];
    }
	console.log(element);
    return element;
}


function removeFileListOnIdea(newIdea, files) {
    if (newIdea.files != null) {
        for (const fileI in files) {
          const fileIndex = newIdea.files.findIndex(x => x.id == files[fileI].id);
          if (fileIndex !== -1) {
            newIdea.files = [
              ...newIdea.files.slice(0, fileIndex),
              ...newIdea.files.slice(fileIndex + 1),
            ];
          }
        }
      }
	return newIdea;
}

export function ideas(state = {
  isFetchingIdeas: false,
  isFetchingComments: false,
  ideasArr: [],
  ideasErrorMessage: undefined,
  commentsErrorMessage: undefined,
  partialFullSwitch: true,
  anonymousMode: false,
  ideaToAdd: {
	  files: [],
  },
  commentsToAdd: [],
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
      if (action.ideaId>=0) {  // editing
          let newIdeas = state.ideasArr;
          const index = state.ideasArr.findIndex(x => x.id === action.ideaId);
          if (index !== -1) {
            let newIdea = state.ideasArr[index];
            newIdea = addFileOnElement(newIdea, action.file);
            newIdeas = [
              ...state.ideasArr.slice(0, index),
              newIdea,
              ...state.ideasArr.slice(index + 1),
            ];
          }
          return Object.assign({}, state, {
            ideasArr: newIdeas,
          });
    	  
      } else {  // adding idea - ideaId == -1
          let newIdea = state.ideaToAdd;
          newIdea = addFileOnElement(newIdea, action.file);
          return Object.assign({}, state, {
            ideaToAdd: newIdea,
          });
    	  
      }
    }
    // the api endpoint returns the file uploaded information (metadata - started to upload the file ) 
    case UPLOAD_FILE_SUCCESS: {
      console.log('reducer:UPLOAD_FILE_SUCCESS');
      console.log(state);
      console.log(action);
      if (action.ideaId>=0) { // edit mode
    	  console.log("editMode");
          const index = state.ideasArr.findIndex(x => x.id === action.ideaId);
          if (index !== -1) {
            let idea = state.ideasArr[index];
            console.log('idea');
            console.log(idea);

            idea = updateFileOnElement(idea, action.htmlFormFile, action.uploadedFileMeta) 
            
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
    	  
      } else {  // add mode  - action.ideaId == -1
    	  console.log("addMode");
    	  let idea = state.ideaToAdd;
          idea = updateFileOnElement(idea, action.htmlFormFile, action.uploadedFileMeta) 
          
          return Object.assign({}, state, {
            ideaToAdd: idea,
          });
      }
      return state;
    }

    
    case UPLOAD_FILE_ON_NEW_COMMENT_REQUEST: {
        console.log('UPLOAD_FILE_ON_NEW_COMMENT_REQUEST');
        console.log(action.file);
        console.log(state);
        console.log(action);
        
        const index = state.commentsToAdd.findIndex(x => x.ideaId === action.ideaId);
        let comment = {};
        let newCommentsToAdd = state.commentsToAdd;
        if (index == -1) {
          comment = {ideaId: action.ideaId, files: []}
          comment = addFileOnElement(comment, action.file) 
          newCommentsToAdd = [
              ...state.commentsToAdd,
              comment,
           ];
          return Object.assign({}, state, {
              commentsToAdd: newCommentsToAdd,
           });
        } else  {
          comment = state.commentsToAdd[index];

          comment = addFileOnElement(comment, action.file) 
              
          newCommentsToAdd = [
             ...state.commentsToAdd.slice(0, index),
             comment,
             ...state.commentsToAdd.slice(index + 1),
          ];
        }  
        return Object.assign({}, state, {
            commentsToAdd: newCommentsToAdd,
         });
      }
    // the api endpoint returns the file uploaded information (metadata - started to upload the file ) 
    case UPLOAD_FILE_ON_NEW_COMMENT_SUCCESS: {
      console.log('reducer:UPLOAD_FILE_ON_NEW_COMMENT_SUCCESS');
      console.log(state);
      console.log(action);

      
      const index = state.commentsToAdd.findIndex(x => x.ideaId === action.ideaId);
      console.log("index");
      console.log(index);
      let comment = {};
      if (index == -1) {
    	comment = {ideaId: action.ideaId, files: [action.htmlFormFile]}
        comment = updateFileOnElement(comment, action.htmlFormFile, action.uploadedFileMeta) 
        const newCommentsToAdd = [
            ...state.commentsToAdd,
            comment,
         ];
        return Object.assign({}, state, {
            commentsToAdd: newCommentsToAdd,
         });
      } else  {
        comment = state.commentsToAdd[index];
        console.log("comment");
        console.log(comment);
        comment = updateFileOnElement(comment, action.htmlFormFile, action.uploadedFileMeta) 
        console.log("comment");
        console.log(comment);
            
        const newCommentsToAdd = [
           ...state.commentsToAdd.slice(0, index),
           comment,
           ...state.commentsToAdd.slice(index + 1),
        ];
        console.log("newCommentsToAdd");
        console.log(newCommentsToAdd);
        return Object.assign({}, state, {
           commentsToAdd: newCommentsToAdd,
        });
      }  
    }
    
    
    
    // finished to upload file (uploaded completely)
    case UPLOAD_FILE_CONTENT_SUCCESS: {
      console.log('reducer:UPLOAD_FILE_CONTENT_SUCCESS');
      if (action.ideaId >= 0 ) { // edit idea
          const index = state.ideasArr.findIndex(x => x.id === action.ideaId);
          if (index !== -1) {
            let idea = state.ideasArr[index];
            console.log('idea');
            console.log(idea);

            idea = completeFileOnIdea(idea, action.htmlFormFile, action.uploadedFileMeta);
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
    	  
      } else {  // add idea - ideaId = -1
    	  let idea = state.ideaToAdd;
          idea = completeFileOnIdea(idea, action.htmlFormFile, action.uploadedFileMeta);
          return Object.assign({}, state, {
              ideaToAdd: idea,
            });
    	  
      }
      
      
    }
    case REMOVE_FILES_REQUEST: {
    	if (action.ideaId >=0 ) {  // editing
    	      let newIdeas = state.ideasArr;
    	      const index = state.ideasArr.findIndex(x => x.id === action.fileList.ideaId);
    	      if (index !== -1) {
    	        let newIdea = newIdeas[index];

    	        
	        	newIdea = removeFileListOnIdea(newIdea, action.fileList.files);
    	        
    	        
    	        
    	        newIdeas = [
    	        	...state.ideasArr.slice(0, index),
    	        	newIdea,
    	        	...state.ideasArr.slice(index + 1),
    	        	];
    	        
    	        return Object.assign({}, state, {
    	          ideasArr: newIdeas,
    	        });
    	      }
    		
    	} else { // remove files when adding idea
    		let newIdea = state.ideaToAdd;
        	newIdea = removeFileListOnIdea(newIdea, action.fileList.files);
	        return Object.assign({}, state, {
  	          ideaToAdd: newIdea,
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
