import React, { useEffect, Suspense, lazy, Fragment } from 'react';
import PropTypes from 'prop-types';
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
const AuthorPage = lazy(() => import('./../../pages/AuthorPage/AuthorPage'));
const AuthorDetailPage = lazy(() =>
  import('./../../pages/AuthorDetailPage/AuthorDetailPage')
);
const BookPage = lazy(() => import('./../../pages/BookPage/BookPage'));
const BookDetailPage = lazy(() =>
  import('./../../pages/BookDetailPage/BookDetailPage')
);
const NotFoundPage = lazy(() =>
  import('./../../pages/NotFoundPage/NotFoundPage')
);

export const App = ({ currentUser, token, alerts, loadUser }) => {
  useEffect(() => {
    setAuthToken(localStorage.jwt);
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
          <AuthRoute exact path="/" component={BookPage} />
          <AuthRoute exact path="/authors" component={AuthorPage} />
          <AuthRoute path="/authors/:authorId" component={AuthorDetailPage} />
          <AuthRoute exact path="/books" component={BookPage} />
          <AuthRoute path="/books/:bookId" component={BookDetailPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </Fragment>
    );
  };

  return (
    <div className="App" data-test="component-app">
      <Suspense fallback={<LoadingPage />}>{renderApp()}</Suspense>
    </div>
  );
};

App.propTypes = {
  currentUser: PropTypes.object,
  token: PropTypes.string,
  alerts: PropTypes.array.isRequired,
  loadUser: PropTypes.func.isRequired,
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
