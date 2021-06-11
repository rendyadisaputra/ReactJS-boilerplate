/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
import { useLocation } from 'react-router';

import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';
import moment from 'moment';

// Redux
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import {
  makeSelectError,
  makeSelectIsError,
  makeSelectLoading,
  makeSelectDiagnose,
  makeSelectCareOption,
  makeSelectIsSuccess,
  makeSelectTransaction,
  makeSelectAccountDetail,
  makeSelectDermatologist,
  makeSelectIsSuccessVidCall,
} from './selectors';
import {
  createAccountRequest,
  getDiagnoseIdRequest,
  getCareOptionRequest,
  postCareOptionVidcallRequest,
  postCareOptionProductRequest,
  postUserShippingRequest,
  createPaymentRequest,
  accountDetailRequest,
  getDermatologistRequest,
} from './actions';

// Components
import HeaderGradient from '../../components/Header/HeaderGradient';
import Stepper from '../../components/Form/Stepper';
import FormCreateAccount from '../../layouts/FormCreateAccount';

import {
  createAccountHeading,
  StepperCreateAccount,
} from '../../helpers/GlobalConstant';

import PlusBigIcon from '../../components/common/assets/icons/plusBig.svg';
import SelectCareOption from '../../layouts/SelectCareOption';
import { getCookie } from '../../utils/cookie';
import BookingAppointment from '../../layouts/BookingAppointment';
import HeaderTitle from '../../components/Header/HeaderTitle';
import PurchaseProcess from '../../layouts/PurchaseProcess';
import LoaderModal from '../../components/Loader/LoaderModal';
import Button from '../../components/Button/Button';

const key = 'userData';

const pageTitle = ['Create Account Page', 'Service Selection Page'];

function CreateAccount({
  loading,
  error,
  isError,
  transaction,
  isSuccess,
  isSuccessVidcall,
  diagnose,
  careOption,
  accountDetail,
  dermatologist,
  getDiagnose,
  getCareOption,
  saveBookingAppointment,
  saveUserShipping,
  createPurchaseProduct,
  createAccountReq,
  createPayment,
  getAccountDetail,
  getDermatologist,
}) {
  const data = getCookie('secret');
  const isLogin = data ? JSON.parse(data).token : null;

  // * Hooks
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const location = useLocation();

  const [activeIndex, setActiveIndex] = useState(
    location.state?.activeIndex ?? -1,
  );
  const [headerTitle, setHeaderTitle] = useState();
  const [loadingModal, setLoadingModal] = useState(false);
  const [price, setPrice] = useState(0);
  const [productName, setProductName] = useState('');
  const [careId, setCareId] = useState();
  const [isVideoCall, setIsVideoCall] = useState();
  const [dateVidCall, setDateVidCall] = useState('');
  const [timeVidCall, setTimeVidCall] = useState('');

  useEffect(() => {
    if (isLogin) {
      getDiagnose();
      getCareOption();
      getAccountDetail();
    }
  }, []);

  useEffect(() => {
    if (isSuccessVidcall && isVideoCall) {
      setActiveIndex(2);
      setHeaderTitle('Checkout');
    }
  }, [isSuccessVidcall]);

  useEffect(() => {
    if (transaction) {
      setLoadingModal(true);
      const { transaction_id } = transaction.transaction;
      const payload = {
        transaction_id,
      };
      createPayment(payload);
      setTimeout(() => {
        setLoadingModal(false);
      }, 1000);
    }
  }, [transaction]);

  useEffect(() => {
    if (isLogin) {
      if (dateVidCall.length > 0 && timeVidCall.length > 0) {
        getDermatologist(`${dateVidCall} ${timeVidCall}`);
      } else {
        getDermatologist(dateVidCall);
      }
    }
  }, [dateVidCall, timeVidCall]);

  // * Services
  const handleSubmit = (value) => {
    createAccountReq(value);
  };

  const handleClickVideoCall = (item) => {
    setCareId(item.care_id);
    setPrice(item.care_price);
    setProductName(item.care_name);
    setHeaderTitle('Book Your Appointment');
    setIsVideoCall(item.is_video_call);
  };

  const handleClickProduct = (item) => {
    setActiveIndex(2);
    setPrice(item.care_price);
    setProductName(item.care_name);
    setHeaderTitle('Checkout');
    setCareId(item.care_id);
  };

  const handleBooking = (date, time, userId) => {
    const dateTime = `${moment(date).format('YYYY-MM-DD')} ${moment(
      time,
    ).format('HH:mm:ss')}`;

    const payload = {
      date_video_call: dateTime,
      diagnose_id: String(diagnose.diagnose_id),
      doctor_id: String(userId),
    };

    saveBookingAppointment(payload);
  };

  const handleUserShipping = (values) => {
    saveUserShipping(values);
  };

  const handleConfirmOrder = () => {
    createPurchaseProduct({
      care_id: careId,
      diagnose_id: diagnose.diagnose_id,
    });
  };

  const renderContent = () => {
    if (activeIndex === 0) {
      return renderLayout();
    }

    if (activeIndex > 0 && diagnose?.diagnose_id) {
      return renderLayout();
    }

    return (
      <div className="container-myskin pb5 pt5 h100">
        <h2>Sorry you don&rsquo;t have access here</h2>
        <Button className="mt3" onClick={() => window.location.replace('/')}>
          Back Home
        </Button>
      </div>
    );
  };

  const renderLayout = () => {
    switch (activeIndex) {
      case 0:
        return (
          <div className="card card-myskin card-form container-myskin u-margin-top-medium u-margin-bottom-medium">
            <FormCreateAccount
              isError={isError}
              loading={loading}
              onSubmit={handleSubmit}
              errorStatus={error && error.response.status}
            />
          </div>
        );
      case 1:
        if (headerTitle) {
          return (
            <BookingAppointment
              onConfirm={handleBooking}
              handleChangeDate={(val) =>
                setDateVidCall(moment(val).format('YYYY-MM-DD'))
              }
              handleChangeTime={(val) =>
                setTimeVidCall(moment(val).format('HH:mm:ss'))
              }
              dermatologist={dermatologist}
            />
          );
        }
        return (
          <SelectCareOption
            data={careOption}
            loading={loading}
            onPurchaseClick={handleClickProduct}
            onVideoCallClick={handleClickVideoCall}
          />
        );
      case 2:
        return (
          <PurchaseProcess
            {...{
              price,
              productName,
              loading,
              handleUserShipping,
              handleConfirmOrder,
              isSuccess,
              accountDetail,
              isVideoCall,
            }}
          />
        );
      default:
        if (isLogin) {
          return <SelectCareOption />;
        }

        return (
          <div className="card card-myskin card-form container-myskin u-margin-top-medium u-margin-bottom-medium">
            <FormCreateAccount
              isError={isError}
              loading={loading}
              onSubmit={handleSubmit}
              errorStatus={error && error.response.status}
            />
          </div>
        );
    }
  };

  return (
    <article>
      <Helmet>
        <title>{pageTitle[activeIndex]}</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>

      <div className="create-account content">
        {activeIndex >= 0 ? (
          <>
            <section className="form">
              {headerTitle ? (
                <HeaderTitle title={headerTitle} />
              ) : (
                <HeaderGradient>
                  <div className="banner">
                    <div className="plus">
                      <PlusBigIcon />
                      <div className="banner__text">
                        <h1 className="pt-serif bold text-white u-margin-bottom-small">
                          {createAccountHeading[activeIndex].title}
                        </h1>
                        <p className="text-white size20 fw300">
                          {createAccountHeading[activeIndex].subTitle}
                        </p>
                      </div>
                    </div>
                  </div>
                </HeaderGradient>
              )}

              <div className="create-account__step bg-white pr5 pl5 pb2 pt3">
                <p className="pt-serif text-center size17 u-margin-bottom-small">
                  Order Process
                </p>

                <Stepper
                  step={StepperCreateAccount}
                  activeIndex={activeIndex}
                />
              </div>

              {renderContent()}
            </section>
          </>
        ) : (
          <div className="container-myskin pb5 pt5 h100">
            <h2>Sorry you don&rsquo;t have access here</h2>
            <Button
              className="mt3"
              onClick={() => window.location.replace('/')}
            >
              Back Home
            </Button>
          </div>
        )}

        <LoaderModal loading={loadingModal} />
      </div>
    </article>
  );
}

CreateAccount.propTypes = {
  loading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isSuccessVidcall: PropTypes.bool,
  isError: PropTypes.any,
  error: PropTypes.any,
  transaction: PropTypes.any,
  accountDetail: PropTypes.any,
  dermatologist: PropTypes.any,
  diagnose: PropTypes.object,
  careOption: PropTypes.array,
  getDiagnose: PropTypes.func,
  getCareOption: PropTypes.func,
  createAccountReq: PropTypes.func,
  saveBookingAppointment: PropTypes.func,
  saveUserShipping: PropTypes.func,
  createPurchaseProduct: PropTypes.func,
  createPayment: PropTypes.func,
  getAccountDetail: PropTypes.func,
  getDermatologist: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  isError: makeSelectIsError(),
  isSuccess: makeSelectIsSuccess(),
  error: makeSelectError(),
  diagnose: makeSelectDiagnose(),
  careOption: makeSelectCareOption(),
  transaction: makeSelectTransaction(),
  accountDetail: makeSelectAccountDetail(),
  dermatologist: makeSelectDermatologist(),
  isSuccessVidcall: makeSelectIsSuccessVidCall(),
});

export function mapDispatchToProps(dispatch) {
  return {
    createAccountReq: (payload) => dispatch(createAccountRequest(payload)),
    getDiagnose: () => dispatch(getDiagnoseIdRequest()),
    getCareOption: () => dispatch(getCareOptionRequest()),
    saveBookingAppointment: (payload) =>
      dispatch(postCareOptionVidcallRequest(payload)),
    saveUserShipping: (payload) => dispatch(postUserShippingRequest(payload)),
    createPurchaseProduct: (payload) =>
      dispatch(postCareOptionProductRequest(payload)),
    createPayment: (payload) => dispatch(createPaymentRequest(payload)),
    getAccountDetail: () => dispatch(accountDetailRequest()),
    getDermatologist: (date) => dispatch(getDermatologistRequest(date)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CreateAccount);
