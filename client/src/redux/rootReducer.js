import { combineReducers } from 'redux';

import authReducer from './auth/authReducer';
import alertReducer from './alert/alertReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  alert: alertReducer,
});

export default rootReducer;
