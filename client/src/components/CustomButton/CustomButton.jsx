import React from 'react';

const CustomButton = ({ children, onClick, disabled, loading, style }) => {
  return (
    <button
      style={{ ...style }}
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
