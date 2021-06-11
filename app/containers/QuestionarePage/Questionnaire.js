/* eslint-disable camelcase */
/* eslint-disable no-restricted-syntax */
import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import PropTypes from 'prop-types';

// * Components & Assets
import QuestionnaireContent from 'layouts/QuestionnaireContent';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  makeSelectFullData,
  makeSelectLoading,
  makeSelectQuestionnaire,
} from './selector';
import { getQuestionnaireRequest, sendAnswerRequest } from './actions';
import saga from './saga';
import reducer from './reducer';
import Loader from '../../components/Loader/Loader';

const key = 'questionnaire';

function Questionnaire({
  loading,
  questionnaireComp,
  questionnaireData,
  getQuestionnaireDetail,
  sendAnswerQuestion,
}) {
  // * Inject Saga
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getQuestionnaireDetail();
  }, []);

  const handleSubmit = (answerObj) => {
    const { form_id } = questionnaireData;
    const answer = [];

    for (const [, value] of Object.entries(answerObj)) {
      answer.push(value);
    }

    const postData = {
      form_id,
      answer,
    };

    sendAnswerQuestion(postData);
  };

  return (
    <article>
      <Helmet>
        <title>Questionnaire Page</title>
        <meta
          name="description"
          content="A React.js Boilerplate application homepage"
        />
      </Helmet>

      <div className="content">
        <section className="questionnaire">
          {loading ? (
            <div>
              <Loader />
            </div>
          ) : (
            <QuestionnaireContent
              questionnaire={questionnaireComp}
              questionnaireData={questionnaireData}
              handleSubmit={handleSubmit}
            />
          )}
        </section>
      </div>
    </article>
  );
}

Questionnaire.propTypes = {
  loading: PropTypes.bool,
  questionnaireComp: PropTypes.array,
  questionnaireData: PropTypes.any,
  getQuestionnaireDetail: PropTypes.func,
  sendAnswerQuestion: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  questionnaireData: makeSelectFullData(),
  questionnaireComp: makeSelectQuestionnaire(),
});

function mapDispatchToProps(dispatch) {
  return {
    getQuestionnaireDetail: () => dispatch(getQuestionnaireRequest()),
    sendAnswerQuestion: (payload) => dispatch(sendAnswerRequest(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Questionnaire);
