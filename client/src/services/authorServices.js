import axios from 'axios';
import { BASE_URL, ServiceError } from './utils';

/**
 * Create a new Author
 * @function createAuthorService
 * @param {object} formData Object contains firstName, lastName
 * @returns {object} author object
 */
export const createAuthorService = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/authors`, formData);
    return res.data.data.author;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};

/**
 * fetch all the authors
 * @function fetchAllAuthorsService
 * @returns {array} array of authors
 */
export const fetchAllAuthorsService = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/authors`);
    return res.data.data.authors;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};

/**
 * fetch a specific author
 * @function fetchAuthorService
 * @param {string} id
 * @returns {object} returns author object
 */
export const fetchAuthorService = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/authors/${id}`);
    return res.data.data.author;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};

/**
 * update a specific author
 * @function updateAuthorsService
 * @param {string} id
 * @param {object} formData data to update
 * @returns {object} returns author object
 */
export const updateAuthorService = async (id, formData) => {
  try {
    const res = await axios.patch(`${BASE_URL}/authors/${id}`, formData);
    return res.data.data.author;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};

/**
 * update a specific author
 * @function deleteAuthorsService
 * @param {string} id
 * @returns {string} returns success message
 */
export const fetchAllAuthorService = async (id, formData) => {
  try {
    const res = await axios.patch(`${BASE_URL}/authors/${id}`, formData);
    return res.data.status;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};
