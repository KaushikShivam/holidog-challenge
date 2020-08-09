import {
  SIGNUP_START,
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  LOG_OUT,
} from './authTypes';

import authReducer, { INITIAL_STATE } from './authReducer';

it('should return initial state when no action is provided', () => {
  const newState = authReducer(undefined, {});
  expect(newState).toEqual(INITIAL_STATE);
});

it('should return expected state with `SIGNUP_START`', () => {
  const action = { type: SIGNUP_START };

  const newState = authReducer(undefined, action);
  expect(newState).toEqual({
    currentUser: null,
    fetching: true,
    error: false,
    token: null,
  });
});

it('should return expected state with `SIGN_IN_SUCCESS`', () => {
  const response = {
    user: {
      name: 'test',
      email: 'test@test.com',
    },
    token: 'token',
  };
  const action = { type: SIGNUP_SUCCESS, payload: response };

  const newState = authReducer(undefined, action);
  expect(newState).toEqual({
    currentUser: response.user,
    error: false,
    fetching: false,
    token: response.token,
  });
});

test('should return expected state when `SIGN_UP_FAILURE` is passed', () => {
  const action = { type: SIGNUP_FAILURE };

  const newState = authReducer(undefined, action);
  expect(newState).toEqual({
    currentUser: null,
    error: true,
    token: null,
    fetching: false,
  });
});

test('should return expected state when `SIGN_UP_FAILURE` is passed', () => {
  const action = { type: LOG_OUT };

  const newState = authReducer(undefined, action);
  expect(newState).toEqual({
    currentUser: null,
    error: false,
    token: null,
    fetching: false,
  });
});
