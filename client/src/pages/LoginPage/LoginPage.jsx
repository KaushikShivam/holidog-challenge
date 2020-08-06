import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { useHistory } from 'react-router-dom';
import { useFormik } from 'formik';
import { Link } from 'react-router-dom';

import {
  selectCurrentUser,
  selectFetching,
  selectError,
} from './../../redux/auth/authSelectors';

import { validateEmail, validatePassword } from './../../utils/validate';

import { login } from './../../redux/auth/authActions';

import FormInput from './../../components/FormInput/FormInput';
import CustomButton from './../../components/CustomButton/CustomButton';

const LoginPage = ({ currentUser, fetching, login }) => {
  const history = useHistory();

  useEffect(() => {
    if (currentUser) history.push('/');
  }, [currentUser, history]);

  const validate = ({ email, password }) => {
    const errors = {};

    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    const passwordErr = validatePassword(password);
    if (passwordErr) errors.password = passwordErr;

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate,
    onSubmit: (values) => login(values),
  });

  return (
    <main className="SignupPage">
      <div className="FormCard">
        <h1 className="heading-2 color-blue mb-sm">
          Login to your account to manage your books
        </h1>
        <form className="FormCard__form mb-lg" onSubmit={formik.handleSubmit}>
          <FormInput
            name="email"
            fieldProps={formik.getFieldProps('email')}
            valid={formik.touched.email && !formik.errors.email}
            placeholder="Email address"
            error={formik.errors.email}
            type="email"
          />
          <FormInput
            name="password"
            fieldProps={formik.getFieldProps('password')}
            placeholder="Password"
            valid={formik.touched.password && !formik.errors.password}
            error={formik.errors.password}
            type="password"
          />

          <CustomButton
            loading={fetching}
            disabled={
              Object.keys(formik.touched).length === 0 ? true : !formik.isValid
            }
          >
            Login
          </CustomButton>
        </form>
        <Link className="heading-3 color-blue" to="/signup">
          No Account? Sign up here
        </Link>
      </div>
    </main>
  );
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  fetching: selectFetching,
  error: selectError,
});

const mapDispatchToProps = (dispatch) => ({
  login: (formData) => dispatch(login(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage);
