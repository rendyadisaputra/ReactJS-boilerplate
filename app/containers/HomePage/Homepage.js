/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

// components
import { useHistory } from 'react-router-dom';
import Button from 'components/Button/Button';
import CardTestimoni from 'components/Card/CardTestimoni';
import CarouselTestimoni from 'components/Carousel/CarouselTestimoni';
import CardDiagnosa from 'components/Card/CardDiagnosa';
import TextInput from 'components/Form/TextInput';
import CardDermatologist from 'components/Card/CardDermatologist';

// Images
import HeaderImg from 'components/common/assets/images/headerImg.png';
import Person1 from 'components/common/assets/images/person1.png';
import Person2 from 'components/common/assets/images/person2.png';

// Icons
import SurveryIcon from 'components/common/assets/icons/survey.svg';
import HealthIcon from 'components/common/assets/icons/health.svg';
import SkincareIcon from 'components/common/assets/icons/skincare.svg';
import CalendarIcon from 'components/common/assets/icons/calendar.svg';
import CurlyArrow from 'components/common/assets/icons/curlyarrow.svg';

// Redux Saga
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import reducer from './reducer';
import saga from './saga';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import {
  getListTestimonyRequest,
  getDoctorTestimonyRequest,
  getPatientTestimonyRequest,
} from './actions';
import {
  makeSelectLoading,
  makeSelectUserTestimony,
  makeSelectDoctorTestimony,
  makeSelectPatientTestimony,
} from './selectors';

const key = 'userTestimony';

function HomePage({
  loading,
  userTestimony,
  doctorTestimony,
  patientTestimony,
  getListTestimony,
  getDoctorTestimony,
  getPatientTestimony,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const history = useHistory();

  useEffect(() => {
    getListTestimony();
    getDoctorTestimony();
    getPatientTestimony();
  }, []);

  const renderCardDermatologist = () => {
    if (!loading) {
      if (doctorTestimony.length > 0) {
        return doctorTestimony.map((item) => (
          <CardDermatologist
            image={item.user?.user_photo_profile}
            summary={item.testimony_desc}
            experience={item.user?.user_experience}
            fullName={item.user?.user_fullname}
          />
        ));
      }
      return <h2>Doctor Testimony Not Found</h2>;
    }

    return (
      <>
        <CardDermatologist loading />
        <CardDermatologist loading />
      </>
    );
  };

  const renderCardTestimoni = () => {
    if (!loading) {
      if (patientTestimony.length > 0) {
        return patientTestimony.map((item) => (
          <CardTestimoni
            image={item.testimony_image}
            name={item.user?.user_fullname}
            time={item.testimony_time}
            description={item.testimony_desc}
          />
        ));
      }

      return <h2>Patient Testimony Not Found</h2>;
    }

    return <CardTestimoni loading />;
  };

  return (
    <article>
      <Helmet>
        <title>Home Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>
      <div className="home-page content">
        <section className="centered">
          <img src={HeaderImg} alt="Header Img" className="home-page__img" />

          <div className="home-page__card card container-myskin">
            <h1 className="title text-center">
              Specially formulated for your best skin ever
            </h1>
            <p className="text-center u-margin-top-small">
              Dermatology + acne treatment customized just for your needs
            </p>
            <div className="d-flex justify-content-center align-items-center">
              <Button
                className="u-margin-top-medium"
                onClick={() =>
                  history.push('/create-account', {
                    activeIndex: 0,
                  })
                }
              >
                take a skin survey
              </Button>
            </div>
          </div>
        </section>

        <section className="treatment container-myskin">
          <h1 className="title text-center u-margin-top-big">
            Prescription acne
          </h1>
          <h1 className="title text-center">treatment... in 3 easy steps</h1>
          <div className="d-flex flex-column treatment__steps">
            <div className="d-flex align-items-center">
              <div className="col-2">
                <SurveryIcon />
              </div>
              <div className="col-10">
                <p className="size20">Take a 5-minute skin survey</p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="col-2">
                <HealthIcon />
              </div>
              <div className="col-10">
                <p className="size20">
                  Get a diagnosis & treatment plan from your dermatologist
                </p>
              </div>
            </div>
            <div className="d-flex align-items-center">
              <div className="col-2">
                <SkincareIcon />
              </div>
              <div className="col-10">
                <span className="size20">Receive your custom</span>
                <p className="size20">skincare medication</p>
              </div>
            </div>
          </div>
        </section>

        <section className="free-monthly">
          <div className="container-myskin">
            <div className="d-flex align-items-center">
              <div className="col-2">
                <CalendarIcon />
              </div>
              <div className="col-10">
                <span className="size20">
                  You’ll also get free monthly followup appointments
                </span>
                <p className="size20">with your dermatologist</p>
              </div>
            </div>
          </div>
        </section>

        <section className="testimonial d-flex flex-column">
          <h1 className="title text-center">Seeing is believing</h1>
          <p className="text-center u-margin-top-small size20 u-margin-bottom-medium">
            Real results
          </p>

          {renderCardTestimoni()}
        </section>

        <section className="testimonial-slide">
          <CarouselTestimoni data={userTestimony} loading={loading} />

          <div className="d-flex justify-content-center">
            <Button className="btn-white btn-white--spacing">
              Get started
            </Button>
          </div>
        </section>

        <section className="diagnosis bg-white">
          <h1 className="title text-center">Unique for each person</h1>
          <p className="text-center u-margin-top-small u-margin-bottom-medium">
            Dermatologist-prescribed treatment, customized for you
          </p>

          <CardDiagnosa />
        </section>

        <div className="skincare-img">
          <div className="person--top person">
            <img src={Person2} alt="Person 1" />
            <CurlyArrow />
          </div>

          <div className="person--bottom person">
            <img src={Person1} alt="Person 2" />
            <CurlyArrow />
          </div>
        </div>

        <section className="diagnosis diagnosis--bottom bg-white">
          <div className="u-margin-top-huge">
            <CardDiagnosa
              name="Amelia"
              diagnosis="Sensitive and comination skin, acne scarring"
            />
          </div>

          <div className="d-flex justify-content-center mt4">
            <Button>Get Started</Button>
          </div>
        </section>

        <section className="our-dermatologists">
          <h1 className="title text-center">Meet our dermatologists</h1>
          <p className="text-center size25 fw300 u-margin-bottom-big">
            mySkin’s experts are here to help
          </p>

          {renderCardDermatologist()}
        </section>

        <section className="bg-green p4 d-flex flex-column align-items-center">
          <h1 className="title text-white text-center mb-2">
            Get your best skin ever
          </h1>
          <Button className="btn-white text-black u-margin-top-medium">
            START YOUR SKIN SURVEY
          </Button>
        </section>

        <section className="contact-us p4 u-margin-top-medium">
          <h1 className="title text-center ln-height-2">
            Not sure yet? No problem!{' '}
          </h1>
          <p className="size25 text-center">
            Sign up for our newsletter and be the first to receive promotions
          </p>

          <TextInput
            placeholder="Email Address"
            className="u-margin-top-medium"
            rounded={false}
          />

          <div className="d-flex justify-content-center mt-5 u-margin-bottom-small">
            <Button className="btn-rose">Sign Up</Button>
          </div>
        </section>
      </div>
    </article>
  );
}

HomePage.propTypes = {
  loading: PropTypes.bool,
  userTestimony: PropTypes.array,
  doctorTestimony: PropTypes.array,
  patientTestimony: PropTypes.array,
  getListTestimony: PropTypes.func,
  getDoctorTestimony: PropTypes.func,
  getPatientTestimony: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  userTestimony: makeSelectUserTestimony(),
  doctorTestimony: makeSelectDoctorTestimony(),
  patientTestimony: makeSelectPatientTestimony(),
});

function mapDispatchToProps(dispatch) {
  return {
    getListTestimony: () => dispatch(getListTestimonyRequest()),
    getDoctorTestimony: () => dispatch(getDoctorTestimonyRequest()),
    getPatientTestimony: () => dispatch(getPatientTestimonyRequest()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(HomePage);
