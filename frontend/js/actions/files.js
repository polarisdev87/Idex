import { API_BASE_URI, ID_TOKEN_KEY } from '../const';




export function areAllAttachmentsUploaded(idea) {
    console.log("areAllAttachmentsUploaded");
    console.log(idea);
    let result = true;
    if (idea.files != null) {
      const pendingUpload = idea.files.filter(file => file.persistenceId != null && file.cancelledAt == null && file.uploadedAt == null);
      console.log("pendingUpload");
      console.log(pendingUpload);
      result = pendingUpload.length == 0;
    }
    console.log(result);
    return result;
  }




/**
 * Identify all files that aren't in oldFiles
 */
function getFilesToAdd(oldFiles, files) {
  const gotOldFiles = oldFiles == null ? [] : oldFiles;
  const newArray = files.filter((el) => {
	  const oldEl = gotOldFiles.filter((el1) => {
		  return el1.id == el.id} )
	  return oldEl.length==0;
  });
  return newArray;
}

/**
 * Identify all oldfiles that aren't in files and was in oldFiles
 */
function getFilesToRemove(oldFiles, files) {
	return getFilesToAdd(files, oldFiles);
}


/**
 * It is called after the user adds or removes file attachments on an idea
 * @ type is edit or add
 * The type impacts on what element is updated after success (ideasArr or ideaToAdd)
 * 
 */
export function changeFiles(dispatch, ideaId, oldFiles, files) {
  // discover difference with previous file list
  // upload all new files
  // remove all old files
  // upload file

  console.log('changeFies(...)');
  console.log(oldFiles);
  const filesToAdd = getFilesToAdd(oldFiles, files);
  const filesToRemove = getFilesToRemove(oldFiles, files);

  console.log('filesToAdd');
  console.log(filesToAdd);
  console.log('filesToRemove');
  console.log(filesToRemove);

  filesToAdd.forEach((file) => dispatch(uploadFile(ideaId, file)));
  if (filesToRemove.length > 0) {
    dispatch(removeFiles(ideaId, filesToRemove));
  }
}

export function changeFilesOnNewComment(dispatch, ideaId, oldFiles, files) {
	  // discover difference with previous file list
	  // upload all new files
	  // remove all old files
	  // upload file

	  console.log('changeFilesOnNewComment(...)');
	  console.log(oldFiles);
	  const filesToAdd = getFilesToAdd(oldFiles, files);
	  const filesToRemove = getFilesToRemove(oldFiles, files);

	  console.log('filesToAdd');
	  console.log(filesToAdd);
	  console.log('filesToRemove');
	  console.log(filesToRemove);

	  filesToAdd.forEach((file) => dispatch(uploadFileOnNewComment(ideaId, file)));
	  if (filesToRemove.length > 0) {
	    dispatch(removeFilesOnNewComment(ideaId, filesToRemove));
	  }
	}



export const REMOVE_REMOTE_FILE = 'REMOVE_REMOTE_FILE';


/**
 * It is called to remove an idea file attachment got from the backend (not a local drag and dropped file)
 */
export function removeRemoteFile(ideaId, file) {

  console.log('removeRemoteFile(...)');
  return {
	    type: REMOVE_REMOTE_FILE,
	    ideaId,
	    file,
	  };  
}


export const REMOVE_REMOTE_FILE_ON_NEW_COMMENT = 'REMOVE_REMOTE_FILE_ON_NEW_COMMENT';


/**
 * It is called to remove an idea file attachment got from the backend (not a local drag and dropped file)
 */
export function removeRemoteFileOnNewComment(ideaId, file) {

  console.log('removeRemoteFile(...)');
  return {
	    type: REMOVE_REMOTE_FILE_ON_NEW_COMMENT,
	    ideaId,
	    file,
	  };  
}


/**
 * 
 * @param {*} ideaId 
 * @param {*} file
 *  
 */
export function uploadFile(ideaId, htmlFormFile) {
  console.log('uploadFile(ideaId,htmlFormFile)');
  console.log(htmlFormFile);
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};
  let attachmentDto = {};

  if (token) {
    attachmentDto = {
      ...htmlFormFile,
      ideaId,
      viewId: htmlFormFile.id,
      originalName: htmlFormFile.name,
      size: htmlFormFile.size,
      id: htmlFormFile.id,
      name: htmlFormFile.name,
      sizeReadable: htmlFormFile.sizeReadable, 
    };
    config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      method: 'POST',
      body: JSON.stringify(attachmentDto),
    };
  } else {
    throw 'No token saved!';
  }
  return dispatch => {
    dispatch(uploadFileRequest(ideaId, attachmentDto));
    console.log('uploadFileRequest(...)');
    console.log(ideaId);
    console.log(htmlFormFile);
    console.log(config);
    return fetch(`${API_BASE_URI}/ideas/attach`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          console.log('error response');
          console.log(response);
          dispatch(updateFileError(`Failed to upload file. ${body.error}`));
          return Promise.reject('Failed to upload file');
        }
        console.log('uploadFile... body');
        console.log(body);
        console.log(htmlFormFile);
        dispatch(uploadFileSuccess(dispatch, body, ideaId, htmlFormFile));
        return true;
      }).catch(err => {
        dispatch(uploadFileError(`Failed to upload file. ${err}`));
        console.log('Error: ', err);
      });
  };
}



export function uploadFileOnNewComment(ideaId, htmlFormFile) {
	  console.log('uploadFileOnNewComment(ideaId,htmlFormFile)');
	  console.log(htmlFormFile);
	  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
	  let config = {};
	  let attachmentDto = {};

	  if (token) {
	    attachmentDto = {
	      ...htmlFormFile,
	      ideaId,
	      viewId: htmlFormFile.id,
	      originalName: htmlFormFile.name,
	      size: htmlFormFile.size,
	      id: htmlFormFile.id,
	      name: htmlFormFile.name,
	      sizeReadable: htmlFormFile.sizeReadable, 
	    };
	    config = {
	      headers: {
	        Authorization: `${token}`,
	        'Content-Type': 'application/json',
	      },
	      method: 'POST',
	      body: JSON.stringify(attachmentDto),
	    };
	  } else {
	    throw 'No token saved!';
	  }
	  return dispatch => {
	    dispatch(uploadFileOnNewCommentRequest(ideaId, attachmentDto));
	    console.log('uploadFileOnNewCommentRequest(...)');
	    console.log(ideaId);
	    console.log(htmlFormFile);
	    console.log(config);
	    return fetch(`${API_BASE_URI}/ideas/comment/attach`, config)
	      .then(response => response.json().then(body => ({ body, response })))
	      .then(({ body, response }) => {
	        if (!response.ok) {
	          console.log('error response');
	          console.log(response);
	          dispatch(updateFileOnNewCommentError(`Failed to upload file. ${body.error}`));
	          return Promise.reject('Failed to upload file');
	        }
	        console.log('uploadFile... body');
	        console.log(body);
	        console.log(htmlFormFile);
	        dispatch(uploadFileOnNewCommentSuccess(dispatch, body, ideaId, htmlFormFile));
	        return true;
	      }).catch(err => {
	        dispatch(uploadFileOnNewCommentError(`Failed to upload file. ${err}`));
	        console.log('Error: ', err);
	      });
	  };
	}



export const UPLOAD_FILE_CONTENT_REQUEST = 'UPLOAD_FILE_CONTENT_REQUEST';
export const UPLOAD_FILE_CONTENT_SUCCESS = 'UPLOAD_FILE_CONTENT_SUCCESS';
export const UPLOAD_FILE_CONTENT_FAILURE = 'UPLOAD_FILE_CONTENT_FAILURE';


function uploadFileContentRequest(ideaId, htmlFormFile) {
  return {
    type: UPLOAD_FILE_CONTENT_REQUEST,
    ideaId,
    htmlFormFile,
  };
}


function uploadFileContentSuccess(uploadedFileMeta, ideaId, oldFile) {
  console.log("uploadFileContentSuccess(...)");  
  console.log("uploadedFileMeta");
  console.log(uploadedFileMeta);
  const newFile = Object.assign({},oldFile,uploadedFileMeta);
  console.log("newFile");
  console.log(newFile);
  return {
    type: UPLOAD_FILE_CONTENT_SUCCESS,
    ideaId,
    uploadedFileMeta:newFile,
  };
}


export function uploadFileContent(ideaId, persistenceId, htmlFormFile) {
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if (token) {
    const formData = new FormData();
    formData.append('file', new Blob([htmlFormFile], { type: htmlFormFile.type }), htmlFormFile.name || 'file');
    formData.append('ideaId', ideaId);
    formData.append('viewId', htmlFormFile.id);
    formData.append('persistenceId', persistenceId);
    formData.append('name', htmlFormFile.name);
    config = {
      headers: {
        Authorization: `${token}`,
      },
      method: 'POST',
      body: formData,
    };
  } else {
    throw 'No token saved!';
  }
  return dispatch => {
    dispatch(uploadFileContentRequest(ideaId, htmlFormFile));
    console.log('uploadFileContentRequest(...)');
    console.log(ideaId);
    console.log(htmlFormFile);
    return fetch(`${API_BASE_URI}/ideas/attach-content`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(uploadFileContentError(`Failed to upload file. ${body.error}`));
          return Promise.reject('Failed to upload file');
        }
        console.log('uploadFileContent... body');
        console.log(body);
        dispatch(uploadFileContentSuccess(body, ideaId, htmlFormFile));
        return true;
      }).catch(err => {
        dispatch(uploadFileContentError(`Failed to upload file. ${err}`));
        console.log('Error: ', err);
      });
  };
}



function uploadFileContentError(message) {
	  return {
	    type: UPLOAD_FILE_CONTENT_FAILURE,
	    message,
	  };
	}





export const UPLOAD_FILE_ON_NEW_COMMENT_CONTENT_REQUEST = 'UPLOAD_FILE_ON_NEW_COMMENT_CONTENT_REQUEST';
export const UPLOAD_FILE_ON_NEW_COMMENT_CONTENT_SUCCESS = 'UPLOAD_FILE_ON_NEW_COMMENT_CONTENT_SUCCESS';
export const UPLOAD_FILE_ON_NEW_COMMENT_CONTENT_FAILURE = 'UPLOAD_FILE_ON_NEW_COMMENT_CONTENT_FAILURE';


function uploadFileOnNewCommentContentRequest(ideaId, htmlFormFile) {
  return {
    type: UPLOAD_FILE_ON_NEW_COMMENT_CONTENT_REQUEST,
    ideaId,
    htmlFormFile,
  };
}


function uploadFileOnNewCommentContentSuccess(uploadedFileMeta, ideaId, oldFile) {
  console.log("uploadFileContentSuccess(...)");  
  console.log("uploadedFileMeta");
  console.log(uploadedFileMeta);
  const newFile = Object.assign({},oldFile,uploadedFileMeta);
  console.log("newFile");
  console.log(newFile);
  return {
    type: UPLOAD_FILE_ON_NEW_COMMENT_CONTENT_SUCCESS,
    ideaId,
    uploadedFileMeta:newFile,
  };
}


export function uploadFileOnNewCommentContent(ideaId, persistenceId, htmlFormFile) {
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if (token) {
    const formData = new FormData();
    formData.append('file', new Blob([htmlFormFile], { type: htmlFormFile.type }), htmlFormFile.name || 'file');
    formData.append('ideaId', ideaId);
    formData.append('viewId', htmlFormFile.id);
    formData.append('persistenceId', persistenceId);
    formData.append('name', htmlFormFile.name);
    config = {
      headers: {
        Authorization: `${token}`,
      },
      method: 'POST',
      body: formData,
    };
  } else {
    throw 'No token saved!';
  }
  return dispatch => {
    dispatch(uploadFileOnNewCommentContentRequest(ideaId, htmlFormFile));
    console.log('uploadFileOnNewCommentContentRequest(...)');
    console.log(ideaId);
    console.log(htmlFormFile);
    return fetch(`${API_BASE_URI}/ideas/comment/attach-content`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(uploadOnNewCommentFileContentError(`Failed to upload file. ${body.error}`));
          return Promise.reject('Failed to upload file');
        }
        console.log('uploadFileOnNewCommentContent... body');
        console.log(body);
        dispatch(uploadFileOnNewCommentContentSuccess(body, ideaId, htmlFormFile));
        return true;
      }).catch(err => {
        dispatch(uploadFileOnNewCommentContentError(`Failed to upload file. ${err}`));
        console.log('Error: ', err);
      });
  };
}



function uploadFileOnNewCommentContentError(message) {
	  return {
	    type: UPLOAD_FILE_ON_NEW_COMMENT_CONTENT_FAILURE,
	    message,
	  };
	}





















export function removeFiles(ideaId, files) {
  console.log('removeFiles');
  console.log(files);
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  const removeFilesList = {
    files,
    ideaId,
  };
  if (token) {
    config = {
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      method: 'DELETE',
      body: JSON.stringify(removeFilesList),
    };
  } else {
    throw 'No token saved!';
  }
  return dispatch => {
    console.log('removeFilesRequest(...)');
    console.log(ideaId);
    console.log(removeFilesList);
    dispatch(removeFilesRequest(ideaId, removeFilesList));
    return fetch(`${API_BASE_URI}/ideas/attach`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(removeFilesError(`Failed to upload file. ${body.error}`));
          return Promise.reject('Failed to remove file');
        }
        console.log('removeFiles -> body');
        console.log(body);
        dispatch(removeFilesSuccess(body, removeFilesList));
        return true;
      }).catch(err => {
        dispatch(removeFilesError(`Failed to upload file. ${err}`));
        console.log('Error: ', err);
      });
  };
}


export function removeFilesOnNewComment(ideaId, files) {
	  console.log('removeFilesOnNewComment');
	  console.log(files);
	  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
	  let config = {};

	  const removeFilesList = {
	    files,
	    ideaId,
	  };
	  if (token) {
	    config = {
	      headers: {
	        Authorization: `${token}`,
	        'Content-Type': 'application/json',
	      },
	      method: 'DELETE',
	      body: JSON.stringify(removeFilesList),
	    };
	  } else {
	    throw 'No token saved!';
	  }
	  return dispatch => {
	    console.log('removeFilesRequest(...)');
	    console.log(ideaId);
	    console.log(removeFilesList);
	    dispatch(removeFilesOnNewCommentRequest(ideaId, removeFilesList));
	    return fetch(`${API_BASE_URI}/ideas/comment/attach`, config)
	      .then(response => response.json().then(body => ({ body, response })))
	      .then(({ body, response }) => {
	        if (!response.ok) {
	          console.log("response");	
	          console.log(response);	
	          dispatch(removeFilesOnNewCommentError(`Failed to upload file. ${body.error}`));
	          return Promise.reject('Failed to remove file');
	        }
	        console.log('removeFilesOnNewComment -> body');
	        console.log(body);
	        dispatch(removeFilesOnNewCommentSuccess(body, removeFilesList));
	        return true;
	      }).catch(err => {
	        dispatch(removeFilesOnNewCommentError(`Failed to upload file. ${err}`));
	        console.log('Error: ', err);
	      });
	  };
	}


export const UPLOAD_FILE_REQUEST = 'UPLOAD_FILE_REQUEST';
export const UPLOAD_FILE_SUCCESS = 'UPLOAD_FILE_SUCCESS';
export const UPLOAD_FILE_FAILURE = 'UPLOAD_FILE_FAILURE';

function uploadFileRequest(ideaId, file) {
  return {
    type: UPLOAD_FILE_REQUEST,
    ideaId,
    file,
  };
}

function uploadFileError(message) {
  return {
    type: UPLOAD_FILE_FAILURE,
    message,
  };
}

function uploadFileSuccess(dispatch, uploadedFileMeta, ideaId, htmlFormFile) {
  console.log("uploadFileSuccess(...)");
  dispatch(uploadFileContent(ideaId, uploadedFileMeta.persistenceId, htmlFormFile));
  return {
    type: UPLOAD_FILE_SUCCESS,
    ideaId,
    uploadedFileMeta,
    htmlFormFile,
  };
}



export const UPLOAD_FILE_ON_NEW_COMMENT_REQUEST = 'UPLOAD_FILE_ON_NEW_COMMENT_REQUEST';
export const UPLOAD_FILE_ON_NEW_COMMENT_SUCCESS = 'UPLOAD_FILE_ON_NEW_COMMENT_SUCCESS';
export const UPLOAD_FILE_ON_NEW_COMMENT_FAILURE = 'UPLOAD_FILE_ON_NEW_COMMENT_FAILURE';

function uploadFileOnNewCommentRequest(ideaId, file) {
  return {
    type: UPLOAD_FILE_ON_NEW_COMMENT_REQUEST,
    ideaId,
    file,
  };
}

function uploadFileOnNewCommentError(message) {
  return {
    type: UPLOAD_FILE_ON_NEW_COMMENT_FAILURE,
    message,
  };
}

function uploadFileOnNewCommentSuccess(dispatch, uploadedFileMeta, ideaId, htmlFormFile) {
  console.log("uploadFileOnNewCommentSuccess(...)");
  dispatch(uploadFileOnNewCommentContent(ideaId, uploadedFileMeta.persistenceId, htmlFormFile));
  return {
    type: UPLOAD_FILE_ON_NEW_COMMENT_SUCCESS,
    ideaId,
    uploadedFileMeta,
    htmlFormFile,
  };
}


export const REMOVE_FILES_REQUEST = 'REMOVE_FILES_REQUEST';
export const REMOVE_FILES_SUCCESS = 'REMOVE_FILES_SUCCESS';
export const REMOVE_FILES_FAILURE = 'REMOVE_FILES_FAILURE';

function removeFilesRequest(ideaId, removeFilesList) {
  return {
    type: REMOVE_FILES_REQUEST,
    fileList: removeFilesList,
    ideaId, 
  };
}

function removeFilesError(message) {
  return {
    type: REMOVE_FILES_FAILURE,
    message,
  };
}

function removeFilesSuccess(fileListStructure) {
  return {
    type: REMOVE_FILES_SUCCESS,
    ideaId:fileListStructure.ideaId,
    files:fileListStructure.files,
  };
}



export const REMOVE_FILES_ON_NEW_COMMENT_REQUEST = 'REMOVE_FILES_ON_NEW_COMMENT_REQUEST';
export const REMOVE_FILES_ON_NEW_COMMENT_SUCCESS = 'REMOVE_FILES_ON_NEW_COMMENT_SUCCESS';
export const REMOVE_FILES_ON_NEW_COMMENT_FAILURE = 'REMOVE_FILES_ON_NEW_COMMENT_FAILURE';

function removeFilesOnNewCommentRequest(ideaId, removeFilesList) {
  return {
    type: REMOVE_FILES_ON_NEW_COMMENT_REQUEST,
    fileList: removeFilesList,
    ideaId, 
  };
}

function removeFilesOnNewCommentError(message) {
  return {
    type: REMOVE_FILES_ON_NEW_COMMENT_FAILURE,
    message,
  };
}

function removeFilesOnNewCommentSuccess(fileListStructure) {
  return {
    type: REMOVE_FILES_ON_NEW_COMMENT_SUCCESS,
    ideaId:fileListStructure.ideaId,
    files:fileListStructure.files,
  };
}


