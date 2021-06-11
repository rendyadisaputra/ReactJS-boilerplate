/* eslint-disable indent */
/* eslint-disable no-unused-vars */
/* eslint-disable import/order */
import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';
import { useToasts } from 'react-toast-notifications';
import htmlParser from 'html-react-parser';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {
  getTreatmentPlanDetailRequest,
  addTransactionRequest,
} from './actions';
import {
  makeSelectLoading,
  makeSelectTreatmentDetail,
  makeSelectIsSuccess,
  makeSelectLoadingAdd,
} from './selectors';

import Skeleton from 'react-loading-skeleton';
import HeaderTitle from '../../components/Header/HeaderTitle';
import ListWithIcon from '../../components/List/ListWithIcon';
import CardForYou, { CardForYouItem } from '../../components/Card/CardForYou';
import Button from '../../components/Button/Button';
import ListStep from '../../components/List/ListStep';

// * Assets
import DiagnoseIcon from '../../components/common/assets/icons/diagnose.svg';
import SkinTypeIcon from '../../components/common/assets/icons/skinType.svg';
import SunriseIcon from '../../components/common/assets/icons/sunrise.svg';
import NightIcon from '../../components/common/assets/icons/nightIcon.svg';
import CheckIcon from '../../components/common/assets/icons/checkBoxIcon.svg';
import LightIcon from '../../components/common/assets/icons/light.svg';
import WarningIcon from '../../components/common/assets/icons/warning.svg';
import LoaderModal from '../../components/Loader/LoaderModal';

const key = 'treatmentDetail';

const imgUrl =
  'https://user-images.githubusercontent.com/44439185/113833946-70f5da80-97b4-11eb-91e3-0ef03b6baad0.png';

function TreatmentPlan({
  loading,
  loadingAdd,
  treatmentDetail,
  isSuccess,
  getTreatmentDetail,
  createOrder,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { addToast } = useToasts();

  const location = useLocation();

  useEffect(() => {
    if (location.state) {
      getTreatmentDetail(location.state.diagnoseId);
    }
  }, []);

  useEffect(() => {
    if (isSuccess) {
      addToast('Success add items to cart', {
        autoDismiss: true,
        appearance: 'success',
      });
    }
  }, [isSuccess]);

  // * Services
  const handlePurchase = () => {
    const payload = {
      diagnose_id: String(treatmentDetail.diagnose_id),
    };

    createOrder(payload);
  };

  const renderProduct = () => {
    if (treatmentDetail?.products) {
      if (treatmentDetail.products.length > 0) {
        return treatmentDetail.products.map((item) => (
          <CardForYou imgUrl={item.product_image} title={item.product_name}>
            <CardForYouItem
              imgUrl={imgUrl}
              description={htmlParser(item.product_ingredient)}
            />
          </CardForYou>
        ));
      }
    }

    return <p>Data Kosong</p>;
  };

  return (
    <article>
      <Helmet>
        <title>Treatment Plan</title>
        <meta name="Treatment Plan Page" content="mySkin Treatment Plan" />
      </Helmet>

      <div className="content treatment-plan">
        <HeaderTitle title="Treatment Plan" />
        <section className="container-myskin pt5 pb3">
          <div className="message">
            {loading ? (
              <div>
                <div className="d-flex align-items-center">
                  <Skeleton
                    style={{
                      width: '10rem',
                      height: '10rem',
                      borderRadius: '50%',
                    }}
                    className="message__head--profile"
                  />
                  <div>
                    <Skeleton style={{ width: '10rem', height: '2rem' }} />
                    <Skeleton
                      style={{ width: '20rem', height: '2rem' }}
                      className="mt1"
                    />
                  </div>
                </div>

                <div className="mt1">
                  <Skeleton style={{ width: '5rem', height: '2rem' }} />
                  <Skeleton
                    style={{ height: '2rem' }}
                    className="mt1"
                    count={3}
                  />
                </div>
              </div>
            ) : (
              <>
                <div className="message__head">
                  <img
                    src={treatmentDetail?.doctor?.user_photo_profile}
                    alt="dermatologist 1"
                    className="message__head--profile"
                  />
                  <div className="d-flex flex-column">
                    <span className="size20 fw700">
                      {treatmentDetail?.doctor?.user_fullname}
                    </span>
                    <span className="size20">
                      <b>
                        {treatmentDetail?.doctor?.user_update_time
                          ? moment(
                              treatmentDetail?.doctor.user_update_time,
                            ).format('DD MMM YYYY')
                          : '-'}
                      </b>{' '}
                      |{' '}
                      {treatmentDetail?.doctor?.user_update_time
                        ? moment(
                            treatmentDetail?.doctor.user_update_time,
                          ).format('HH.mmA')
                        : '-'}
                    </span>
                  </div>
                </div>

                <div className="message__body">
                  <div className="size18">
                    {treatmentDetail?.admin_message
                      ? htmlParser(treatmentDetail.admin_message)
                      : 'Pesan kosong'}
                  </div>
                </div>
              </>
            )}
          </div>

          <hr />

          <div className="mt3">
            <ListWithIcon
              icon={<DiagnoseIcon />}
              title="Diagnosis"
              description={
                treatmentDetail?.diagnosis ?? 'Diagnosis tidak ditemukan'
              }
            />
            <ListWithIcon
              icon={<SkinTypeIcon />}
              title="skin type"
              description={
                treatmentDetail?.tipe_kulit ?? 'Tipe kulit tidak ditemukan'
              }
            />
          </div>
        </section>

        <section className="foryou bg-white pl5 pr5 pt5 pb5">
          <h1 className="title underline">Resep Khusus Untukmu</h1>
          {renderProduct()}
          <Button onClick={handlePurchase} className="mt1">
            Beli Sekarang
          </Button>
        </section>

        <section className="container-myskin pt5 pb2">
          <div className="pb2">
            <h1 className="title underline">Recommended Routine</h1>

            <div className="pt3 pb2">
              <ListStep icon={<SunriseIcon />} title="Morning">
                <div className="mt1 size20">
                  {treatmentDetail?.diagnose_routine_morning
                    ? htmlParser(treatmentDetail?.diagnose_routine_morning)
                    : 'Data kosong'}
                </div>
              </ListStep>
              <ListStep icon={<NightIcon />} title="Night">
                <div className="mt1 size20">
                  {treatmentDetail?.diagnose_routine_night
                    ? htmlParser(treatmentDetail?.diagnose_routine_night)
                    : 'Data kosong'}
                </div>
              </ListStep>
              <ListStep iconSm icon={<CheckIcon />} title="Saran Lain">
                <div className="mt1 size20">
                  {treatmentDetail?.diagnose_routine_other
                    ? htmlParser(treatmentDetail?.diagnose_routine_other)
                    : 'Data kosong'}
                </div>
              </ListStep>
            </div>
          </div>

          <div className="pb5">
            <h1 className="title underline-green">Lifestyle Suggestions</h1>
            <div className="pt3 pb2">
              <ListStep icon={<LightIcon />} title="Things to Try">
                <div className="mt1 size20">
                  {treatmentDetail?.diagnose_life_style_try
                    ? htmlParser(treatmentDetail?.diagnose_life_style_try)
                    : 'Data kosong'}
                </div>
              </ListStep>
              <ListStep icon={<WarningIcon />} title="Things to Avoid">
                <div className="mt1 size20">
                  {treatmentDetail?.diagnose_life_style_avoid
                    ? htmlParser(treatmentDetail?.diagnose_life_style_avoid)
                    : 'Data kosong'}
                </div>
              </ListStep>
            </div>
          </div>
        </section>

        <section className="bg-green section-up-radius pt5 pr5 pb5 pl5 text-white mb5">
          <h2 className="pt-serif fw700 size25 mb1">Final Messages</h2>
          <p className="size20 mb4">
            {treatmentDetail?.diagnose_final_message
              ? htmlParser(treatmentDetail?.diagnose_final_message)
              : 'Data kosong'}
          </p>

          <h2 className="pt-serif fw700 size25 mb1">Ada Pertanyaan?</h2>
          <p className="size20 mb2">
            Please get in touch with your doctor anytime
          </p>

          <Button className="btn-white text-black mb4">
            TANYA PRODUK SPESIALIS
          </Button>
        </section>

        <LoaderModal loading={loadingAdd} />
      </div>
    </article>
  );
}

TreatmentPlan.propTypes = {
  loading: PropTypes.bool,
  loadingAdd: PropTypes.bool,
  isSuccess: PropTypes.bool,
  treatmentDetail: PropTypes.object,
  getTreatmentDetail: PropTypes.func,
  createOrder: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  treatmentDetail: makeSelectTreatmentDetail(),
  isSuccess: makeSelectIsSuccess(),
  loadingAdd: makeSelectLoadingAdd(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTreatmentDetail: (id) => dispatch(getTreatmentPlanDetailRequest(id)),
    createOrder: (payload) => dispatch(addTransactionRequest(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(TreatmentPlan);
