import { API_BASE_URI, ID_TOKEN_KEY } from '../const';


export const CHANGE_FILES = 'CHANGE_FILES';


function getFilesToAdd(oldFiles, files) {
  const gotOldFiles = oldFiles == null ? [] : oldFiles;
  const newArray = files.filter((el) => gotOldFiles.indexOf(el) < 0);
  return newArray;
}

function getFilesToRemove(oldFiles, files) {
  const gotFiles = files == null ? [] : files;
  const gotOldFiles = oldFiles == null ? [] : oldFiles;
  const newArray = gotOldFiles.filter((el) => gotFiles.indexOf(el) < 0);
  return newArray;
}

export function changeFiles(dispatch, ideaId, oldFiles, files) {
  // discover difference with previous file list
  // upload all new files
  // remove all old files
  // upload file

  console.log("changeFies(...)");
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

  return {
    type: CHANGE_FILES,
    files,
  };
}


export function uploadFile(ideaId, file) {
  const token = localStorage.getItem(ID_TOKEN_KEY) || null;
  let config = {};

  if (token) {
    const formData = new FormData();
    formData.append('file', new Blob([file], { type: file.type }), file.name || 'file');
    formData.append('ideaId', ideaId);
    formData.append('fileId', file.id);
    formData.append('name', file.name);
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
    dispatch(uploadFileRequest(ideaId, file));
    console.log('uploadFileRequest(...)');
    console.log(ideaId);
    console.log(file);
    return fetch(`${API_BASE_URI}/ideas/attach`, config)
      .then(response => response.json().then(body => ({ body, response })))
      .then(({ body, response }) => {
        if (!response.ok) {
          dispatch(updateIdeaError(`Failed to upload file. ${body.error}`));
          return Promise.reject('Failed to upload file');
        }
        console.log('uploadFile... body');
        console.log(body);
        dispatch(uploadFileSuccess(body, ideaId, file));
        return true;
      }).catch(err => {
        dispatch(uploadFileError(`Failed to upload file. ${err}`));
        console.log('Error: ', err);
      });
  };
}

export function removeFiles(ideaId, files) {

  console.log("removeFiles");
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

function uploadFileError(message) {
  return {
    type: UPLOAD_FILE_FAILURE,
    message,
  };
}

function uploadFileSuccess(uploadedFile, ideaId, file) {
  return {
    type: UPLOAD_FILE_SUCCESS,
    ideaId,
    uploadedFile,
    file,
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

function removeFilesSuccess(ideaId, key, file) {
  console.log('uploadFileSuccess');
  console.log(ideaId);
  console.log(key);
  console.log(file);

  return {
    type: REMOVE_FILES_SUCCESS,
    ideaId,
    key,
    file,
  };
}

