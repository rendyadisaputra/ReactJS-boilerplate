import { call, put, takeLatest } from 'redux-saga/effects';

import request from '../../utils/request';

import {
  getListTestimonyFailure,
  getDoctorTestimonyFailure,
  getPatientTestimonyFailure,
  getListTestimonySuccess,
  getDoctorTestimonySuccess,
  getPatientTestimonySuccess,
} from './actions';
import {
  LIST_TESTIMONY_FETCH_REQUEST,
  DOCTOR_TESTIMONY_FETCH_REQUEST,
  PATIENT_TESTIMONY_FETCH_REQUEST,
} from './constants';

//  * List Testimony
export function* getListTestimony() {
  const requestUrl = '/api/v1/content/testimony';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getListTestimonySuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getListTestimonyFailure(error));
  }
}

//  * Doctor Testimony
export function* getDoctorTestimony() {
  const requestUrl = '/api/v1/content/testimony/doctor';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getDoctorTestimonySuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getDoctorTestimonyFailure(error));
  }
}

//  * Patient Testimony
export function* getPatientTestimony() {
  const requestUrl = '/api/v1/content/testimony/patient';
  try {
    const response = yield call(request, requestUrl, {
      method: 'get',
    });

    yield put(getPatientTestimonySuccess(response.data));
  } catch (err) {
    const error = yield err;

    yield put(getPatientTestimonyFailure(error));
  }
}

export default function* homeSaga() {
  yield takeLatest(LIST_TESTIMONY_FETCH_REQUEST, getListTestimony);
  yield takeLatest(DOCTOR_TESTIMONY_FETCH_REQUEST, getDoctorTestimony);
  yield takeLatest(PATIENT_TESTIMONY_FETCH_REQUEST, getPatientTestimony);
}
