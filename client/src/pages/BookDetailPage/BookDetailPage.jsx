import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectSingleBook } from './../../redux/book/bookSelectors';

import { fetchBook } from './../../redux/book/bookActions';

const BookDetailPage = ({ book, fetchBook }) => {
  const { bookId } = useParams();

  useEffect(() => {
    fetchBook(bookId);
  }, [fetchBook, bookId]);

  return (
    <main className="ui-offset">
      {book && (
        <div>
          <h2 className="heading-1 color-blue">{`${book.name}`}</h2>

          <div className="card">
            <h3 className="heading-3">
              <Link
                to={`/authors/${book.author.id}`}
                className="link color-blue-2"
              >{`Author: ${book.author.firstName} ${book.author.lastName}`}</Link>
            </h3>
            <h3 className="heading-3 color-grey">{`ISBN: ${book.isbn}`}</h3>
          </div>
        </div>
      )}
    </main>
  );
};

BookDetailPage.propTypes = {
  book: PropTypes.object,
  fetchBook: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  book: selectSingleBook,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBook: (id) => dispatch(fetchBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
