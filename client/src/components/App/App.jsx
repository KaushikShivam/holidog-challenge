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

import { setAuthToken } from './../../services/utils';

import AuthRoute from './../../components/AuthRoute/AuthRoute';
import Navigation from './../../layout/Navigation/Navigation';

import LoadingPage from './../../pages/LoadingPage/LoadingPage';
const SignupPage = lazy(() => import('./../../pages/SignupPage/SignupPage'));
const LoginPage = lazy(() => import('./../../pages/LoginPage/LoginPage'));
const HomePage = lazy(() => import('./../../pages/HomePage/HomePage'));
const AuthorPage = lazy(() => import('./../../pages/AuthorPage/AuthorPage'));

if (localStorage.jwt) {
  setAuthToken(localStorage.jwt);
}

const App = ({ currentUser, token, alerts, loadUser }) => {
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
    });
  }

  const renderApp = () => {
    if (!currentUser && token) {
      return <LoadingPage />;
    }
    return (
      <Fragment>
        {currentUser && <Navigation />}
        <ToastContainer />
        <Switch>
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignupPage} />
          <AuthRoute path="/" component={HomePage} />
          <AuthRoute path="/authors" component={AuthorPage} />
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
});
export default connect(mapStateToProps, mapDispatchToProps)(App);
