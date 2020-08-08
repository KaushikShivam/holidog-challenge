import React from 'react';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

import FormInput from './../FormInput/FormInput';
import CustomButton from './../CustomButton/CustomButton';
import FormSelect from './../FormSelect/FormSelect';

const BookForm = ({ existingBook, handleSubmit, handleClose, authors }) => {
  const validate = ({ name, isbn, author }) => {
    const errors = {};
    if (!name) errors.name = 'Enter Book Name';
    if (!isbn) errors.isbn = 'Enter Book ISBN';
    if (!author) errors.author = 'Select the Author';
    return errors;
  };

  const formik = useFormik({
    initialValues: existingBook
      ? { ...existingBook, author: existingBook.author.id }
      : { name: '', isbn: '', author: '' },
    validate,
    onSubmit: (values) => {
      if (existingBook) {
        handleSubmit(values, true, existingBook.id);
      } else {
        handleSubmit(values);
      }
    },
  });

  return (
    <div className="BookForm">
      <div className="BookForm__container">
        <div className="FormCard">
          <h2 className="heading-2 color-blue mb-lg">
            {`${existingBook ? 'Edit' : 'Create'} Book`}
          </h2>
          <form className="FormCard__form mb-lg" onSubmit={formik.handleSubmit}>
            <FormInput
              name="name"
              fieldProps={formik.getFieldProps('name')}
              valid={formik.touched.name && !formik.errors.name}
              placeholder="Book Name"
              error={formik.errors.name}
              type="text"
            />
            <FormInput
              name="isbn"
              fieldProps={formik.getFieldProps('isbn')}
              valid={formik.touched.isbn && !formik.errors.isbn}
              placeholder="Book ISBN"
              error={formik.errors.isbn}
              type="text"
            />
            <FormSelect
              authors={authors}
              name="author"
              fieldProps={formik.getFieldProps('author')}
              valid={formik.touched.author && !formik.errors.author}
              error={formik.errors.author}
            />
            <CustomButton loading={false} disabled={!formik.isValid}>
              {`${existingBook ? 'Save' : 'Create'}`}
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

BookForm.propTypes = {
  author: PropTypes.array.isRequired,
  existingBook: PropTypes.object,
  handleSubmit: PropTypes.func.isRequired,
  handleClose: PropTypes.func.isRequired,
};

export default BookForm;
