import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import {
  createAuthor,
  fetchAllAuthors,
  updateAuthor,
  deleteAuthor,
} from './../../redux/author/authorActions';

import { selectAuthors } from './../../redux/author/authorSelectors';

import AuthorForm from './../../components/AuthorForm/AuthorForm';
import AuthorItem from './../../components/AuthorItem/AuthorItem';
import CustomButton from '../../components/CustomButton/CustomButton';

const AuthorPage = ({
  authors,
  createAuthor,
  fetchAllAuthors,
  updateAuthor,
  deleteAuthor,
}) => {
  const [formOpen, setFormOpen] = useState(false);
  const [existingAuthor, setExistingAuthor] = useState(null);

  useEffect(() => {
    fetchAllAuthors();
  }, [fetchAllAuthors]);

  const handleEdit = (author) => {
    setExistingAuthor(author);
    setFormOpen(true);
  };

  const handleClose = () => {
    setExistingAuthor(null);
    setFormOpen(false);
  };

  const handleSubmit = (formData, editing = false, existingUserId = null) => {
    if (editing) {
      updateAuthor(existingUserId, formData);
    } else {
      createAuthor(formData);
    }
    setFormOpen(false);
    setExistingAuthor(null);
  };

  return (
    <main className="AuthorPage">
      {formOpen && (
        <AuthorForm
          existingAuthor={existingAuthor}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
      <div className="AuthorPage__create">
        <h2 className="heading-2 color-blue">Create an Author</h2>
        <CustomButton onClick={() => setFormOpen(!formOpen)}>
          Create Author
        </CustomButton>
      </div>
      <div className="AuthorPage__authors">
        {authors.map((author) => (
          <AuthorItem
            key={author.id}
            author={author}
            handleEdit={() => handleEdit(author)}
            handleDelete={() => deleteAuthor(author.id)}
          />
        ))}
      </div>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  authors: selectAuthors,
});

const mapDispatchToProps = (dispatch) => ({
  createAuthor: (formData) => dispatch(createAuthor(formData)),
  fetchAllAuthors: () => dispatch(fetchAllAuthors()),
  updateAuthor: (id, formData) => dispatch(updateAuthor(id, formData)),
  deleteAuthor: (id) => dispatch(deleteAuthor(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorPage);
