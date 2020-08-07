import axios from 'axios';
import { BASE_URL, ServiceError } from './utils';

/**
 * Create a new Book
 * @function createBookService
 * @param {object} formData Object contains name, isbn, author
 * @returns {object} book object
 */
export const createBookService = async (formData) => {
  try {
    const res = await axios.post(`${BASE_URL}/books`, formData);
    return res.data.data.book;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};

/**
 * fetch all the books
 * @function fetchAllBooksService
 * @returns {array} array of books
 */
export const fetchAllBooksService = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/books`);
    return res.data.data.books;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};

/**
 * fetch a specific book
 * @function fetchBookService
 * @param {string} id
 * @returns {object} returns book object
 */
export const fetchBookService = async (id) => {
  try {
    const res = await axios.get(`${BASE_URL}/books/${id}`);
    return res.data.data.book;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};

/**
 * update a specific book
 * @function updateBookService
 * @param {string} id
 * @param {object} formData book to update
 * @returns {object} returns book object
 */
export const updateBookService = async (id, formData) => {
  try {
    const res = await axios.patch(`${BASE_URL}/books/${id}`, formData);
    return res.data.data.book;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};

/**
 * delete a specific book
 * @function deleteBookService
 * @param {string} id
 * @returns {string} returns success message
 */
export const deleteBookService = async (id, formData) => {
  try {
    const res = await axios.delete(`${BASE_URL}/authors/${id}`, formData);
    return res.data.status;
  } catch (err) {
    const { message, errors } = err.response.data;
    throw new ServiceError(message, errors);
  }
};
