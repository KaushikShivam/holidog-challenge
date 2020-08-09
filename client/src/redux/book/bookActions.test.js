import moxios from 'moxios';

import { storeFactory } from '../../utils/testUtils';

import { fetchAllBooks, createBook, fetchBook } from './bookActions';

describe('Book action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch all books successfully', () => {
    expect.assertions(1);

    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          data: {
            books: [
              {
                _id: '_id',
                name: 'book',
                isbn: 'isbn',
                author: '',
              },
            ],
          },
        },
      });
    });

    return store.dispatch(fetchAllBooks()).then(() => {
      const newState = store.getState();
      expect(newState.book).toEqual({
        books: [
          {
            _id: '_id',
            name: 'book',
            isbn: 'isbn',
            author: '',
          },
        ],
        filter: '',
        singleBook: null,
      });
    });
  });

  it('should create a book successfully', () => {
    expect.assertions(1);

    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'success',
          data: {
            book: {
              _id: '_id',
              name: 'book',
              isbn: 'isbn',
              author: '',
            },
          },
        },
      });
    });

    return store.dispatch(createBook()).then(() => {
      const newState = store.getState();
      expect(newState.book).toEqual({
        books: [
          {
            _id: '_id',
            name: 'book',
            isbn: 'isbn',
            author: '',
          },
        ],
        filter: '',
        singleBook: null,
      });
    });
  });

  it('should fetch a single Book', () => {
    expect.assertions(1);

    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          data: {
            book: {
              _id: '_id',
              name: 'book',
              isbn: 'isbn',
              author: '',
            },
          },
        },
      });
    });

    return store.dispatch(fetchBook()).then(() => {
      const newState = store.getState();
      expect(newState.book).toEqual({
        books: [],
        filter: '',
        singleBook: {
          _id: '_id',
          name: 'book',
          isbn: 'isbn',
          author: '',
        },
      });
    });
  });
});
