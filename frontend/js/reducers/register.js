import {
  REGISTRATION_REQUEST, REGISTRATION_FAILURE, REGISTRATION_SUCCESS,
  REGISTRATION_CLEAR_ERRORS
} from '../actions/register'

export function register(state = {
  isFetching: false,
  registerErrorMessage: ''
}, action) {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return Object.assign({}, state, {
        isFetching: true,
        user: action.creds
      });
    case REGISTRATION_FAILURE:
      return Object.assign({}, state, {
        isRegistrationFormOpen: true,
        registerErrorMessage: action.message
      });
    case REGISTRATION_SUCCESS:
      return Object.assign({}, state, {
      });
    case REGISTRATION_CLEAR_ERRORS:
      return Object.assign({}, state, {
        registerErrorMessage: ''
      });
    default:
      return state
  }
}