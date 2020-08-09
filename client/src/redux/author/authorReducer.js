import {
  FETCH_ALL_AUTHORS,
  CREATE_AUTHOR,
  FETCH_AUTHOR,
  UPDATE_AUTHOR,
  DELETE_AUTHOR,
  CLEAR_AUTHORS,
} from './authorTypes';

export const INITIAL_STATE = {
  authors: [],
  singleAuthor: null,
};

const authorReducer = (state = INITIAL_STATE, action) => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_ALL_AUTHORS:
      return {
        ...state,
        authors: payload,
      };
    case CREATE_AUTHOR:
      return {
        ...state,
        authors: [payload, ...state.authors],
      };
    case FETCH_AUTHOR:
      return {
        ...state,
        singleAuthor: payload,
      };
    case UPDATE_AUTHOR:
      return {
        ...state,
        authors: state.authors.map((author) =>
          author.id === payload.id ? payload : author
        ),
      };
    case DELETE_AUTHOR:
      return {
        ...state,
        authors: state.authors.filter((author) => author.id !== payload),
      };
    case CLEAR_AUTHORS:
      return {
        ...state,
        authors: [],
      };
    default:
      return state;
  }
};

export default authorReducer;
