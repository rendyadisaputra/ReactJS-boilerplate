import React from 'react';

import PropTypes from 'prop-types';

// * Components
import { useFormik } from 'formik';
import Button from '../components/Button/Button';
import TextInput from '../components/Form/TextInput';

// * Helpers
import { isInputError } from '../helpers/GlobalHelper';
import { FormResetPasswordSchema } from '../models/FormSchema';

const initialValues = {
  password: '',
};

export default function FormResetPassword(props) {
  const formik = useFormik({
    initialValues,
    validationSchema: FormResetPasswordSchema,
    onSubmit: (value) => {
      props.handleSubmit(value);
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      className="pr2 pl2 pt3 pb3"
    >
 
      <TextInput
        required
        id="password"
        name="password"
        type="password"
        label="New Password"
        disabled={props.loading}
        onChange={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        error={isInputError(formik, 'password')}
        value={formik.values.password}
        className="mb3"
      />
      <div className="d-flex justify-content-center">
        <Button
          type="submit"
          isLoading={props.loading}
          disabled={props.loading}
        >
          Submit
        </Button>
      </div>
    </form>
  );
}

FormResetPassword.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
};
