import moxios from 'moxios';

import { storeFactory } from '../../utils/testUtils';

import { fetchAllAuthors, createAuthor, fetchAuthor } from './authorActions';

describe('Author action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should fetch all authors successfully', () => {
    expect.assertions(1);

    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          data: {
            authors: [
              {
                _id: '_id',
                firstName: 'test',
                lastName: 'user',
              },
            ],
          },
        },
      });
    });

    return store.dispatch(fetchAllAuthors()).then(() => {
      const newState = store.getState();
      expect(newState.author).toEqual({
        authors: [{ _id: '_id', firstName: 'test', lastName: 'user' }],
        singleAuthor: null,
      });
    });
  });

  it('should create an author successfully', () => {
    expect.assertions(1);

    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 201,
        response: {
          status: 'success',
          data: {
            author: {
              _id: '_id',
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });
    });

    return store.dispatch(createAuthor()).then(() => {
      const newState = store.getState();
      expect(newState.author).toEqual({
        authors: [{ _id: '_id', firstName: 'test', lastName: 'user' }],
        singleAuthor: null,
      });
    });
  });

  it('should fetch a single Author', () => {
    expect.assertions(1);

    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          data: {
            author: {
              _id: '_id',
              firstName: 'test',
              lastName: 'user',
            },
          },
        },
      });
    });

    return store.dispatch(fetchAuthor()).then(() => {
      const newState = store.getState();
      expect(newState.author).toEqual({
        authors: [],
        singleAuthor: { _id: '_id', firstName: 'test', lastName: 'user' },
      });
    });
  });
});
