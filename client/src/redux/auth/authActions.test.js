import moxios from 'moxios';

import { storeFactory } from '../../utils/testUtils';

import { signup, logout } from './authActions';

describe('Auth action creator', () => {
  beforeEach(() => {
    moxios.install();
  });
  afterEach(() => {
    moxios.uninstall();
  });

  it('should set currentUser, error, fetching and token to correct values after successful signup/login/loadUser', () => {
    expect.assertions(1);

    const store = storeFactory();
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: {
          status: 'success',
          data: {
            user: {
              name: 'test',
              email: 'test@test.com',
            },
            token: 'token',
          },
        },
      });
    });

    return store
      .dispatch(
        signup({
          name: 'test',
          email: 'test@test.com',
          password: 'password',
          confirmPassword: 'password',
        })
      )
      .then(() => {
        const newState = store.getState();
        expect(newState.auth).toEqual({
          currentUser: { name: 'test', email: 'test@test.com' },
          error: false,
          fetching: false,
          token: 'token',
        });
      });
  });

  it('should set error & fetching to false, currentUser to null after unsuccesfull login/signup/loadUser', () => {
    expect.assertions(1);
    const store = storeFactory();
    const error = true;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 400,
        response: error,
      });
    });

    return store
      .dispatch(
        signup({
          name: 'test',
          email: 'test@test.com',
          password: 'password',
          confirmPassword: 'password',
        })
      )
      .then(() => {
        const newState = store.getState();
        expect(newState.auth).toEqual({
          error,
          fetching: false,
          currentUser: null,
          token: null,
        });
      });
  });

  it('should set error & fetching to false, currentUser to null after unsuccesfull logout', () => {
    expect.assertions(1);

    const store = storeFactory();
    store.dispatch(logout());
    const newState = store.getState();
    expect(newState.auth).toEqual({
      currentUser: null,
      error: false,
      token: null,
      fetching: false,
    });
  });
});
