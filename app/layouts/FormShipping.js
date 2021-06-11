import React, { useState } from 'react';
import PropTypes from 'prop-types';

// * Components
import { useFormik } from 'formik';
import Button from '../components/Button/Button';
import TextInput from '../components/Form/TextInput';

// * Utils
import { isInputError } from '../helpers/GlobalHelper';
import { FormUserShippingSchema } from '../models/FormSchema';
import SelectInput from '../components/Form/SelectInput';
import { provinsi } from '../components/common/assets/provinsi';

const initialValues = {
  shipping_first_name: '',
  shipping_last_name: '',
  shipping_address: '',
  shipping_apartment: '',
  shipping_province: '',
  shipping_city: '',
  shipping_zipcode: '',
  shipping_phone_number: '',
};

export default function FormShipping({ loading, activeIndex, handleSubmit }) {
  const formik = useFormik({
    initialValues,
    validationSchema: FormUserShippingSchema,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  const [dropdownValue, setDropdownValue] = useState();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formik.handleSubmit();
      }}
      className={`form form__shipping ${
        activeIndex === 0 ? '' : 'display-none'
      }`}
    >
      <TextInput
        spacing
        required
        label="First Name"
        id="shipping_first_name"
        name="shipping_first_name"
        onChange={formik.handleChange('shipping_first_name')}
        onBlur={formik.handleBlur('shipping_first_name')}
        error={isInputError(formik, 'shipping_first_name')}
        disabled={loading}
        value={formik.values.shipping_first_name}
      />
      <TextInput
        spacing
        required
        label="Last Name"
        id="shipping_last_name"
        name="shipping_last_name"
        onChange={formik.handleChange('shipping_last_name')}
        onBlur={formik.handleBlur('shipping_last_name')}
        error={isInputError(formik, 'shipping_last_name')}
        disabled={loading}
        value={formik.values.shipping_last_name}
      />
      <TextInput
        spacing
        required
        label="Shipping Address"
        id="shipping_address"
        name="shipping_address"
        onChange={formik.handleChange('shipping_address')}
        onBlur={formik.handleBlur('shipping_address')}
        error={isInputError(formik, 'shipping_address')}
        disabled={loading}
        value={formik.values.shipping_address}
      />
      <TextInput
        spacing
        required
        label="Apartment / Other"
        id="shipping_apartment"
        name="shipping_apartment"
        onChange={formik.handleChange('shipping_apartment')}
        onBlur={formik.handleBlur('shipping_apartment')}
        error={isInputError(formik, 'shipping_apartment')}
        disabled={loading}
        value={formik.values.shipping_apartment}
      />
      <SelectInput
        required
        spacing
        label="Province"
        name="shipping_province"
        id="shipping_province"
        value={dropdownValue}
        error={isInputError(formik, 'shipping_province')}
        onChange={(e) => {
          setDropdownValue(e);
          formik.setFieldValue('shipping_province', e.label);
        }}
        options={provinsi}
      />
      <TextInput
        spacing
        required
        label="City"
        id="shipping_city"
        name="shipping_city"
        onChange={formik.handleChange('shipping_city')}
        onBlur={formik.handleBlur('shipping_city')}
        error={isInputError(formik, 'shipping_city')}
        disabled={loading}
        value={formik.values.shipping_city}
      />
      <TextInput
        spacing
        required
        label="Zip Code"
        id="shipping_zipcode"
        name="shipping_zipcode"
        onChange={formik.handleChange('shipping_zipcode')}
        onBlur={formik.handleBlur('shipping_zipcode')}
        error={isInputError(formik, 'shipping_zipcode')}
        disabled={loading}
        value={formik.values.shipping_zipcode}
      />
      <TextInput
        spacing
        required
        label="Phone Number"
        id="shipping_phone_number"
        name="shipping_phone_number"
        onChange={formik.handleChange('shipping_phone_number')}
        onBlur={formik.handleBlur('shipping_phone_number')}
        error={isInputError(formik, 'shipping_phone_number')}
        disabled={loading}
        value={formik.values.shipping_phone_number}
      />

      <Button
        type="submit"
        className="mt1"
        isLoading={loading}
        disabled={loading}
      >
        next
      </Button>
    </form>
  );
}

FormShipping.propTypes = {
  loading: PropTypes.bool,
  activeIndex: PropTypes.any,
  handleSubmit: PropTypes.func,
};
