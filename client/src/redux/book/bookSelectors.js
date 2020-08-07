import { createSelector } from 'reselect';

const selecBook = (state) => state.book;

export const selecBooks = createSelector([selecBook], (book) => book.books);

export const selectSingleBook = createSelector(
  [selecBook],
  (book) => book.singleBook
);
