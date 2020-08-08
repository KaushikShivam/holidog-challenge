import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
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

import {
  validateName,
  validateEmail,
  validatePassword,
  validateConfirmPassword,
} from './../../utils/validate';

import { signup } from './../../redux/auth/authActions';

import FormInput from './../../components/FormInput/FormInput';
import CustomButton from './../../components/CustomButton/CustomButton';

const SignupPage = ({ currentUser, fetching, signup }) => {
  const history = useHistory();

  useEffect(() => {
    if (currentUser) history.push('/');
  }, [currentUser, history]);

  const validate = ({ name, email, password, confirmPassword }) => {
    const errors = {};
    const nameErr = validateName(name);
    if (nameErr) errors.name = nameErr;

    const emailErr = validateEmail(email);
    if (emailErr) errors.email = emailErr;

    const passwordErr = validatePassword(password);
    if (passwordErr) errors.password = passwordErr;

    const confirmPasswordErr = validateConfirmPassword(
      password,
      confirmPassword
    );
    if (confirmPasswordErr) errors.confirmPassword = confirmPasswordErr;

    return errors;
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validate,
    onSubmit: (values) => signup(values),
  });

  return (
    <main className="SignupPage">
      <div className="FormCard">
        <h1 className="heading-2 color-blue mb-sm">
          Create your account to manage your books
        </h1>
        <form className="FormCard__form mb-lg" onSubmit={formik.handleSubmit}>
          <FormInput
            name="name"
            fieldProps={formik.getFieldProps('name')}
            valid={formik.touched.name && !formik.errors.name}
            error={formik.errors.name}
            placeholder="Full Name"
            type="text"
          />
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
          <FormInput
            name="confirmPassword"
            fieldProps={formik.getFieldProps('confirmPassword')}
            placeholder="Confirm Password"
            valid={
              formik.touched.confirmPassword && !formik.errors.confirmPassword
            }
            error={formik.errors.confirmPassword}
            type="password"
          />

          <CustomButton
            loading={fetching}
            disabled={
              Object.keys(formik.touched).length === 0 ? true : !formik.isValid
            }
          >
            Sign Up
          </CustomButton>
        </form>
        <Link className="heading-3 color-blue" to="/login">
          Already have an account? Login here
        </Link>
      </div>
    </main>
  );
};

SignupPage.propTypes = {
  currentUser: PropTypes.object,
  fetching: PropTypes.bool.isRequired,
  signup: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  fetching: selectFetching,
  error: selectError,
});

const mapDispatchToProps = (dispatch) => ({
  signup: (formData) => dispatch(signup(formData)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SignupPage);
