import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

// * Redux Saga
import {
  getTreatmentPlanDetailFailure,
  getTreatmentPlanDetailSuccess,
  addTransactionFailure,
  addTransactionSuccess,
} from './actions';
import {
  GET_TREATMENT_DETAIL_REQUEST,
  ADD_TRANSACTION_REQUEST,
} from './constants';

// * Cart Page
import {
  getTransactionFailure,
  getTransactionSuccess,
} from '../CartPage/actions';

import { GET_TRANSACTION_REQUEST } from '../CartPage/constants';

// * Get Treatment Detail
function* getTreatmentDetail({ id }) {
  const requestUrl = `/api/v1/treatment/${id}`;
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getTreatmentPlanDetailSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getTreatmentPlanDetailFailure(error));
  }
}

function* getTransaction() {
  const requestUrl = '/api/v1/transaction';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    const productCount =
      response.data.length > 0
        ? response.data[0].product.length + response.data[0].care.length
        : 0;

    yield put(getTransactionSuccess(response.data, productCount));
  } catch (err) {
    const error = yield err;

    yield put(getTransactionFailure(error));
  }
}

function* createOrder({ payload }) {
  const requestUrl = '/api/v1/order';
  try {
    const response = yield call(request, requestUrl, {
      method: 'post',
      data: payload,
    });

    yield getTransaction();

    yield put(addTransactionSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(addTransactionFailure(error));
  }
}

export default function* treatmentPlanSaga() {
  yield takeLatest(GET_TREATMENT_DETAIL_REQUEST, getTreatmentDetail);
  yield takeLatest(GET_TRANSACTION_REQUEST, getTransaction);
  yield takeLatest(ADD_TRANSACTION_REQUEST, createOrder);
}
