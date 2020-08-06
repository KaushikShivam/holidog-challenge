import axios from 'axios';

export const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  } else {
    delete axios.defaults.headers.common['Authorization'];
  }
};

export class ServiceError extends Error {
  constructor(message, errors = []) {
    super(message);

    this.errors = errors;
  }
}

export const BASE_URL = '/api/v1';

export const handleErrors = (err, dispatch, setAlert) => {
  if (err.errors.length > 0) {
    err.errors.forEach((error) => dispatch(setAlert(error, 'error')));
  } else {
    dispatch(setAlert(err.message, 'error'));
  }
};
