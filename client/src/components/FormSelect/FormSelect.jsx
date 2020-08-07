import React from 'react';

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
        <option value="">Please select the Author</option>

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

export default FormSelect;
