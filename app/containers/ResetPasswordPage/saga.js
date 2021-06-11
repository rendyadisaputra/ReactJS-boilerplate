import { call, takeLatest, put } from 'redux-saga/effects';
import request from 'utils/request';
import Swal from 'sweetalert2';

import { resetPasswordFailure, resetPasswordSuccess } from './actions';
import { RESET_PASSWORD_REQUEST } from './constants';

function* resetPassword({ payload }) {
  const requestUrl = '/api/v1/password/reset';
  try {
    const response = yield call(request, requestUrl, {
      method: 'post',
      data: payload,
    });

    yield Swal.fire({
      icon: 'success',
      title: 'Berhasil reset password',
      text: 'Silakan login kembali menggunakan password yang terbaru',
    }).then(() => window.location.replace('/login'));

    yield put(resetPasswordSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield Swal.fire({
      icon: 'error',
      title: 'Gagal reset password',
      text: error.message,
    });

    yield put(resetPasswordFailure(error));
  }
}

export default function* resetPasswordSaga() {
  yield takeLatest(RESET_PASSWORD_REQUEST, resetPassword);
}
