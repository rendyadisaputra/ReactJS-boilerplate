/* eslint-disable camelcase */
/* eslint-disable import/order */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { NavLink, useHistory, Link } from 'react-router-dom';
import { useToasts } from 'react-toast-notifications';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {
  getGuidesRequest,
  getJourneyRequest,
  getProductRecRequest,
  getDiagnoseRequest,
  getTreatmentMessageRequest,
  addToCartTransactionRequest,
} from './actions';
import {
  makeSelectLoading,
  makeSelectGuides,
  makeSelectJourney,
  makeSelectJourneyList,
  makeSelectProductRecommended,
  makeSelectDiagnose,
  makeSelectTreatmentMessage,
  makeSelectError,
  makeSelectIsSuccess,
  makeSelectLoadingAdd,
} from './selectors';

// * Components
import Skeleton from 'react-loading-skeleton';
import Button from '../../components/Button/Button';
import Stepper from '../../components/Stepper/Stepper';
import StepperWrapper from '../../components/Stepper/StepperWrapper';
import { Tabs, TabItem } from '../../components/Tabs/Tabs';
import MessagesContent from '../../layouts/MessagesContent';
import PhotosContent from '../../layouts/PhotosContent';
import CardGuides from '../../components/Card/CardGuides';
import HeaderGradient from '../../components/Header/HeaderGradient';
import PlusBigIcon from '../../components/common/assets/icons/plusBig.svg';
import PersonIcon from '../../components/common/assets/icons/person.svg';

// * Utils & Helper
import { getCookie } from '../../utils/cookie';
import { stepperLoggedIn } from '../../helpers/GlobalConstant';
import {
  capitalizeFirstLetter,
  selectStatus,
  selectType,
} from '../../helpers/GlobalHelper';
import CardProductRecommendation from '../../components/Card/CardProductRecommendation';
import CardTreatment from '../../components/Card/CardTreatment';
import ErrorLayout from '../../layouts/ErrorLayout';
import LoaderModal from '../../components/Loader/LoaderModal';

const key = 'journey';

function LoggedInPage({
  loading,
  loadingAdd,
  error,
  journey,
  journeyList,
  guides,
  productRec,
  diagnose,
  treatmentMessage,
  isSuccess,
  getGuides,
  getJourney,
  getProdctRec,
  getDiagnose,
  getTreatmentMessage,
  addToCart,
}) {
  /**
   * decrypt cookie in secret
   */
  const data = getCookie('secret');
  const user = JSON.parse(data); // User Data
  const guidesUrl = `${process.env.BASE_W_URL}/guides`;
  // console.log(" user ", user)
  // * Hooks
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const { addToast } = useToasts();
  const history = useHistory();

  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    getJourney();
  }, []);

  useEffect(() => {
    if (!journeyList) {
      console.log(' Journey List d', journeyList);
    }
    if (journey) {
      getTreatmentMessage();
      getProdctRec();
      //   if (journey.dermatologist_appointment) {
      //     getProdctRec();
      //     getDiagnose();
      //     getTreatmentMessage();
      //   }
    }
  }, [journey, journeyList]);

  useEffect(() => {
    if (isSuccess) {
      addToast('Barang berhasil ditambahkan', {
        autoDismiss: true,
        appearance: 'success',
      });

      history.push("/cart")
    }
  }, [isSuccess]);

  const checkCompleteStatus = (type) => {
    if (journey) {
      for (const i in journey.journeys) {
        if (
          journey.journeys[i].key == type &&
          journey.journeys[i].status == 'complete'
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const renderMessageContent = () => {
    if (treatmentMessage != null) {
      const lastMessage = treatmentMessage[0];
      // console.log(" treatment Message ", lastMessage.message)

      // const { admin_message, doctor } = treatmentMessage;
      return (
        <MessagesContent
          message={lastMessage.message.body}
          title={lastMessage.subject}
          name={lastMessage.sender_name}
          profileImg={lastMessage.profile_pict}
          dateTime={new Date(lastMessage.sent_at * 1000).toLocaleString()}
        />
      );
    }

    return (
      <>
        <h2 className="mb1">Belum Ada Pesan</h2>
        <h2>
          Silahkan isi Survey dan dapatkan diagnosis Gratis &amp; mulai skin
          care Journey Anda
        </h2>
        {/* {!checkCompleteStatus('order') && (
          <Button type="submit" className="mt3 outline nrml-text">
            Pesan Lainnya ...
          </Button>
        )} */}
      </>
    );
  };

  const purchaseProductRec = (payload) => {

    addToCart(payload);
  };

  return (
    <article>
      <Helmet>
        <title>Home</title>
        <meta title="Home" content="Home Page for Logged In User" />
      </Helmet>

      {error ? (
        <ErrorLayout error={error} />
      ) : (
        <div className="content">
          <HeaderGradient>
            <div className="banner">
              <div className="plus">
                <PlusBigIcon />
                <div className="banner__text">
                  <h1 className="pt-serif bold text-white mb1">
                    Hi {capitalizeFirstLetter(user.user_display_name)}!
                  </h1>
                  <p className="text-white size20 fw300 u-margin-bottom-small">
                    Terimakasih sudah menjadi member Myskin.id
                  </p>
                  <div
                    style={{
                      visibility: !checkCompleteStatus('order_delivery')
                        ? 'visible'
                        : 'hidden',
                    }}
                  >
                    <NavLink to="/follow-up">
                      <Button className="btn-white btn-sm">Follow Up</Button>
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </HeaderGradient>

          <section className="journey container-myskin pt5 pb5 u-margin-bottom-small">
            <h1 className="pt-serif fw700 size27">Your Journey</h1>
            <div className="mt3">
              {!journeyList ? (
                <div>
                  <Skeleton style={{ height: '2rem' }} className="mb2" />
                  <Skeleton style={{ height: '2rem' }} className="mb2" />
                  <Skeleton style={{ height: '2rem' }} />
                </div>
              ) : (
                <StepperWrapper>
                  {journeyList.map((item, index) => (
                    <Stepper
                      key={Math.random() + 9}
                      type={item.status}
                      title={item.label}
                      tabIndex={index + 1}
                      status={item.status}
                      withConnector={index !== journeyList.length - 1}
                    />
                  ))}
                </StepperWrapper>
              )}
            </div>
          </section>

          {checkCompleteStatus('dermatologist-analysis') && (
            <>
              <section className="product container-myskin u-margin-bottom-medium">
                <h1 className="pt-serif fw700 size27">Produk Rekomendasi</h1>

                <CardProductRecommendation
                  data={productRec}
                  addToCart={purchaseProductRec}
                />
              </section>

              <section className="diagnosis container-myskin mb5">
                <h1 className="pt-serif fw700 size27 lnHeightMd">
                  Diagnosis and Treatment Plan
                </h1>

                <CardTreatment data={diagnose} />
              </section>
            </>
          )}
          {console.log(checkCompleteStatus('skin-survey'))}
          {!checkCompleteStatus('skin-survey') ? (
            <section className="consultation container-myskin">
              <h1 className="pt-serif fw700 size27 lnHeightMd">
                You haven't take a survey
              </h1>

              <div className="card card-myskin card-form u-margin-top-medium u-margin-bottom-medium">
                <div className="pl25 pr25 pt2 pb1">
                  <p className="size18">
                    Please take a survey for place an order
                  </p>
                </div>
                <div className="pl25 pr25 pb2">
                  <Button onClick={() => history.push('/questionnaire')}>
                    Take Survey
                  </Button>
                </div>
              </div>
            </section>
          ) : (
            <section className="consultation container-myskin">
              <h1 className="pt-serif fw700 size27 lnHeightMd">
                {checkCompleteStatus('order')
                  ? 'Have any questions ?'
                  : `You haven't place order ?`}
              </h1>

              <div className="card card-myskin card-form u-margin-top-medium u-margin-bottom-medium">
                <div className="pl25 pr25 pt2 pb1">
                  <p className="size18">
                    Schedule a video consultation with your dermatologist{' '}
                    {checkCompleteStatus('order')
                      ? null
                      : 'or select our product'}
                  </p>
                </div>
                <div className="pl25 pr25 pb2">
                  <Button
                    onClick={() =>
                      checkCompleteStatus('order')
                        ? {}
                        : history.push('/service-plan', {
                            activeIndex: 1,
                          })
                    }
                  >
                    {checkCompleteStatus('order') ? 'Book Now' : 'Order Now'}
                  </Button>
                </div>
              </div>
            </section>
          )}

          <section className="referral-program pt4 pb4 pl4 pr4">
            {/* <PersonIcon /> */}
            <h1 className="pt-serif size25 fw700 mt2">MySkin Guides</h1>
            <p className="size18 text-center mt1">
              Dapatkan tips-tips menarik dalam perawatan kulit Anda
            </p>

            <a className="btn btn-white text-black mt3 mb5" href={guidesUrl}>
              Baca lebih lanjut
            </a>
          </section>

          <section className="my-information pt4 pb4">
            <h1 className="pt-serif size25 fw700 text-center mb4">
              Informasi Saya
            </h1>
            <div className="container-myskin">
              <Tabs>
                <TabItem
                  title="Pesan"
                  active={activeTab === 0}
                  onClick={() => setActiveTab(0)}
                />
                <TabItem
                  title="Foto"
                  active={activeTab === 1}
                  onClick={() => setActiveTab(1)}
                />
              </Tabs>

              <div className="tab-content pt4 pb2">
                {activeTab === 0 ? (
                  renderMessageContent()
                ) : (
                  <PhotosContent data={treatmentMessage?.image ?? []} />
                )}
              </div>
            </div>
          </section>

          {/* <section className="guide-news container-myskin pt5 pb5">
            <h1 className="pt-serif size25 fw700 mb5">
              Guides for Healthy Skin
            </h1>

            <CardGuides
              className="mb2"
              imgUrl="https://user-images.githubusercontent.com/44439185/113704440-51a07400-9706-11eb-838f-c64c53f43020.png"
            />
            <CardGuides
              className="mb2"
              imgUrl="https://user-images.githubusercontent.com/44439185/113704440-51a07400-9706-11eb-838f-c64c53f43020.png"
            />
            <CardGuides imgUrl="https://user-images.githubusercontent.com/44439185/113704440-51a07400-9706-11eb-838f-c64c53f43020.png" />

            <div className="d-flex justify-content-center mt5">
              <Button>All Guides</Button>
            </div>
          </section> */}
        </div>
      )}

      <LoaderModal loading={loadingAdd} />
    </article>
  );
}

LoggedInPage.propTypes = {
  loading: PropTypes.bool,
  loadingAdd: PropTypes.bool,
  isSuccess: PropTypes.bool,
  journey: PropTypes.object,
  journeyList: PropTypes.array,
  error: PropTypes.any,
  guides: PropTypes.array,
  productRec: PropTypes.array,
  diagnose: PropTypes.object,
  treatmentMessage: PropTypes.array,
  getGuides: PropTypes.func,
  getJourney: PropTypes.func,
  getProdctRec: PropTypes.func,
  getDiagnose: PropTypes.func,
  getTreatmentMessage: PropTypes.func,
  addToCart: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  journey: makeSelectJourney(),
  journeyList: makeSelectJourneyList(),
  guides: makeSelectGuides(),
  error: makeSelectError(),
  productRec: makeSelectProductRecommended(),
  diagnose: makeSelectDiagnose(),
  treatmentMessage: makeSelectTreatmentMessage(),
  isSuccess: makeSelectIsSuccess(),
  loadingAdd: makeSelectLoadingAdd(),
});

function mapDispatchToProps(dispatch) {
  return {
    getGuides: () => dispatch(getGuidesRequest()),
    getJourney: () => dispatch(getJourneyRequest()),
    getProdctRec: () => dispatch(getProductRecRequest()),
    getDiagnose: () => dispatch(getDiagnoseRequest()),
    getTreatmentMessage: () => dispatch(getTreatmentMessageRequest()),
    addToCart: (payload) => dispatch(addToCartTransactionRequest(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(LoggedInPage);
