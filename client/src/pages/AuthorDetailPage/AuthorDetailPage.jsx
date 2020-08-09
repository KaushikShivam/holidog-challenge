import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectSingleAuthor } from './../../redux/author/authorSelectors';

import { fetchAuthor } from './../../redux/author/authorActions';

export const AuthorDetailPage = ({ author, fetchAuthor }) => {
  const { authorId } = useParams();

  useEffect(() => {
    fetchAuthor(authorId);
  }, [fetchAuthor, authorId]);

  return (
    <main className="ui-offset" data-test="page-author-detail">
      {author && (
        <div>
          <h1 className="heading-1">Author Details</h1>
          <h2 className="heading-3 color-blue">{`First Name: ${author.firstName}`}</h2>
          <h2 className="heading-3 color-blue">{`Last Name: ${author.lastName}`}</h2>
          <h3 className="heading-2">Books</h3>
          {author.books.map((book) => (
            <div className="card mb-sm" key={book.id}>
              <p className="heading-4 color-blue">Name: {book.name}</p>
              <p className="heading-4 color-blue">ISBN: {book.isbn}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

AuthorDetailPage.propTypes = {
  author: PropTypes.object,
  fetchAuthor: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  author: selectSingleAuthor,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAuthor: (id) => dispatch(fetchAuthor(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuthorDetailPage);
