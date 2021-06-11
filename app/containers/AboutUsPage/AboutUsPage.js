import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';
import parse from 'html-react-parser';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectAbout, makeSelectLoading } from './selectors';
import { getAboutUsRequest } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import Loader from '../../components/Loader/Loader';

const aboutUsImg =
  'https://user-images.githubusercontent.com/44439185/116044881-a5fe9a00-a69b-11eb-8503-58dd353627d2.png';

const key = 'about';

function AboutUsPage({ loading, about, getAboutUs }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getAboutUs();
  }, []);

  return (
    <article>
      <Helmet>
        <title>About Us</title>
        <meta name="About Us" content="This is about us of mySkin.com" />
      </Helmet>

      <div className="content about-us pb4">
        {loading ? (
          <Loader />
        ) : (
          <>
            <section className="about-us__header u-margin-bottom-big">
              <img src={aboutUsImg} className="about-us__img" alt="About Us" />
              <div className="about-us__card card container-myskin">
                <h1 className="title text-center">About Us</h1>
                <p className="text-center size20 clear-space mt15">
                  {about[0]?.content_title}
                </p>
              </div>
            </section>

            <section className="container-myskin">
              {about.length > 0 ? (
                parse(about[0].content_desc)
              ) : (
                <p>About Us Content Not Found</p>
              )}
            </section>
          </>
        )}
      </div>
    </article>
  );
}

AboutUsPage.propTypes = {
  loading: PropTypes.bool,
  about: PropTypes.array,
  getAboutUs: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  about: makeSelectAbout(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAboutUs: () => dispatch(getAboutUsRequest()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(AboutUsPage);
