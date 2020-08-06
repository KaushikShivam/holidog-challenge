import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOGIN_START,
  LOGIN_SUCCESS,
  LOGIN_FAILURE,
  LOG_OUT,
} from './authTypes';

import { signupService, loginService } from './../../services/authServices';

export const signup = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_START });
    const res = await signupService(formData);
    dispatch({ type: SIGNUP_SUCCESS, payload: res });
  } catch (err) {
    // TODO: Add error handling
    dispatch({ type: SIGNUP_FAILURE });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_START });
    const res = await loginService(formData);
    dispatch({ type: LOGIN_SUCCESS, payload: res });
  } catch (err) {
    // TODO: Add error handling
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};
