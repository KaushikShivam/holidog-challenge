import {
  FETCH_ALL_AUTHORS,
  CREATE_AUTHOR,
  FETCH_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
  CLEAR_AUTHORS,
} from './authorTypes';

import {
  fetchAllAuthorsService,
  createAuthorService,
  fetchAuthorService,
  updateAuthorService,
  deleteAuthorService,
} from './../../services/authorServices';

import { setAlert } from './../alert/alertActions';

import { handleErrors } from './../../services/utils';

export const fetchAllAuthors = () => async (dispatch) => {
  try {
    dispatch({
      type: CLEAR_AUTHORS,
    });
    const res = await fetchAllAuthorsService();
    dispatch({
      type: FETCH_ALL_AUTHORS,
      payload: res,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
  }
};

export const createAuthor = (formData) => async (dispatch) => {
  try {
    const res = await createAuthorService(formData);
    dispatch({
      type: CREATE_AUTHOR,
      payload: res,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
  }
};

export const fetchAuthor = (id) => async (dispatch) => {
  try {
    const res = await fetchAuthorService(id);
    dispatch({
      type: FETCH_AUTHOR,
      payload: res,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
  }
};

export const updateAuthor = (id, formData) => async (dispatch) => {
  try {
    const res = await updateAuthorService(id, formData);
    dispatch({
      type: UPDATE_AUTHOR,
      payload: res,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
  }
};

export const deleteAuthor = (id) => async (dispatch) => {
  try {
    await deleteAuthorService(id);
    dispatch({
      type: DELETE_AUTHOR,
      payload: id,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
  }
};
