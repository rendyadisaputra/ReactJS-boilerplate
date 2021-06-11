import React from 'react';

import PropTypes from 'prop-types';

// * Components
import { useFormik } from 'formik';
import Button from '../components/Button/Button';
import TextInput from '../components/Form/TextInput';

// * Helpers
import { isInputError } from '../helpers/GlobalHelper';
import { FormForgetPasswordSchema } from '../models/FormSchema';

const initialValues = {
  email: '',
};

export default function FormForgetPassword(props) {
  const formik = useFormik({
    initialValues,
    validationSchema: FormForgetPasswordSchema,
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
        spacing
        required
        id="email"
        name="email"
        type="email"
        label="Email"
        disabled={props.loading}
        onChange={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        error={isInputError(formik, 'email')}
        value={formik.values.email}
        className="mb3"
      />
      <div className="d-flex justify-content-center">
        <Button
          type="submit"
          isLoading={props.loading}
          disabled={props.loading}
        >
          SEND ME RECOVERY LINK
        </Button>
      </div>
    </form>
  );
}

FormForgetPassword.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
};
