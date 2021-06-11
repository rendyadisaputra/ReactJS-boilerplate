import { call, put, takeLatest } from 'redux-saga/effects';
import Swal from 'sweetalert2';

import request from '../../utils/request';
import {
  accountDetailFailure,
  accountDetailSuccess,
  updateProfileFailure,
  updateProfileSuccess,
  provincesListSuccess,
  provincesListFailure
} from './actions';
import { ACCOUNT_DETAIL_REQUEST, PROVINCES_REQUEST, UPDATE_PROFILE_REQUEST } from './constants';

// * Account
export function* getAccountDetail() {
  const requestUrl = process.env.BASE_W_URL + '/wp-json/cocart/v1/user/my-account-detail/';
  try {
    const response = yield call(request, requestUrl, {
      method: 'GET',
    });
    yield put(accountDetailSuccess(response.detail));
  } catch (err) {
    const error = yield err;

    yield put(accountDetailFailure(error));
  }
}

export function* provincesListRequest() {
  const requestUrl = process.env.BASE_W_URL + '/wp-json/cocart/v1/provinces';
  try {
    const response = yield call(request, requestUrl, {
      method: 'GET',
    });
    yield put(provincesListSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(provincesListFailure(error));
  }
}


// * Update Profile
function* updateProfile({ payload }) {
  const requestUrl = process.env.BASE_W_URL + '/api/v1/user/edit';
  try {
    const response = yield call(request, requestUrl, {
      method: 'patch',
      data: payload,
    });

    yield Swal.fire({
      icon: 'success',
      title: 'Berhasil update akun',
    });

    yield put(updateProfileSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield Swal.fire({
      icon: 'error',
      title: 'Gagal update akun',
      text: `Error ${error.response.status} : ${error.response.data.error}`,
    });

    yield put(updateProfileFailure(error));
  }
}

export default function* accountDetailSaga() {
  yield takeLatest(ACCOUNT_DETAIL_REQUEST, getAccountDetail);
  yield takeLatest(UPDATE_PROFILE_REQUEST, updateProfile);
  yield takeLatest(PROVINCES_REQUEST, provincesListRequest);
}
