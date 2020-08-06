import axios from 'axios';
import { BASE_URL, ServiceError } from './utils';

/**
 * Registers a user with name, email, password, confirmPassword
 * @function signupService
 * @param {object} formData Object contains name, email, password, confirmPassword
 * @returns {object} User object
 */
export const signupService = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/signup`, formData);
    return res.data.data;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};

/**
 * Logs a user in with email and password
 * @function loginService
 * @param {object} formData Object contains email and password
 * @returns {object} User object
 */
export const signupService = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/users/signup`, formData);
    return res.data.data;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};
