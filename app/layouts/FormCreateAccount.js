import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { useFormik } from 'formik';
import { FormCreateAccountSchema } from '../models/FormSchema';
import TextInput from '../components/Form/TextInput';
import { isInputError } from '../helpers/GlobalHelper';
import Button from '../components/Button/Button';

const initialValues = {
  user_email: '',
  user_password: '',
  user_first_name: '',
  user_last_name: '',
  user_phone_number: undefined,
  user_referral: undefined,
};

export default function FormCreateAccount(props) {
  const formik = useFormik({
    initialValues,
    validationSchema: FormCreateAccountSchema,
    onSubmit: (values) => {
      props.onSubmit(values);
    },
  });

  useEffect(() => {
    if (props.isError) {
      if (props.errorStatus === 500 || props.errorStatus === 400) {
        formik.setFieldValue('user_email', '');
      }
    }
  }, [props.isError, props.errorStatus]);

  return (
    <form
      className="pr2 pl2 pt3 pb3"
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
    >
      <TextInput
        spacing
        required
        disabled={props.loading}
        name="user_first_name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.user_first_name}
        label="Nama depan"
        id="firstName"
        error={isInputError(formik, 'user_first_name')}
      />
      <TextInput
        spacing
        required
        disabled={props.loading}
        name="user_last_name"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.user_last_name}
        label="Nama belakang"
        id="lastName"
        error={isInputError(formik, 'user_last_name')}
      />
      <TextInput
        spacing
        required
        disabled={props.loading}
        name="user_email"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.user_email}
        type="email"
        label="Alamat email"
        id="email"
        error={isInputError(formik, 'user_email')}
      />
      <TextInput
        spacing
        required
        disabled={props.loading}
        name="user_phone_number"
        onChange={formik.handleChange}
        maxLength="16"
        onBlur={formik.handleBlur}
        value={formik.values.user_phone_number}
        type="number"
        label="Nomor handphone"
        id="phoneNumber"
        error={isInputError(formik, 'user_phone_number')}
      />
      <TextInput
        spacing
        required
        disabled={props.loading}
        name="user_password"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.user_password}
        label="Kata sandi"
        id="password"
        error={isInputError(formik, 'user_password')}
      />
      <TextInput
        spacing
        maxLength={6}
        disabled={props.loading}
        name="user_referral"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.user_referral}
        label="Kode Referral (optional)"
        id="referral"
        error={isInputError(formik, 'user_referral')}
      />
      <Button
        isLoading={props.loading}
        disabled={props.loading}
        type="submit"
        className="u-margin-top-small"
      >
        Get started
      </Button>
    </form>
  );
}

FormCreateAccount.propTypes = {
  loading: PropTypes.bool,
  onSubmit: PropTypes.func,
  isError: PropTypes.bool,
  errorStatus: PropTypes.number,
};
