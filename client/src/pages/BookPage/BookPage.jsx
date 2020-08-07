import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  createBook,
  fetchAllBooks,
  updateBook,
  deleteBook,
} from './../../redux/book/bookActions';

import { fetchAllAuthors } from './../../redux/author/authorActions';

import { selectBooks } from './../../redux/book/bookSelectors';
import { selectAuthors } from './../../redux/author/authorSelectors';

import BookForm from './../../components/BookForm/BookForm';
import BookItem from './../../components/BookItem/BookItem';
import CustomButton from '../../components/CustomButton/CustomButton';

const BookPage = ({
  books,
  authors,
  createBook,
  fetchAllBooks,
  fetchAllAuthors,
  updateBook,
  deleteBook,
}) => {
  const [formOpen, setFormOpen] = useState(false);
  const [existingBook, setExistingBook] = useState(null);

  useEffect(() => {
    fetchAllBooks();
    fetchAllAuthors();
  }, [fetchAllBooks, fetchAllAuthors]);

  const handleEdit = (book) => {
    setExistingBook(book);
    setFormOpen(true);
  };

  const handleClose = () => {
    setExistingBook(null);
    setFormOpen(false);
  };

  const handleSubmit = (formData, editing = false, existingBookId = null) => {
    if (editing) {
      updateBook(existingBookId, formData);
    } else {
      createBook(formData);
    }
    setFormOpen(false);
    setExistingBook(null);
  };

  return (
    <main className="BookPage">
      {formOpen && (
        <BookForm
          existingBook={existingBook}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          authors={authors}
        />
      )}
      <div className="BookPage__create">
        <h2 className="heading-2 color-blue">Create a Book</h2>
        <CustomButton onClick={() => setFormOpen(!formOpen)}>
          Create Book
        </CustomButton>
      </div>
      <div className="BookPage__books">
        {books.map((book) => (
          <BookItem
            key={book.id}
            book={book}
            handleEdit={() => handleEdit(book)}
            handleDelete={() => deleteBook(book.id)}
          />
        ))}
      </div>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  books: selectBooks,
  authors: selectAuthors,
});

const mapDispatchToProps = (dispatch) => ({
  createBook: (formData) => dispatch(createBook(formData)),
  fetchAllBooks: () => dispatch(fetchAllBooks()),
  fetchAllAuthors: () => dispatch(fetchAllAuthors()),
  updateBook: (id, formData) => dispatch(updateBook(id, formData)),
  deleteBook: (id) => dispatch(deleteBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
