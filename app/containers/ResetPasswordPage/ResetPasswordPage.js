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
import { resetPasswordRequest } from './actions';
import { makeSelectLoading } from './selectors';

// * Assets
import PlusBigIcon from '../../components/common/assets/icons/plusBig.svg';
import FormResetPassword from '../../layouts/FormResetPassword';
import { useQuery } from '../../helpers/GlobalHelper';

const key = 'data';

function ResetPasswordPage({ loading, resetPasswordReq }) {
  // * Hooks
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const query = useQuery();

  const url = window.location.href;
  const tokenIndex = url.search('token=');

  // * Services
  const handleSubmit = (value) => {
    const token = url.slice(tokenIndex + 6);

    const payload = {
      id: query.id,
      token,
      ...value,
    };

    resetPasswordReq(payload);
  };

  if (!query?.id && !query?.token) {
    return window.location.replace('/404');
  }

  return (
    <div className="login-page">
      <Helmet>
        <title>Reset Password</title>
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
                Reset Password
              </h2>
              <p className="text-white size20 fw300">
                Please input your new password below
              </p>
            </div>
          </div>

          <div className="card card-myskin container-myskin u-margin-top-big u-margin-bottom-medium">
            <FormResetPassword handleSubmit={handleSubmit} loading={loading} />
          </div>
        </section>
      </div>
    </div>
  );
}

ResetPasswordPage.propTypes = {
  loading: PropTypes.bool,
  resetPasswordReq: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
});

function mapDispatchToProps(dispatch) {
  return {
    resetPasswordReq: (payload) => dispatch(resetPasswordRequest(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ResetPasswordPage);
