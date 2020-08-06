import { createSelector } from 'reselect';

const selectAuth = (state) => state.auth;

export const selectCurrentUser = createSelector(
  [selectAuth],
  (auth) => auth.currentUser
);

export const selectError = createSelector([selectAuth], (auth) => auth.error);

export const selectToken = createSelector([selectAuth], (auth) => auth.token);

export const selectFetching = createSelector(
  [selectAuth],
  (auth) => auth.fetching
);
