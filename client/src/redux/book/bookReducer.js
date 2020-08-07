import {
  FETCH_ALL_BOOKS,
  CREATE_BOOK,
  FETCH_BOOK,
  UPDATE_BOOK,
  DELETE_BOOK,
  CLEAR_BOOKS,
} from './bookTypes';

const INITIAL_STATE = {
  books: [],
  singleBook: {},
};

const bookReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_BOOKS:
      return {
        ...state,
        books: payload,
      };
    case CREATE_BOOK:
      return {
        ...state,
        books: [payload, ...state.books],
      };
    case FETCH_BOOK:
      return {
        ...state,
        singleBook: payload,
      };
    case UPDATE_BOOK:
      return {
        ...state,
        books: state.books.map((book) =>
          book.id === payload.id ? payload : book
        ),
      };
    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((book) => book.id !== payload),
      };
    case CLEAR_BOOKS:
      return {
        ...state,
        books: [],
      };
    default:
      return state;
  }
};

export default bookReducer;
