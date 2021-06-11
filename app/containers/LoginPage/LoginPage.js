import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectLoading } from './selectors';
import reducer from './reducer';
import saga from './saga';
import { loginRequest } from './actions';
import { useInjectSaga } from '../../utils/injectSaga';
import { useInjectReducer } from '../../utils/injectReducer';

import PlusBigIcon from '../../components/common/assets/icons/plusBig.svg';

import FormLogin from '../../layouts/FormLogin';

const key = 'userData';

function LoginPage({ loading, loginReq }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  // console.log("WHAT IS", loginReq);
  const handleSubmit = (value) => {
    loginReq(value);
  };

  return (
    <div className="login-page">
      <Helmet>
        <title>Login Page </title>
        <meta
          name="description"
          content="Login page of mySkin Web Application"
        />
      </Helmet>
      <div className="content">
        <section className="login-form">
          <div className="d-flex login-form__header">
            <span className="icon-plus">
              <PlusBigIcon />
            </span>
            <div className="title">
              <h2 className="pt-serif bold text-white">Sign in to an</h2>
              <span className="pt-serif bold text-white">existing account</span>
            </div>
          </div>

          <div className="card card-myskin container-myskin u-margin-top-medium u-margin-bottom-medium">
            <FormLogin handleSubmit={handleSubmit} loading={loading} />
          </div>
        </section>
      </div>
    </div>
  );
}

LoginPage.propTypes = {
  loadingParam: PropTypes.bool, //loading
  loginReqParam: PropTypes.func, //loginReq Function
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    loginReq: (payload) => dispatch(loginRequest(payload)),
  };
}


const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(LoginPage);
