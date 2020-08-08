import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { fetchAllAuthors } from './../../redux/author/authorActions';

import { selectAuthors } from './../../redux/author/authorSelectors';
import { selectFilter } from './../../redux/book/bookSelectors';

import { handleFilter } from './../../redux/book/bookActions';

const FilterSelect = ({ authors, fetchAllAuthors, handleFilter, filter }) => {
  useEffect(() => {
    fetchAllAuthors();
  }, [fetchAllAuthors]);

  const handleSelect = (e) => handleFilter(e.target.value);

  return (
    <div className="FormSelect mr-lg">
      <select
        name="filter"
        title="Select Author"
        onChange={handleSelect}
        defaultValue={filter}
      >
        <option value="">All</option>
        {authors.map((author) => (
          <option
            value={author.id}
            key={author.id}
          >{`${author.firstName} ${author.lastName}`}</option>
        ))}
      </select>
    </div>
  );
};

FilterSelect.propTypes = {
  authors: PropTypes.array.isRequired,
  fetchAllAuthors: PropTypes.func.isRequired,
  handleFilter: PropTypes.func.isRequired,
  filter: PropTypes.string.isRequired,
};

const mapStateToProps = createStructuredSelector({
  authors: selectAuthors,
  filter: selectFilter,
});

const mapDispatchToProps = (dispatch) => ({
  fetchAllAuthors: () => dispatch(fetchAllAuthors()),
  handleFilter: (filter) => dispatch(handleFilter(filter)),
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterSelect);
