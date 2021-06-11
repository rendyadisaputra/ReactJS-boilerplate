/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import PropTypes from 'prop-types';
import { useFormik } from 'formik';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { accountDetailRequest, updateProfileRequest } from './actions';
import saga from './saga';
import reducer from './reducer';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import {
  makeSelectIsSuccess,
  makeSelectLoading,
  makeSelectUserData,
} from './selector';

// * Components
import TextInput from '../../components/Form/TextInput';
import HeaderTitle from '../../components/Header/HeaderTitle';
import FormPayment from '../../layouts/FormPayment';
import Button from '../../components/Button/Button';

// * Utils
import { removeCookie } from '../../utils/cookie';
import { isInputError } from '../../helpers/GlobalHelper';
import LoaderModal from '../../components/Loader/LoaderModal';
import { FormUserAccountSchema } from '../../models/FormSchema';

const key = 'userData';

function Account({
  loading,
  isSuccess,
  userData,
  getAccountDetail,
  updateProfile,
}) {
  const formik = useFormik({
    validationSchema: FormUserAccountSchema,
    initialValues: {
      user_email: '',
      user_phone_number: '',
      user_address: '',
    },
    onSubmit: (values) => {},
  });

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [loadingVisible, setLoadingVisible] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      console.log(" user Data ", userData)
      formik.setValues({
        user_email: userData.user_email,
        user_address: userData.user_address?.shipping_address,
        user_phone_number: userData.user_phone_number,
      });
    }
  }, [isSuccess]);

  useEffect(() => {
    getAccountDetail();
  }, []);

  const handleUpdate = (type) => {
    formik.handleSubmit();

    return new Promise((resolve, reject) => {
      if (formik.isValid) {
        const payload = {
          [type]: formik.values[type],
        };
        updateProfile(payload);
        resolve(true);
      } else {
        setLoadingVisible(false);
        reject(new Error('Form is not valid'));
      }
    });
  };

  return (
    <article>
      <Helmet>
        <title>Account Settings</title>
        <meta name="description" content="mySkin Account Page" />
      </Helmet>

      <div className="content">
        <HeaderTitle title="Account Info" />
        <section className="account-settings container-myskin pt5 pb5">
          <div className="u-margin-bottom-huge">
            <h2 className="pt-serif bold size22 mb2">Login Info</h2>
            <TextInput
              bordered
              name="user_email"
              type="email"
              className="mb2"
              label="Email"
              value={formik.values.user_email}
              onChange={formik.handleChange}
              error={isInputError(formik, 'user_email')}
              onSave={() => handleUpdate('user_email')}
            />
            
          </div>

          <div className="u-margin-bottom-huge">
            <h2 className="pt-serif bold size22 mb2">Phone Number</h2>
            <TextInput
              bordered
              label="Phone Number"
              name="user_phone_number"
              value={formik.values.user_phone_number}
              onChange={formik.handleChange}
              error={isInputError(formik, 'user_phone_number')}
              onSave={() => handleUpdate('user_phone_number')}
            />
          </div>

          <div className="u-margin-bottom-huge">
            <h2 className="pt-serif bold size22 mb2">Shipping Address</h2>
            <TextInput
              bordered
              multiline
              editDisabled
              name="user_address"
              value={formik.values.user_address}
              onChange={formik.handleChange}
            />
          </div>

          {/* <div className="u-margin-bottom-huge">
            <h2 className="pt-serif bold size22 mb1">Payment</h2>
            <div className="card card-myskin card-form">
              <div className="pr2 pl2 pt2 pb3">
                <FormPayment />
              </div>
            </div>
          </div> */}

          <div>
            <Button
              onClick={() => {
                removeCookie('secret');
                window.location.replace('/');
              }}
            >
              Logout
            </Button>
          </div>
        </section>

        <LoaderModal loading={loadingVisible} />
      </div>
    </article>
  );
}

Account.propTypes = {
  userData: PropTypes.object,
  loading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  getAccountDetail: PropTypes.func,
  updateProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  loading: makeSelectLoading(),
  isSuccess: makeSelectIsSuccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getAccountDetail: () => dispatch(accountDetailRequest()),
    updateProfile: (payload) => dispatch(updateProfileRequest(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Account);
