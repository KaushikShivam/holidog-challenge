import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  createBook,
  fetchAllBooks,
  updateBook,
  deleteBook,
} from './../../redux/book/bookActions';

import { selectBooks, selectFilter } from './../../redux/book/bookSelectors';

import { selectAuthors } from './../../redux/author/authorSelectors';

import BookForm from './../../components/BookForm/BookForm';
import BookItem from './../../components/BookItem/BookItem';
import CustomButton from '../../components/CustomButton/CustomButton';
import FilterSelect from '../../components/FilterSelect/FilterSelect';

const BookPage = ({
  books,
  authors,
  createBook,
  fetchAllBooks,
  updateBook,
  deleteBook,
  filter,
}) => {
  const [formOpen, setFormOpen] = useState(false);
  const [existingBook, setExistingBook] = useState(null);

  useEffect(() => {
    fetchAllBooks(filter);
  }, [fetchAllBooks, filter]);

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
    <main className="ui-offset">
      {formOpen && (
        <BookForm
          existingBook={existingBook}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
          authors={authors}
        />
      )}
      <div className="create-bar">
        <h2 className="heading-2 color-blue">Create a Book</h2>
        <div className="flex">
          <FilterSelect />
          <CustomButton onClick={() => setFormOpen(!formOpen)}>
            Create
          </CustomButton>
        </div>
      </div>
      <div>
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

BookPage.propTypes = {
  books: PropTypes.array.isRequired,
  authors: PropTypes.array.isRequired,
  createBook: PropTypes.func.isRequired,
  fetchAllBooks: PropTypes.func.isRequired,
  updateBook: PropTypes.func.isRequired,
  deleteBook: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  books: selectBooks,
  authors: selectAuthors,
  filter: selectFilter,
});

const mapDispatchToProps = (dispatch) => ({
  createBook: (formData) => dispatch(createBook(formData)),
  fetchAllBooks: (filter) => dispatch(fetchAllBooks(filter)),
  updateBook: (id, formData) => dispatch(updateBook(id, formData)),
  deleteBook: (id) => dispatch(deleteBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookPage);
