import React from 'react';

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

export default FormInput;
