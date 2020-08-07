import React from 'react';
import { Link } from 'react-router-dom';

const BookItem = ({ book, handleEdit, handleDelete }) => {
  const { id, name, isbn, author } = book;
  return (
    <div className="BookItem">
      <Link to={`/books/${id}`}>
        <h2 className="heading-1 color-blue">{`${name}`}</h2>
      </Link>
      <Link to={`/authors/${author.id}`}>
        <h2 className="heading-2 color-blue-2">{`${author.firstName} ${author.lastName}`}</h2>
      </Link>
      <h3 className="heading-3 color-grey">{`ISBN: ${isbn}`}</h3>
      <Link to={`/authors/${author.id}`}>{author.name}</Link>

      <div className="BookItem__cta">
        <button className="BookItem__btn" onClick={handleEdit}>
          Edit Book
        </button>
        <button
          className="BookItem__btn BookItem__btn--red"
          onClick={handleDelete}
        >
          Remove Book
        </button>
      </div>
    </div>
  );
};

export default BookItem;
