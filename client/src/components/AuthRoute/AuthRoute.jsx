import React from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import { selectToken } from './../../redux/auth/authSelectors';

const ProtectedRoute = ({ token, children, ...props }) => {
  return (
    <Route {...props}>{token ? children : <Redirect to="/login" />}</Route>
  );
};

const mapStateToProps = createStructuredSelector({
  token: selectToken,
});

export default connect(mapStateToProps)(ProtectedRoute);
