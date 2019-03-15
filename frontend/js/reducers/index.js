import { combineReducers } from 'redux';
import { auth } from './auth';
import { ideas } from './ideas';
import { register } from './register';
import { users } from './users';

// We combine the reducers here so that they
// can be left split apart above
const pipelineApp = combineReducers({
  auth,
  ideas,
  register,
  users,
});

export default pipelineApp;
