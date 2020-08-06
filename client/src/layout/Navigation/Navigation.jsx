import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { logout } from './../../redux/auth/authActions';

import CustomButton from './../../components/CustomButton/CustomButton';

const Navigation = ({ logout }) => {
  return (
    <div className="Navigation">
      <div className="Navigation__left">
        <h1 className="heading-1 color-blue">BookShelf</h1>
        <Link className="Navigation__link link" to="/">
          Books
        </Link>
        <Link className="Navigation__link" to="/authors">
          Authors
        </Link>
      </div>
      <CustomButton onClick={logout}>Log out</CustomButton>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  logout: () => dispatch(logout()),
});
export default connect(null, mapDispatchToProps)(Navigation);
