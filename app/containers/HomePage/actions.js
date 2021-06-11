import {
  LIST_TESTIMONY_FETCH_REQUEST,
  LIST_TESTIMONY_FETCH_FAILURE,
  LIST_TESTIMONY_FETCH_SUCCESS,
  PATIENT_TESTIMONY_FETCH_REQUEST,
  PATIENT_TESTIMONY_FETCH_FAILURE,
  PATIENT_TESTIMONY_FETCH_SUCCESS,
  DOCTOR_TESTIMONY_FETCH_REQUEST,
  DOCTOR_TESTIMONY_FETCH_FAILURE,
  DOCTOR_TESTIMONY_FETCH_SUCCESS,
} from './constants';

// * List Testimony
export function getListTestimonyRequest() {
  return {
    type: LIST_TESTIMONY_FETCH_REQUEST,
  };
}

export function getListTestimonyFailure(error) {
  return {
    type: LIST_TESTIMONY_FETCH_FAILURE,
    error,
  };
}

export function getListTestimonySuccess(payload) {
  return {
    type: LIST_TESTIMONY_FETCH_SUCCESS,
    payload,
  };
}

// * Patient Testimony
export function getPatientTestimonyRequest() {
  return {
    type: PATIENT_TESTIMONY_FETCH_REQUEST,
  };
}

export function getPatientTestimonyFailure(error) {
  return {
    type: PATIENT_TESTIMONY_FETCH_FAILURE,
    error,
  };
}

export function getPatientTestimonySuccess(payload) {
  return {
    type: PATIENT_TESTIMONY_FETCH_SUCCESS,
    payload,
  };
}

// * Doctor Testimony
export function getDoctorTestimonyRequest() {
  return {
    type: DOCTOR_TESTIMONY_FETCH_REQUEST,
  };
}

export function getDoctorTestimonyFailure(error) {
  return {
    type: DOCTOR_TESTIMONY_FETCH_FAILURE,
    error,
  };
}

export function getDoctorTestimonySuccess(payload) {
  return {
    type: DOCTOR_TESTIMONY_FETCH_SUCCESS,
    payload,
  };
}
