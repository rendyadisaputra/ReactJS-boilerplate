import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';

// * Components
import { Col, Row } from 'reactstrap';
import Swal from 'sweetalert2';
import Skeleton from 'react-loading-skeleton';
import TextInput from 'components/Form/TextInput';
import HeaderGradient from 'components/Header/HeaderGradient';
import PlusBigIcon from 'components/common/assets/icons/plusBig.svg';
import Button from 'components/Button/Button';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { referralFetchRequest } from './actions';
import { makeSelectLoading, makeSelectRefferal } from './selectors';

import { parseNumFormat } from '../../helpers/GlobalHelper';

const key = 'referral';

function ReferralPage({ loading, referral, getReferral }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getReferral();
  }, []);

  return (
    <article>
      <Helmet>
        <title>Referral</title>
        <meta title="Referral" content="Referral Page of mySkin.com" />
      </Helmet>

      <div className="content">
        <HeaderGradient className="header__referral">
          <div className="banner">
            <div className="plus">
              <PlusBigIcon />
              <div className="banner__text">
                <h1 className="pt-serif bold text-white u-margin-bottom-small">
                  Referral Program
                </h1>
                <p className="text-white size20 fw300">
                  Tell your friends about mySkin and earn rewards
                </p>
              </div>
            </div>
          </div>
        </HeaderGradient>
        <section className="referral-page container-myskin pt4 pb4">
          <h2 className="title text-center">Your Code</h2>
          <p className="text-center size18 mt15 mb1">
            Share your unique code with friends and you’ll get XXXXXXX
          </p>

          <Row className="justify-content-center">
            <Col xs="6">
              <TextInput
                disabled
                placeholder="Referral Code"
                className="u-margin-top-small"
                textinputclassname="text-center"
                value={referral?.referal_code ?? '-'}
                rounded={false}
              />
            </Col>
          </Row>

          <Row className="justify-content-center mt15">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(referral?.referal_code ?? '-');
                Swal.fire({
                  title: 'Berhasil salin referral code',
                  icon: 'success',
                });
              }}
            >
              Copy
            </Button>
          </Row>

          <div className="card card-myskin card-form pt2 pb2 mt5">
            <h2 className="pt-serif size22 bold text-center">Your Rewards</h2>
            {loading ? (
              <Skeleton style={{ height: '2rem', width: '20rem' }} />
            ) : (
              <span className="size38 fw300 text-green text-center mt2">
                Rp. {parseNumFormat(referral?.total_reward ?? 0)}
              </span>
            )}
          </div>

          <div className="card card-myskin card-form pt2 pb2 mt4">
            <h2 className="pt-serif size22 bold text-center">Friend Invited</h2>
            {loading ? (
              <Skeleton style={{ height: '2rem', width: '20rem' }} />
            ) : (
              <span className="size38 fw300 text-green text-center mt2">
                {parseNumFormat(referral?.invited_friend ?? 0)}
              </span>
            )}
          </div>
        </section>
      </div>
    </article>
  );
}

ReferralPage.propTypes = {
  loading: PropTypes.bool,
  referral: PropTypes.any,
  getReferral: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  referral: makeSelectRefferal(),
});

function mapDispatchToProps(dispatch) {
  return {
    getReferral: () => dispatch(referralFetchRequest()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ReferralPage);
