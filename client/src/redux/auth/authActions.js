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

import {
  signupService,
  loginService,
  getAuth,
} from './../../services/authServices';

import { setAuthToken, handleErrors } from './../../services/utils';

import { setAlert } from './../alert/alertActions';

export const signup = (formData) => async (dispatch) => {
  try {
    dispatch({ type: SIGNUP_START });
    const res = await signupService(formData);
    dispatch({ type: SIGNUP_SUCCESS, payload: res });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
    dispatch({ type: SIGNUP_FAILURE });
  }
};

export const login = (formData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_START });
    const res = await loginService(formData);
    dispatch({ type: LOGIN_SUCCESS, payload: res });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
    dispatch({ type: LOGIN_FAILURE });
  }
};

export const logout = () => (dispatch) => {
  dispatch({ type: LOG_OUT });
};

export const loadUser = () => async (dispatch) => {
  if (localStorage.jwt) {
    setAuthToken(localStorage.jwt);
  }

  try {
    const res = await getAuth();

    if (!res) {
      return dispatch({
        type: AUTH_ERROR,
      });
    }

    dispatch({
      type: USER_LOADED,
      payload: res,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
    dispatch({
      type: AUTH_ERROR,
    });
  }
};
