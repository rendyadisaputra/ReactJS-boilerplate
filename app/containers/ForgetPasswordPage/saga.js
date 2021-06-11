import { call, takeLatest, put } from 'redux-saga/effects';
import request from 'utils/request';
import Swal from 'sweetalert2';

import { sentEmailFailure, sentEmailSuccess } from './actions';
import { SENT_EMAIL_REQUEST } from './constants';

function* forgetPassword({ payload }) {
  const requestUrl = '/api/v1/password/forgot';
  try {
    const response = yield call(request, requestUrl, {
      method: 'post',
      data: payload,
    });

    yield Swal.fire({
      icon: 'success',
      title: 'Berhasil mengirim email',
      text: 'Silakan cek inbox email anda untuk mengatur ulang kata sandi',
    }).then(() => window.location.replace('/'));

    yield put(sentEmailSuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield Swal.fire({
      icon: 'error',
      title: 'Gagal mengirim email',
      text: error.message,
    });

    yield put(sentEmailFailure(error));
  }
}

export default function* forgetPasswordSaga() {
  yield takeLatest(SENT_EMAIL_REQUEST, forgetPassword);
}
