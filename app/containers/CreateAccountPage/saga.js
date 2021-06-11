import { call, put, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';

import request from '../../utils/request';
import {
  createAccountFailure,
  createAccountSuccess,
  getCareOptionFailure,
  getDiagnoseIdFailure,
  getCareOptionSuccess,
  getDiagnoseIdSuccess,
  postCareOptionProductFailure,
  postCareOptionVidcallFailure,
  postCareOptionVidcallSuccess,
  postCareOptionProductSuccess,
  postUserShippingSuccess,
  createPaymentFailure,
  createPaymentSuccess,
  postUserShippingFailure,
  accountDetailFailure,
  accountDetailSuccess,
  getDermatologistFailure,
  getDermatologistSuccess,
} from './actions';
import {
  CREATE_ACCOUNT_REQUEST,
  GET_DIAGNOSE_ID_REQUEST,
  GET_CARE_OPTION_REQUEST,
  POST_CARE_OPTION_VIDCALL_REQUEST,
  POST_CARE_OPTION_PRODUCT_REQUEST,
  POST_USER_SHIPPING_REQUEST,
  CREATE_PAYMENT_REQUEST,
  ACCOUNT_DETAIL_REQUEST,
  GET_DERMATOLOGIST_REQUEST,
} from './constants';

import { setCookie } from '../../utils/cookie';

export function* registerNewUser({ payload }) {
  const requestUrl = '/api/v1/auth/signup';

  try {
    const data = {
      ...payload,
      user_phone_number: String(`0${payload.user_phone_number}`),
    };

    const response = yield call(request, requestUrl, {
      method: 'POST',
      data,
    });

    setCookie(
      'secret',
      JSON.stringify(response.data),
      response.data.token_expired,
    );

    yield Swal.fire({
      title: 'Berhasil membuat akun',
      text: 'Silakan klik tombol OK untuk melanjutkan ke halaman survey',
      icon: 'success',
    }).then(() => {
      window.location.replace('/questionnaire');
    });

    yield put(createAccountSuccess(response.data));
  } catch (err) {
    const error = yield err;

    if (error.response.status > 400 && error.response.status < 500) {
      yield Swal.fire({
        title: 'Gagal membuat akun',
        icon: 'error',
        text: `Error ${error.response.status} : ${
          error.response.data ? error.response.data.error : error
        }`,
      });
    } else {
      yield Swal.fire({
        title: 'Gagal membuat akun',
        icon: 'error',
        text:
          'Email / Username yang anda gunakan sudah terpakai, silakan gunakan Email / Username yang lain.',
      });
    }

    yield put(createAccountFailure(error));
  }
}

// * Account
function* getAccountDetail() {
  const requestUrl = '/api/v1/auth/user';
  try {
    const response = yield call(request, requestUrl, {
      method: 'GET',
    });

    yield put(accountDetailSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(accountDetailFailure(error));
  }
}

// * Diagnose ID
function* getDiagnose() {
  const requestUrl = '/api/v1/treatment/current';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getDiagnoseIdSuccess(response.data));
  } catch (err) {
    const error = yield err;

    if (error.response.status > 400) {
      yield Swal.fire({
        icon: 'error',
        title: 'Gagal mengambil data diagnosa',
        text:
          'Mohon maaf, ada kendala saat mengambil data diagnosa. Silakan kembali lagi beberapa saat.',
      }).then(() => {
        window.location.replace('/');
      });
    }

    yield put(getDiagnoseIdFailure(error));
  }
}

// * Care Option
function* getCareOption() {
  const requestUrl = '/api/v1/care';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getCareOptionSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getCareOptionFailure(error));
  }
}

// * Post Care Option Vidcall
function* postCareOptionVidcall({ payload }) {
  const requestUrl = '/api/v1/care/appointment';
  try {
    const response = yield call(request, requestUrl, {
      method: 'post',
      data: payload,
    });

    yield Swal.fire({
      icon: 'success',
      title: 'Berhasil simpan booking appointment',
    });

    yield put(postCareOptionVidcallSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield Swal.fire({
      icon: 'error',
      text: `Error ${error.response.status} : Gagal simpan booking appointment`,
    });

    yield put(postCareOptionVidcallFailure(error));
  }
}

function* postCareOptionProduct({ payload }) {
  const requestUrl = '/api/v1/care';
  try {
    const response = yield call(request, requestUrl, {
      method: 'post',
      data: payload,
    });

    yield put(postCareOptionProductSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield Swal.fire({
      icon: 'error',
      text: `Error : ${error.response.status} : Gagal melakukan pembelian produk`,
    });

    yield put(postCareOptionProductFailure(error));
  }
}

// * User Shipping
function* postUserShipping({ payload }) {
  const requestUrl = '/api/v1/user/shipping';
  try {
    const response = yield call(request, requestUrl, {
      method: 'post',
      data: payload,
    });

    yield Swal.fire({
      icon: 'success',
      title: 'Berhasil menambahkan user shipping',
    });

    yield put(postUserShippingSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield Swal.fire({
      icon: 'error',
      title: `Error ${error.response.status} : ${error.response.data.error}`,
    });

    yield put(postUserShippingFailure(error));
  }
}

function* createPayment({ payload }) {
  const requestUrl = '/api/v1/payment/create';
  try {
    const response = yield call(request, requestUrl, {
      method: 'post',
      data: payload,
    });

    yield window.open(response.data.redirect_url, '_self');

    yield put(createPaymentSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(createPaymentFailure(error));
  }
}

function* getDermatologist({ date }) {
  const requestUrl = `/api/v1/dermatologist/schedule?date_appointment=${date}`;

  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getDermatologistSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getDermatologistFailure(error));
  }
}

export default function* createAccountSaga() {
  yield takeLatest(CREATE_ACCOUNT_REQUEST, registerNewUser);
  yield takeLatest(GET_DIAGNOSE_ID_REQUEST, getDiagnose);
  yield takeLatest(GET_CARE_OPTION_REQUEST, getCareOption);
  yield takeLatest(POST_CARE_OPTION_VIDCALL_REQUEST, postCareOptionVidcall);
  yield takeLatest(POST_CARE_OPTION_PRODUCT_REQUEST, postCareOptionProduct);
  yield takeLatest(POST_USER_SHIPPING_REQUEST, postUserShipping);
  yield takeLatest(CREATE_PAYMENT_REQUEST, createPayment);
  yield takeLatest(ACCOUNT_DETAIL_REQUEST, getAccountDetail);
  yield takeLatest(GET_DERMATOLOGIST_REQUEST, getDermatologist);
}
