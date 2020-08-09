import { FETCH_ALL_BOOKS, CREATE_BOOK, FETCH_BOOK } from './bookTypes';

import bookReducer, { INITIAL_STATE } from './bookReducer';

const sampleBooks = [
  {
    _id: '1',
    name: 'book',
    isbn: '1',
  },
  {
    _id: '2',
    name: 'book',
    isbn: '2',
  },
  {
    _id: '3',
    name: 'book',
    isbn: '3',
  },
];

it('should return initial state when no action is provided', () => {
  const newState = bookReducer(undefined, {});
  expect(newState).toEqual(INITIAL_STATE);
});

it('should return expected state with `FETCH_ALL_BOOKS`', () => {
  const action = { type: FETCH_ALL_BOOKS, payload: sampleBooks };

  const newState = bookReducer(undefined, action);
  expect(newState).toEqual({
    books: sampleBooks,
    singleBook: null,
    filter: '',
  });
});

it('should return expected state with `FETCH_BOOK`', () => {
  const action = { type: FETCH_BOOK, payload: sampleBooks[0] };

  const newState = bookReducer(undefined, action);
  expect(newState).toEqual({
    books: [],
    singleBook: sampleBooks[0],
    filter: '',
  });
});

it('should return expected state with `CREATE_BOOK`', () => {
  const action = { type: CREATE_BOOK, payload: sampleBooks[0] };

  const newState = bookReducer(undefined, action);
  expect(newState).toEqual({
    books: [{ ...sampleBooks[0] }],
    singleBook: null,
    filter: '',
  });
});
