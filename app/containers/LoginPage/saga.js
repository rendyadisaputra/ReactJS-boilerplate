import { call, takeLatest, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';

// * Utils
import request from '../../utils/request';
import { setCookie } from '../../utils/cookie';

// * Redux Saga
import { loginFailure, loginSuccess } from './actions';
import { LOGIN_REQUEST } from './constants';

export function* login({ payload }) {
  console.log(process.env.BASE_W_URL);
  payload.username = payload.email;
  const requestUrl =  process.env.BASE_W_URL+'wp-json/jwt-auth/v1/token';
  try {
    const response = yield call(request, requestUrl, {
      method: 'POST',
      data: payload,
    });
    var d = new Date();
    var expire = d.getTime()+(8640*1000);
    setCookie(
      'secret',
      JSON.stringify(response),
      expire,
    );

    yield Swal.fire({
      title: 'Sign In Berhasil',
      icon: 'success',
      text: `Anda berhasil login sebagai ${response.user_nicename}`,
    }).then(() => {
      window.location.replace('/');
    });

    yield put(loginSuccess(response));
  } catch (err) {
    const error = yield err;
    console.log(" err ", error.response.data ? error.response.data.message : error)
    yield Swal.fire({
      title: 'Gagal Sign In',
      icon: 'error',
      text: `Error ${error.response.status} : ${
        error.response.data ? error.response.data.message : error
      }`,
    });

    yield put(loginFailure(error.response.data));
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
