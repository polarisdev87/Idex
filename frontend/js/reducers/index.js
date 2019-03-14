import { combineReducers } from 'redux';
import { auth } from './auth';
import { ideas } from './ideas';
import { register } from './register';
import { users } from './users';
import { comments } from './comments';

// We combine the reducers here so that they
// can be left split apart above
const pipelineApp = combineReducers({
  auth,
  ideas,
  register,
  users,
  comments,
});

export default pipelineApp;
