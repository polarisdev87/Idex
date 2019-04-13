import { API_BASE_URI, ID_TOKEN_KEY } from '../const';


/**
 * Identify all files that aren't in oldFiles
 */
function getFilesToAdd(oldFiles, files) {
  const gotOldFiles = oldFiles == null ? [] : oldFiles;
  const newArray = files.filter((el) => gotOldFiles.indexOf(el) < 0);
  return newArray;
}

/**
 * Identify all files that aren't in files and was in oldFiles
 */
function getFilesToRemove(oldFiles, files) {
  const gotFiles = files == null ? [] : files;
  const gotOldFiles = oldFiles == null ? [] : oldFiles;
  const newArray = gotOldFiles.filter((el) => gotFiles.indexOf(el) < 0);
  return newArray;
}


/**
 * It is called after the user adds or removes file attachments on an idea
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
      sizeReadeable: htmlFormFile.sizeReadeable, 
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
    dispatch(removeFilesRequest(removeFilesList));
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

function uploadFileContentError(message) {
	  return {
	    type: UPLOAD_FILE_CONTENT_FAILURE,
	    message,
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


export const REMOVE_FILES_REQUEST = 'REMOVE_FILES_REQUEST';
export const REMOVE_FILES_SUCCESS = 'REMOVE_FILES_SUCCESS';
export const REMOVE_FILES_FAILURE = 'REMOVE_FILES_FAILURE';

function removeFilesRequest(removeFilesList) {
  return {
    type: REMOVE_FILES_REQUEST,
    fileList: removeFilesList,
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

