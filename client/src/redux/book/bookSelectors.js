import { createSelector } from 'reselect';

const selecBook = (state) => state.book;

export const selectBooks = createSelector([selecBook], (book) => book.books);

export const selectSingleBook = createSelector(
  [selecBook],
  (book) => book.singleBook
);
