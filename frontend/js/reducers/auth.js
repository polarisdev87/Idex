import {
  LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_FAILURE,
  LOGOUT_SUCCESS, CLEAR_LOGIN_ERRORS,
  SET_ROLE,
  FORGOT_PASSWORD_REQUEST,FORGOT_PASSWORD_SUCCESS,FORGOT_PASSWORD_FAILURE,
  RESET_PASSWORD_REQUEST, RESET_PASSWORD_SUCCESS, RESET_PASSWORD_FAILURE
} from '../actions/auth';



import { ID_TOKEN_KEY } from '../const';

export function auth(state = {
  isFetchingCreds: false,
  isAuthenticated: !!localStorage.getItem(ID_TOKEN_KEY),
  role: 'ROLE_NONE',
  resetPassword: {
      codeSent: true,
      confirmed: false,
      isConfirming: false,
      isSendingCode: false,
      errorMessage: "",
  }
}, action) {
  switch (action.type) {
    case LOGIN_REQUEST:
      return Object.assign({}, state, {
        isFetchingCreds: true,
        isAuthenticated: false,
      });
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        isFetchingCreds: false,
        isAuthenticated: true,
        role: action.role,
        loginErrorMessage: '',
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isFetchingCreds: false,
        isAuthenticated: false,
        loginErrorMessage: action.message,
      });
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        isFetchingCreds: false,
        isAuthenticated: false,
        role: 'ROLE_NONE',
      });
    case CLEAR_LOGIN_ERRORS:
      return Object.assign({}, state, {
        loginErrorMessage: '',
      });
    case SET_ROLE:
      return Object.assign({}, state, {
        isAuthenticated: true,
        role: action.role,
      });
    case FORGOT_PASSWORD_REQUEST:
        return Object.assign({}, state, {
        	  resetPassword: {
        	      codeSent: false,
        	      confirmed: false,
        	      isConfirming: false,
        	      isSendingCode: false,
        	      error: "",
        	  }
        });
    case FORGOT_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
        	  resetPassword: {
        	      codeSent: true,
        	      confirmed: false,
        	      isConfirming: false,
        	      isSendingCode: false,
        	      errorMessage: "",
        	  }
        });
    case FORGOT_PASSWORD_FAILURE:
        return Object.assign({}, state, {
        	  resetPassword: {
        	      codeSent: false,
        	      confirmed: false,
        	      isConfirming: false,
        	      isSendingCode: false,
        	      errorMessage: action.message,
        	  }
        });
    case RESET_PASSWORD_REQUEST:
        return Object.assign({}, state, {
        	  resetPassword: {
        	      codeSent: true,
        	      confirmed: false,
        	      isConfirming: true,
        	      isSendingCode: false,
        	      errorMessage: "",
        	  }
        });
    case RESET_PASSWORD_SUCCESS:
        return Object.assign({}, state, {
        	  resetPassword: {
        	      codeSent: true,
        	      confirmed: true,
        	      isConfirming: false,
        	      isSendingCode: false,
        	      errorMessage: "",
        	  }
        });
    case RESET_PASSWORD_FAILURE:
    	console.log("reducer: RESET_PASSWORD_FAILURE");
        return Object.assign({}, state, {
        	  resetPassword: {
        	      codeSent: true,
        	      confirmed: false,
        	      isConfirming: false,
        	      isSendingCode: false,
        	      errorMessage: action.message,
        	  }
        });
    default:
      return state;
  }
}
