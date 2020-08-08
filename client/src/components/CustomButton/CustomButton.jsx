import React from 'react';
import PropTypes from 'prop-types';

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

CustomButton.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
  onClick: PropTypes.func,
  loading: PropTypes.bool,
  disabled: PropTypes.bool,
  style: PropTypes.object,
};

export default CustomButton;
