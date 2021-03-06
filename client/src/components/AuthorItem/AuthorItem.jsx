import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const AuthorItem = ({ author, handleEdit, handleDelete }) => {
  const { id, firstName, lastName } = author;
  return (
    <div className="AuthorItem">
      <h2 className="heading-1">{`${firstName} ${lastName}`}</h2>
      <Link to={`/authors/${id}`}>View All Books</Link>

      <div className="AuthorItem__cta">
        <button className="AuthorItem__btn" onClick={handleEdit}>
          Edit Author
        </button>
        <button
          className="AuthorItem__btn AuthorItem__btn--red"
          onClick={handleDelete}
        >
          Remove Author
        </button>
      </div>
    </div>
  );
};

AuthorItem.propTypes = {
  author: PropTypes.object.isRequired,
  handleEdit: PropTypes.func.isRequired,
  handleDelete: PropTypes.func.isRequired,
};

export default AuthorItem;
