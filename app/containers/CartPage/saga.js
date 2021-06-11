import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';

import {
  /** SHopping cart */
  getShoppingCartSuccess, 
  getShoppingCartFailure,
  getCountShoppingCartSuccess,
  getCountShoppingCartFailure,

  /** Transaction */
  getTransactionFailure,
  getTransactionSuccess,
  addTransactionSuccess,
  addTransactionFailure,
  createPaymentFailure,
  createPaymentSuccess,
  changeAmountFailure,
  changeAmountSuccess,
} from './actions';

import {
  ADD_TRANSACTION_REQUEST,
  GET_TRANSACTION_REQUEST,
  GET_SHOPPING_CART_REQUEST,
  GET_COUNT_SHOPPING_CART_REQUEST,
  CREATE_PAYMENT_REQUEST,
  CHANGE_AMOUNT_REQUEST,
} from './constants';

export function* getShoppingCart(){
  const requestUrl = process.env.BASE_W_URL+'wp-json/cocart/v1/shopping-cart/';
  try{
    const response = yield call(request, requestUrl, {method: 'get'});
    yield put(getShoppingCartSuccess(response))
  } catch(err){
    const error = yield err;

    yield put(getShoppingCartFailure(error));
  }
}

export function* getCountShoppingCart(){
  // console.log(" get count shopping cart")
  const requestUrl = process.env.BASE_W_URL+'wp-json/cocart/v1/count-items';
  try{
    const response = yield call(request, requestUrl, {method: 'get'});
    // console.log(" response ", response, typeof(response));
    if(typeof(response) == 'string' || typeof(response) == 'number'){
      const itemCount = parseInt(response)
      yield put(getCountShoppingCartSuccess({count:itemCount}))
    }
    else{
      yield put(getCountShoppingCartSuccess(response))

    }
  } catch(err){
    const error = yield err;

    yield put(getCountShoppingCartFailure(error));
  }
}

export function* getTransaction() {
  return false;
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

    yield put(addTransactionSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(addTransactionFailure(error));
  }
}

// * Create Payment
function* createPayment({ payload }) {
  const requestUrl = '/api/v1/payment/create';
  try {
    const response = yield call(request, requestUrl, {
      method: 'post',
      data: payload,
    });

    yield window.open(response.data?.redirect_url, '_self');

    yield put(createPaymentSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(createPaymentFailure(error));
  }
}

// * Change Amount
function* changeAmount() {
  try {
    yield put(changeAmountSuccess());
  } catch (err) {
    yield put(changeAmountFailure('Gagal update amount'));
  }
}

export default function* cartPageReducer() {
  yield takeLatest(GET_TRANSACTION_REQUEST, getTransaction);
  yield takeLatest(GET_SHOPPING_CART_REQUEST, getShoppingCart);
  yield takeLatest(GET_COUNT_SHOPPING_CART_REQUEST, getCountShoppingCart);
  yield takeLatest(ADD_TRANSACTION_REQUEST, createOrder);
  yield takeLatest(CREATE_PAYMENT_REQUEST, createPayment);
  yield takeLatest(CHANGE_AMOUNT_REQUEST, changeAmount);
}
