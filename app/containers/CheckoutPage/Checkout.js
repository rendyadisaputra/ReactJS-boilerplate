/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useFormik } from 'formik';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { accountDetailRequest, updateProfileRequest , provincesListRequest } from './actions';
import saga from './saga';
import reducer from './reducer';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import {
  makeSelectIsSuccess,
  makeSelectLoading,
  makeSelectUserData,
  makeSelectProvinces
} from './selector';

// * Components
import TextInput from '../../components/Form/TextInput';
import SelectInput from '../../components/Form/SelectInput';
import HeaderTitle from '../../components/Header/HeaderTitle';
import FormPayment from '../../layouts/FormPayment';
import Button from '../../components/Button/Button';
import FormShipping from '../../layouts/FormShipping';

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
  getProvinces,
  provinces,
  updateProfile,
}) {
  const history = useHistory();

  const formik = useFormik({
    validationSchema: FormUserAccountSchema,
    initialValues: {
      user_email: '',
      user_phone_number: '',
      user_address: '',
      shipping_first_name:'',
      shipping_last_name: '',
      shipping_address: '',
      shipping_province:'',
      shipping_city:'',
      shipping_phone_number:''
    },
    onSubmit: (values) => {},
  });

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [loadingVisible, setLoadingVisible] = useState(false);
  const [dropdownValue, setDropdownValue] = useState();
  
  useEffect(() => {
    if (isSuccess) {
      
      let data = {
        user_email: userData.user_email,
        user_address: userData.shipping_address,
        user_phone_number: userData.user_phone_number,
        shipping_first_name: userData.first_name,
        shipping_last_name: userData.last_name,
        shipping_address: userData.shipping_address,
        shipping_province: userData.state,
        shipping_city:userData.city,
        shipping_phone_number:userData.user_phone_number,
      };
      console.log(" user Data ", data)

      formik.setValues(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    getAccountDetail();
    getProvinces();
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
          <div className="u-margin-bottom">
            <h2 className="pt-serif bold size22 mb2">Detail Penerima Barang</h2>
            
          </div>
          <div className="card card-myskin card-form u-margin-top-medium u-margin-bottom-medium">
              <div className="pl25 pr25 pt2 pb1">
                <label className="size18"><strong>Note: </strong></label> <br/>
                <span className="size18">
                 Mohon untuk cek kembali alamat penerimaan Anda, jika sudah benar, silahkan lanjutkan ke proses pembayaran
                </span>
              </div>
            </div>
          <div className="u-margin-bottom-huge">
            <TextInput
              spacing
              required
              label="Nama"
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
              label="Nama Akhir"
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
              multiline={true}
              label="Alamat Pengiriman"
              id="shipping_address"
              name="shipping_address"
              onChange={formik.handleChange('shipping_address')}
              onBlur={formik.handleBlur('shipping_address')}
              error={isInputError(formik, 'shipping_address')}
              disabled={loading}
              value={formik.values.shipping_address}
            />
            
        {
          (()=>{console.log("formik", formik.values); return true})() &&
          formik.values && provinces? 
          <SelectInput
          required
          spacing
          label="Propinsi"
          name="shipping_province"
          id="shipping_province"
          value={provinces.filter( (options) => options.value == formik.values.shipping_province)}
          error={isInputError(formik, 'shipping_province')}
          onChange={(e) => {
            setDropdownValue(e);
            formik.setFieldValue('shipping_province', e.value);
          }}
          options={provinces}
        />
          : <></>
        }
        
        <TextInput
          spacing
          required
          label="Kota"
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
          label="Kode pos"
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
          label="Telp / WA "
          id="shipping_phone_number"
          name="shipping_phone_number"
          onChange={formik.handleChange('shipping_phone_number')}
          onBlur={formik.handleBlur('shipping_phone_number')}
          error={isInputError(formik, 'shipping_phone_number')}
          disabled={loading}
          value={formik.values.shipping_phone_number}
        />
        <div>
          <Button
            onClick={() => {
              history.push('/checkout/payment')
              // Go to Payment Gateway
            }}
          >
            Lanjutkan Pembayaran
          </Button>
        </div>
      </div>
          

          {/* <div className="u-margin-bottom-huge">
            <h2 className="pt-serif bold size22 mb1">Payment</h2>
            <div className="card card-myskin card-form">
              <div className="pr2 pl2 pt2 pb3">
                <FormPayment />
              </div>
            </div>
          </div> */}

          
        </section>

        <LoaderModal loading={loadingVisible} />
      </div>
    </article>
  );
}

Account.propTypes = {
  userData: PropTypes.object,
  loading: PropTypes.bool,
  provinces: PropTypes.array,
  shippingActiveIndex: PropTypes.string,
  handleUserShipping: PropTypes.func,
  isSuccess: PropTypes.bool,
  getAccountDetail: PropTypes.func,
  getProvinces: PropTypes.func,
  updateProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  userData: makeSelectUserData(),
  loading: makeSelectLoading(),
  isSuccess: makeSelectIsSuccess(),
  provinces: makeSelectProvinces()
});

export function mapDispatchToProps(dispatch) {
  return {
    getAccountDetail: () => dispatch(accountDetailRequest()),
    getProvinces: () => dispatch(provincesListRequest()),
    updateProfile: (payload) => dispatch(updateProfileRequest(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Account);
