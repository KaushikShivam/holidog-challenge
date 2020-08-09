import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
  USER_LOADED,
  AUTH_ERROR,
} from './authTypes';

export const INITIAL_STATE = {
  currentUser: null,
  fetching: false,
  error: false,
  token: localStorage.getItem('jwt'),
};

const authReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case SIGNUP_START:
    case LOGIN_START:
      return { ...state, fetching: true, error: false };
    case SIGNUP_SUCCESS:
    case LOGIN_SUCCESS:
    case USER_LOADED:
      localStorage.setItem('jwt', payload.token);
      return {
        ...state,
        currentUser: payload.user,
        error: false,
        fetching: false,
        token: payload.token,
      };
    case SIGNUP_FAILURE:
    case LOGIN_FAILURE:
    case AUTH_ERROR:
      localStorage.removeItem('jwt');
      return {
        ...state,
        fetching: false,
        error: true,
      };
    case LOG_OUT:
      localStorage.removeItem('jwt');
      return {
        ...state,
        currentUser: null,
        token: null,
      };
    default:
      return state;
  }
};

export default authReducer;
