import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  getFaqFailure,
  getFaqSuccess,
  getFaqTitleSuccess,
  getFaqTitleFailure,
} from './actions';
import { GET_FAQ_REQUEST, GET_FAQ_TITLE_REQUEST } from './constants';

function* getFaq() {
  const requestUrl = '/api/v1/content/faq';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getFaqSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getFaqFailure(error));
  }
}

function* getFaqTitle() {
  const requestUrl = '/api/v1/content/faq-header';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getFaqTitleSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getFaqTitleFailure(error));
  }
}

export default function* faqSaga() {
  yield takeLatest(GET_FAQ_REQUEST, getFaq);
  yield takeLatest(GET_FAQ_TITLE_REQUEST, getFaqTitle);
}
