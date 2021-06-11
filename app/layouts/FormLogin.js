import React from 'react';

import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

// * Components
import { useFormik } from 'formik';
import Button from '../components/Button/Button';
import TextInput from '../components/Form/TextInput';

// * Helpers
import { isInputError } from '../helpers/GlobalHelper';
import { FormLoginSchema } from '../models/FormSchema';
import history from '../utils/history';

const initialValues = {
  email: '',
  password: '',
};

export default function FormLogin(props) {
  const formik = useFormik({
    initialValues,
    validationSchema: FormLoginSchema,
    onSubmit: (value) => {
      console.log(" which one is valued ", value)
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
        id="email"
        name="email"
        type="email"
        label="Email"
        disabled={props.loading}
        onChange={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        error={isInputError(formik, 'email')}
        value={formik.values.email}
      />
      <TextInput
        required
        id="password"
        name="password"
        type="password"
        label="Password"
        disabled={props.loading}
        onChange={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        error={isInputError(formik, 'password')}
        value={formik.values.password}
      />
      <div className="d-flex justify-content-end">
        <Link to="/forget-password" className="size16 btn-text pt1 pb2">
          Lupa Password ?
        </Link>
      </div>
      <div className="d-flex justify-content-center">
        <Button
          type="submit"
          isLoading={props.loading}
          disabled={props.loading}
        >
          Next
        </Button>
      </div>
      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="size16 btn-text pt1 pb2"
          onClick={() =>
            history.push('/create-account', {
              activeIndex: 0,
            })
          }
        >
          Need to create an account? Register here.
        </button>
      </div>
    </form>
  );
}

FormLogin.propTypes = {
  loading: PropTypes.bool,
  handleSubmit: PropTypes.func,
};
