import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import alertReducer from './alert/alertReducer';
import authorReducer from './author/authorReducer';
import bookReducer from './book/bookReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
  author: authorReducer,
  book: bookReducer,
});

export default rootReducer;
