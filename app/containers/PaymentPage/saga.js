import { call, put, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';

import request from '../../utils/request';
import {
  paymentGatewaysFailure,
  paymentGatewaysSuccess,
} from './actions';
import { PAYMENT_GATEWAYS_REQUEST, UPDATE_PROFILE_REQUEST } from './constants';

// * Account
export function* getPaymentGateways() {
  const requestUrl = process.env.BASE_W_URL + '/wp-json/cocart/v1/pgs';
  try {
    const response = yield call(request, requestUrl, {
      method: 'GET',
    });
    yield put(paymentGatewaysSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(paymentGatewaysFailure(error));
  }
}


export default function* paymentGatewaysSaga() {
  yield takeLatest(PAYMENT_GATEWAYS_REQUEST, getPaymentGateways);
}
