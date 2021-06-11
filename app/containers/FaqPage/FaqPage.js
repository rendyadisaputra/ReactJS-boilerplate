import React, { memo, useEffect } from 'react';

import PropTypes from 'prop-types';

import { Helmet } from 'react-helmet-async';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import {
  makeSelectFaq,
  makeSelectLoading,
  makeSelectFaqTitle,
} from './selectors';
import { getFaqRequest, getFaqTitleRequest } from './actions';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import reducer from './reducer';
import saga from './saga';

// * Components
import Collapsible from '../../components/Collapse/Collapsible';
import Loader from '../../components/Loader/Loader';

const key = 'faq';

const aboutUsImg =
  'https://user-images.githubusercontent.com/44439185/115876502-994a2e00-a470-11eb-8676-79fa26c5c76a.png';

function FaqPage({ loading, faq, faqTitle, getFaq, getFaqHeader }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getFaq();
    getFaqHeader();
  }, []);

  const renderFaq = () => {
    if (faq.length > 0) {
      return faq.map((item) => (
        <div className="mb4" key={item.type_id}>
          <h1 className="title underline">{item.type_name}</h1>
          {item.faq.length > 0 ? (
            item.faq.map((d) => (
              <Collapsible title={d.faq_title} description={d.faq_desc} />
            ))
          ) : (
            <p>FAQ tidak tersedia</p>
          )}
        </div>
      ));
    }

    return <h2 className="size20 mt3">FAQ data is empty</h2>;
  };

  return (
    <article>
      <Helmet>
        <title>FAQ</title>
        <meta name="FAQ" content="This is FAQ of mySkin.com" />
      </Helmet>

      <div className="content about-us">
        {loading ? (
          <Loader />
        ) : (
          <>
            <section className="about-us__header u-margin-bottom-big">
              <img src={aboutUsImg} className="about-us__img" alt="About Us" />
              <div className="about-us__card card container-myskin">
                <h1 className="title text-center">F.A.Q</h1>
                <p className="text-center size20 clear-space mt15">
                  {faqTitle[0]?.content_title ?? 'sub-title not found'}
                </p>
              </div>
            </section>

            <section className="container-myskin">{renderFaq()}</section>
          </>
        )}
      </div>
    </article>
  );
}

FaqPage.propTypes = {
  loading: PropTypes.bool,
  faq: PropTypes.array,
  faqTitle: PropTypes.array,
  getFaq: PropTypes.func,
  getFaqHeader: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  faq: makeSelectFaq(),
  faqTitle: makeSelectFaqTitle(),
});

function mapDispatchToProps(dispatch) {
  return {
    getFaq: () => dispatch(getFaqRequest()),
    getFaqHeader: () => dispatch(getFaqTitleRequest()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(FaqPage);
