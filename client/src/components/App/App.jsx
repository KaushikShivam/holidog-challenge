import React, { useEffect, Suspense, lazy, Fragment } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import {
  selectCurrentUser,
  selectToken,
} from './../../redux/auth/authSelectors';
import { selectAlert } from './../../redux/alert/alertSelectors';

import { loadUser } from './../../redux/auth/authActions';
import { removeAlert } from './../../redux/alert/alertActions';

import { setAuthToken } from './../../services/utils';

import AuthRoute from './../../components/AuthRoute/AuthRoute';

import LoadingPage from './../../pages/LoadingPage/LoadingPage';
const SignupPage = lazy(() => import('./../../pages/SignupPage/SignupPage'));
const LoginPage = lazy(() => import('./../../pages/LoginPage/LoginPage'));
const HomePage = lazy(() => import('./../../pages/HomePage/HomePage'));

if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
}

const App = ({ currentUser, token, alerts, removeAlert, loadUser }) => {
  useEffect(() => {
    loadUser();
  }, [loadUser]);

  if (alerts.length > 0) {
    alerts.forEach(({ msg, id }) => {
      toast.error(msg, {
        position: 'top-right',
        autoClose: 2000,
        closeOnClick: true,
      });
      removeAlert(id);
    });
  }

  const renderApp = () => {
    if (!currentUser && token) {
      return <LoadingPage />;
    }
    return (
      <Fragment>
        <ToastContainer />

        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <AuthRoute path="/" component={HomePage} />
        </Switch>
      </Fragment>
    );
  };

  return (
    <div className="App">
      <Suspense fallback={<LoadingPage />}>{renderApp()}</Suspense>
    </div>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  token: selectToken,
  alerts: selectAlert,
});

const mapDispatchToProps = (dispatch) => ({
  loadUser: () => dispatch(loadUser()),
  removeAlert: (id) => dispatch(removeAlert(id)),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
