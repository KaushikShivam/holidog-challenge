import React from 'react';
import PropTypes from 'prop-types';

const FormSelect = ({ valid, error, authors, fieldProps, ...otherProps }) => {
  return (
    <div className="FormSelect mb-sm">
      {error && <span>{error}</span>}
      <select
        className={`${
          typeof valid === 'boolean' ? (valid ? 'valid' : 'invalid') : ''
        }`}
        name="author"
        title="Select Author"
        {...otherProps}
        {...fieldProps}
      >
        <option value="">{`${
          authors.length > 0
            ? 'Please select an author'
            : 'Create an author first'
        }`}</option>

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

FormSelect.propTypes = {
  valid: PropTypes.bool,
  error: PropTypes.string,
  authors: PropTypes.array,
};

export default FormSelect;
