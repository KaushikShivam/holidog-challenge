import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
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

  const handleSubmit = (formData, editing = false, existingAuthorId = null) => {
    if (editing) {
      updateAuthor(existingAuthorId, formData);
    } else {
      createAuthor(formData);
    }
    setFormOpen(false);
    setExistingAuthor(null);
  };

  return (
    <main className="ui-offset">
      {formOpen && (
        <AuthorForm
          existingAuthor={existingAuthor}
          handleClose={handleClose}
          handleSubmit={handleSubmit}
        />
      )}
      <div className="create-bar">
        <h2 className="heading-2 color-blue">Create an Author</h2>
        <CustomButton onClick={() => setFormOpen(!formOpen)}>
          Create Author
        </CustomButton>
      </div>
      <div>
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

AuthorPage.propTypes = {
  authors: PropTypes.array.isRequired,
  createAuthor: PropTypes.func.isRequired,
  fetchAllAuthors: PropTypes.func.isRequired,
  updateAuthor: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
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
