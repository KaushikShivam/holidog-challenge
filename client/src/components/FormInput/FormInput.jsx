import React from 'react';
import PropTypes from 'prop-types';

const FormInput = ({ valid, error, fieldProps, ...otherProps }) => {
  return (
    <div className="FormInput mb-sm">
      {error && <span>{error}</span>}
      <input
        className={`${
          typeof valid === 'boolean' ? (valid ? 'valid' : 'invalid') : ''
        }`}
        {...otherProps}
        {...fieldProps}
      />
    </div>
  );
};

FormInput.propTypes = {
  valid: PropTypes.bool,
  error: PropTypes.string,
};

export default FormInput;
