import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import { getAboutUsFailure, getAboutUsSuccess } from './actions';
import { GET_ABOUT_US_REQUEST } from './constants';

function* getAboutUs() {
  const requestUrl = '/api/v1/content/about';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getAboutUsSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getAboutUsFailure(error));
  }
}

export default function* faqSaga() {
  yield takeLatest(GET_ABOUT_US_REQUEST, getAboutUs);
}
