import React from 'react';
import { useFormik } from 'formik';

import FormInput from './../FormInput/FormInput';
import CustomButton from './../CustomButton/CustomButton';

const AuthorForm = ({ existingAuthor, handleSubmit, handleClose }) => {
  const validate = ({ firstName, lastName }) => {
    const errors = {};
    if (!firstName) errors.firstName = 'Enter Author First Name';
    if (!lastName) errors.lastName = 'Enter Author Last Name';
    return errors;
  };

  const formik = useFormik({
    initialValues: existingAuthor
      ? { ...existingAuthor }
      : { firstName: '', lastName: '' },
    validate,
    onSubmit: (values) => {
      if (existingAuthor) {
        handleSubmit(values, true, existingAuthor.id);
      } else {
        handleSubmit(values);
      }
    },
  });

  return (
    <div className="AuthorForm">
      <div className="AuthorForm__container">
        <div className="FormCard">
          <h2 className="heading-2 color-blue mb-lg">
            {`${existingAuthor ? 'Edit' : 'Create'} Author`}
          </h2>
          <form className="FormCard__form mb-lg" onSubmit={formik.handleSubmit}>
            <FormInput
              name="firstName"
              fieldProps={formik.getFieldProps('firstName')}
              valid={formik.touched.firstName && !formik.errors.firstName}
              placeholder="Author First Name"
              error={formik.errors.firstName}
              type="text"
            />
            <FormInput
              name="lastName"
              fieldProps={formik.getFieldProps('lastName')}
              valid={formik.touched.lastName && !formik.errors.lastName}
              placeholder="Author First Name"
              error={formik.errors.lastName}
              type="text"
            />
            <CustomButton loading={false} disabled={!formik.isValid}>
              {`${existingAuthor ? 'Save' : 'Create'}`}
            </CustomButton>
            <CustomButton
              style={{ backgroundColor: '#ed4956', marginLeft: '1rem' }}
              loading={false}
              onClick={handleClose}
            >
              Cancel
            </CustomButton>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AuthorForm;
