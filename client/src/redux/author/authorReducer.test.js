import { FETCH_ALL_AUTHORS, CREATE_AUTHOR, FETCH_AUTHOR } from './authorTypes';

import authorReducer, { INITIAL_STATE } from './authorReducer';

const sampleAuthors = [
  {
    _id: '1',
    firstName: 'author',
    lastName: '1',
  },
  {
    _id: '2',
    firstName: 'author',
    lastName: '2',
  },
  {
    _id: '3',
    firstName: 'author',
    lastName: '3',
  },
];

it('should return initial state when no action is provided', () => {
  const newState = authorReducer(undefined, {});
  expect(newState).toEqual(INITIAL_STATE);
});

it('should return expected state with `FETCH_ALL_AUTHORS`', () => {
  const action = { type: FETCH_ALL_AUTHORS, payload: sampleAuthors };

  const newState = authorReducer(undefined, action);
  expect(newState).toEqual({
    authors: sampleAuthors,
    singleAuthor: null,
  });
});

it('should return expected state with `FETCH_AUTHOR`', () => {
  const action = { type: FETCH_AUTHOR, payload: sampleAuthors[0] };

  const newState = authorReducer(undefined, action);
  expect(newState).toEqual({
    authors: [],
    singleAuthor: sampleAuthors[0],
  });
});

it('should return expected state with `CREATE_AUTHOR`', () => {
  const action = { type: CREATE_AUTHOR, payload: sampleAuthors[0] };

  const newState = authorReducer(undefined, action);
  expect(newState).toEqual({
    authors: [{ ...sampleAuthors[0] }],
    singleAuthor: null,
  });
});
