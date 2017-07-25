import { combineReducers } from 'redux'
import { auth } from './auth'
import { register } from './register'
import { users } from './users'

// We combine the reducers here so that they
// can be left split apart above
const pipelineApp = combineReducers({
  auth,
  register,
  users
});

export default pipelineApp