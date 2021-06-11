/* eslint-disable react-hooks/rules-of-hooks */
import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

import {
  getProductListFailure,
  getProductListSuccess,
  getProductRecSuccess,
  getProductRecFailure,
  getProductDetailSuccess,
  getProductDetailFailure,
  // * Transactions
  addTransactionSuccess,
  addTransactionFailure,
  // * Journey
  getJourneyFailure,
  getJourneySuccess,
} from './actions';
import {
  PRODUCT_LIST_FETCH_REQUEST,
  PRODUCT_REC_FETCH_REQUEST,
  PRODUCT_DETAIL_FETCH_REQUEST,
  ADD_TRANSACTION_REQUEST,
  JOURNEY_FETCH_REQUEST,
} from './constants';

import {
  getTransactionFailure,
  getTransactionSuccess,
} from '../CartPage/actions';
import { GET_TRANSACTION_REQUEST } from '../CartPage/constants';

// * Journey
function* getJourney() {
  const requestUrl = `${process.env.BASE_W_URL}wp-json/cocart/v1/journey/`;
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getJourneySuccess(response));
  } catch (err) {
    const error = yield err;

    yield put(getJourneyFailure(error));
  }
}

// * Get Product List
function* getProductList() {
  const requestUrl = process.env.BASE_W_URL + 'wp-json/cocart/v1/products';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getProductListSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getProductListFailure(error));
  }
}

// * Get Product Recommended
function* getProductRecommended() {
  const requestUrl = process.env.BASE_W_URL + '/api/v1/product/recommended';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getProductRecSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getProductRecFailure(error));
  }
}

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

// * Transactions
function* getTransaction() {
  const requestUrl = process.env.BASE_W_URL + '/api/v1/transaction';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    const productCount = response.data.reduce(
      (prev, curr) => prev + curr.product.length,
      0,
    );

    yield put(getTransactionSuccess(response.data, productCount));
  } catch (err) {
    const error = yield err;

    yield put(getTransactionFailure(error));
  }
}

function* createOrder({ payload }) {
  const requestUrl = process.env.BASE_W_URL + '/api/v1/order';
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

export default function* productPageSaga() {
  yield takeLatest(PRODUCT_LIST_FETCH_REQUEST, getProductList);
  yield takeLatest(PRODUCT_REC_FETCH_REQUEST, getProductRecommended);
  yield takeLatest(PRODUCT_DETAIL_FETCH_REQUEST, getProductDetail);
  yield takeLatest(ADD_TRANSACTION_REQUEST, createOrder);
  yield takeLatest(GET_TRANSACTION_REQUEST, getTransaction);
  yield takeLatest(JOURNEY_FETCH_REQUEST, getJourney);
}
