import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

import { getProductDetailSuccess, getProductDetailFailure } from './actions';
import { PRODUCT_DETAIL_FETCH_REQUEST } from './constants';

// * Get Product Detail
function* getProductDetail({ id }) {
  const requestUrl = `/api/v1/product/${id}`;
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getProductDetailSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getProductDetailFailure(error));
  }
}

export default function* productPageSaga() {
  yield takeLatest(PRODUCT_DETAIL_FETCH_REQUEST, getProductDetail);
}
