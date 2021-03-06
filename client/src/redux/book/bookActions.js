import {
  FETCH_ALL_BOOKS,
  CREATE_BOOK,
  FETCH_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  SELECT_FILTER,
} from './bookTypes';

import {
  fetchAllBooksService,
  createBookService,
  fetchBookService,
  updateBookService,
  deleteBookService,
} from './../../services/bookServices';

import { setAlert } from './../alert/alertActions';

import { handleErrors } from './../../services/utils';

export const fetchAllBooks = (filter = '') => async (dispatch) => {
  try {
    const res = await fetchAllBooksService(filter);
    dispatch({
      type: FETCH_ALL_BOOKS,
      payload: res,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
  }
};

export const handleFilter = (filter) => async (dispatch) => {
  dispatch({ type: SELECT_FILTER, payload: filter });
  dispatch(fetchAllBooks(filter));
};

export const createBook = (formData) => async (dispatch) => {
  try {
    const res = await createBookService(formData);
    dispatch({
      type: CREATE_BOOK,
      payload: res,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
  }
};

export const fetchBook = (id) => async (dispatch) => {
  try {
    const res = await fetchBookService(id);
    dispatch({
      type: FETCH_BOOK,
      payload: res,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
  }
};

export const updateBook = (id, formData) => async (dispatch) => {
  try {
    const res = await updateBookService(id, formData);
    dispatch({
      type: UPDATE_BOOK,
      payload: res,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
  }
};

export const deleteBook = (id) => async (dispatch) => {
  try {
    await deleteBookService(id);
    dispatch({
      type: DELETE_BOOK,
      payload: id,
    });
  } catch (err) {
    handleErrors(err, dispatch, setAlert);
  }
};
