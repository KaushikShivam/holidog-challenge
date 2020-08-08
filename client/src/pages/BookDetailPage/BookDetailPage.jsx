import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectSingleBook } from './../../redux/book/bookSelectors';

import { fetchBook } from './../../redux/book/bookActions';

const BookDetailPage = ({ book, fetchBook }) => {
  const { bookId } = useParams();

  useEffect(() => {
    fetchBook(bookId);
  }, [fetchBook]);

  return (
    <main className="BookDetailPage">
      {book && (
        <div className="">
          <h2 className="heading-1 color-blue">{`${book.name}`}</h2>

          <h3 className="heading-2 color-blue-2">{`Author: ${book.author.firstName} ${book.author.lastName}`}</h3>
          <h3 className="heading-3 color-grey">{`ISBN: ${book.isbn}`}</h3>
        </div>
      )}
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  book: selectSingleBook,
});

const mapDispatchToProps = (dispatch) => ({
  fetchBook: (id) => dispatch(fetchBook(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(BookDetailPage);
