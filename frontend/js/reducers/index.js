import { combineReducers } from 'redux';
import { auth } from './auth';
import { ideas } from './ideas';
import { register } from './register';
import { users } from './users';
import { admin } from './admin';

// We combine the reducers here so that they
// can be left split apart above
const pipelineApp = combineReducers({
  auth,
  ideas,
  register,
  users,
  admin,
});

export default pipelineApp;
