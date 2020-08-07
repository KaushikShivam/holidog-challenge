import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import alertReducer from './alert/alertReducer';
import authorReducer from './author/authorReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  author: authorReducer,
});

export default rootReducer;
