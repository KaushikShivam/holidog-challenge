import React from 'react';

const CustomButton = ({ children, onClick, disabled, loading }) => {
  return (
    <button
      className={`CustomButton ${disabled && 'CustomButton--disabled'}`}
      onClick={loading ? () => {} : onClick}
      type={disabled ? 'button' : 'submit'}
      disabled={disabled ? true : false}
    >
      {loading ? 'Loading...' : children}
    </button>
  );
};

export default CustomButton;
