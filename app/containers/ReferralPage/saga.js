import { call, takeLatest, put } from 'redux-saga/effects';
import request from 'utils/request';

import { referralFetchFailure, referralFetchSuccess } from './actions';
import { REFERRAL_FETCH_REQUEST } from './constants';

function* getReferral() {
  const requestUrl = '/api/v1/referal';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(referralFetchSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(referralFetchFailure(error));
  }
}

export default function* referralSaga() {
  yield takeLatest(REFERRAL_FETCH_REQUEST, getReferral);
}
