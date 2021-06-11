import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { sentEmailRequest } from './actions';
import { makeSelectLoading } from './selectors';

// * Assets
import PlusBigIcon from '../../components/common/assets/icons/plusBig.svg';
import FormForgetPassword from '../../layouts/FormForgetPassword';

const key = 'data';

function ForgetPasswordPage({ loading, sentEmail }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const handleSubmit = (value) => {
    sentEmail(value);
  };

  return (
    <div className="login-page">
      <Helmet>
        <title>Forget Password</title>
        <meta
          name="description"
          content="Login page of mySkin Web Application"
        />
      </Helmet>
      <div className="content">
        <section className="forget-password-form">
          <div className="d-flex login-form__header">
            <span className="icon-plus">
              <PlusBigIcon />
            </span>
            <div className="title-header">
              <h2 className="title text-white u-margin-bottom-small">
                Forget Password?
              </h2>
              <p className="text-white size20 fw300">
                Send your email address to recover your password
              </p>
            </div>
          </div>

          <div className="card card-myskin container-myskin u-margin-top-big u-margin-bottom-medium">
            <FormForgetPassword handleSubmit={handleSubmit} loading={loading} />
          </div>
        </section>
      </div>
    </div>
  );
}

ForgetPasswordPage.propTypes = {
  loading: PropTypes.bool,
  sentEmail: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    sentEmail: (payload) => dispatch(sentEmailRequest(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ForgetPasswordPage);
