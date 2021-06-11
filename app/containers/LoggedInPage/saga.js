import { call, put, takeLatest } from 'redux-saga/effects';
import request from '../../utils/request';

import {
  getGuidesFailure,
  getJourneyFailure,
  getProductRecFailure,
  getGuidesSuccess,
  getProductRecSuccess,
  getJourneySuccess,
  getDiagnoseSuccess,
  getDiagnoseFailure,
  getTreatmentMessageSuccess,
  getTreatmentMessageFailure,
  addTransactionFailure,
  addTransactionSuccess,
  clearData,
} from './actions';
import {
  JOURNEY_FETCH_REQUEST,
  GUIDES_FETCH_REQUEST,
  PRODUCT_REC_FETCH_REQUEST,
  DIAGNOSE_FETCH_REQUEST,
  TREATMENT_MESSAGE_FETCH_REQUEST,
  ADD_TRANSACTION_REQUEST,
  CLEAR_DATA,
} from './constants';

// * Cart Page
import {
  getTransactionFailure,
  getTransactionSuccess,
  getShoppingCartSuccess,
  getShoppingCartFailure,
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

// * Guides
function* getGuides() {
  const requestUrl = `${process.env.BASE_W_URL}/api/v1/content/guides`;
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getGuidesSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getGuidesFailure(error));
  }
}

// * Get Product Recommended
function* getProductRecommended() {
  const requestUrl = `${process.env.BASE_W_URL}wp-json/cocart/v1/products`;
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

// * Diagnose
function* getDiagnose() {
  const requestUrl = `${process.env.BASE_W_URL}/api/v1/treatment/current`;
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getDiagnoseSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getDiagnoseFailure(error));
  }
}

// * Treatment Plan Message
function* getTreatmentMessage() {
  const requestUrl = `${process.env.BASE_W_URL}wp-json/cocart/v1/inbox`;
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getTreatmentMessageSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getTreatmentMessageFailure(error));
  }
}

function* getTransaction() {
  return false;
  const requestUrl = `${process.env.BASE_W_URL}/api/v1/transactiond`;
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    const productCount =
      response.data[0].product.length + response.data[0].care.length;

    yield put(getTransactionSuccess(response.data, productCount));
  } catch (err) {
    const error = yield err;

    yield put(getTransactionFailure(error));
  }
}

export function* getShoppingCart() {
  const requestUrl = `${process.env.BASE_W_URL}wp-json/cocart/v1/get-cart`;
  try {
    const response = yield call(request, requestUrl, { method: 'get' });
    yield put(getShoppingCartSuccess(response));
  } catch (err) {
    const error = yield err;

    yield put(getShoppingCartFailure(error));
  }
}

function* addToCart({ payload }) {
  const payloadData = {
    product_id: `${payload.product_ids[0].product_id}`,
    quantity: parseInt(payload.product_ids[0].amount),
  };
  const requestUrl = `${process.env.BASE_W_URL}wp-json/cocart/v1/add-item`;
  try {
    const response = yield call(request, requestUrl, {
      method: 'post',
      data: payloadData,
    });

    yield getShoppingCart();

    yield put(addTransactionSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(addTransactionFailure(error));
  }
}

function* clearDatas() {
  yield put(clearData());
}

export default function* loggedInSaga() {
  yield takeLatest(JOURNEY_FETCH_REQUEST, getJourney);
  yield takeLatest(GUIDES_FETCH_REQUEST, getGuides);
  yield takeLatest(PRODUCT_REC_FETCH_REQUEST, getProductRecommended);
  yield takeLatest(DIAGNOSE_FETCH_REQUEST, getDiagnose);
  yield takeLatest(TREATMENT_MESSAGE_FETCH_REQUEST, getTreatmentMessage);
  yield takeLatest(TREATMENT_MESSAGE_FETCH_REQUEST, getTreatmentMessage);
  yield takeLatest(GET_TRANSACTION_REQUEST, getTransaction);
  yield takeLatest(ADD_TRANSACTION_REQUEST, addToCart);
  yield takeLatest(CLEAR_DATA, clearDatas);
}
