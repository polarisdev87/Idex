import { API_BASE_URI, ID_TOKEN_KEY } from '../const';


export const CHANGE_FILES = 'CHANGE_FILES';

export function changeFiles(files) {
  return {
    type: CHANGE_FILES,
    files,
  };
}

