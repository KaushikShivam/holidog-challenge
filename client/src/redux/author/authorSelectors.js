import { createSelector } from 'reselect';

const selectAuthor = (state) => state.author;

export const selectAuthors = createSelector(
  [selectAuthor],
  (author) => author.authors
);

export const selectSingleAuthor = createSelector(
  [selectAuthor],
  (author) => author.singleAuthor
);
