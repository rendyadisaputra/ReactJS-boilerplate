import {
  // * Register
  CREATE_ACCOUNT_REQUEST,
  CREATE_ACCOUNT_FAILURE,
  CREATE_ACCOUNT_SUCCESS,
  // * Get Care Option
  GET_DIAGNOSE_ID_REQUEST,
  GET_DIAGNOSE_ID_FAILURE,
  GET_DIAGNOSE_ID_SUCCESS,
  GET_CARE_OPTION_REQUEST,
  GET_CARE_OPTION_FAILURE,
  GET_CARE_OPTION_SUCCESS,
  // * Post Care Option
  POST_CARE_OPTION_VIDCALL_REQUEST,
  POST_CARE_OPTION_VIDCALL_FAILURE,
  POST_CARE_OPTION_VIDCALL_SUCCESS,
  POST_CARE_OPTION_PRODUCT_REQUEST,
  POST_CARE_OPTION_PRODUCT_FAILURE,
  POST_CARE_OPTION_PRODUCT_SUCCESS,
  // * Post User Shipping
  POST_USER_SHIPPING_REQUEST,
  POST_USER_SHIPPING_FAILURE,
  POST_USER_SHIPPING_SUCCESS,
  // * Create Payment
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_SUCCESS,
  // * Account
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_DETAIL_FAILURE,
  ACCOUNT_DETAIL_SUCCESS,
  // * Dermatologist
  GET_DERMATOLOGIST_REQUEST,
  GET_DERMATOLOGIST_FAILURE,
  GET_DERMATOLOGIST_SUCCESS,
} from './constants';

// * Register
export function createAccountRequest(payload) {
  return {
    type: CREATE_ACCOUNT_REQUEST,
    payload,
  };
}

export function createAccountFailure(error) {
  return {
    type: CREATE_ACCOUNT_FAILURE,
    error,
  };
}

export function createAccountSuccess(payload) {
  return {
    type: CREATE_ACCOUNT_SUCCESS,
    payload,
  };
}

// * Diagnose ID
export function getDiagnoseIdRequest() {
  return {
    type: GET_DIAGNOSE_ID_REQUEST,
  };
}

export function getDiagnoseIdFailure(error) {
  return {
    type: GET_DIAGNOSE_ID_FAILURE,
    error,
  };
}

export function getDiagnoseIdSuccess(payload) {
  return {
    type: GET_DIAGNOSE_ID_SUCCESS,
    payload,
  };
}

// * Care Option
export function getCareOptionRequest() {
  return {
    type: GET_CARE_OPTION_REQUEST,
  };
}

export function getCareOptionFailure(error) {
  return {
    type: GET_CARE_OPTION_FAILURE,
    error,
  };
}

export function getCareOptionSuccess(payload) {
  return {
    type: GET_CARE_OPTION_SUCCESS,
    payload,
  };
}

// * Post Care Option Vidcall
export function postCareOptionVidcallRequest(payload) {
  return {
    type: POST_CARE_OPTION_VIDCALL_REQUEST,
    payload,
  };
}

export function postCareOptionVidcallFailure(error) {
  return {
    type: POST_CARE_OPTION_VIDCALL_FAILURE,
    error,
  };
}

export function postCareOptionVidcallSuccess(payload) {
  return {
    type: POST_CARE_OPTION_VIDCALL_SUCCESS,
    payload,
  };
}

// * Post Care Option Product
export function postCareOptionProductRequest(payload) {
  return {
    type: POST_CARE_OPTION_PRODUCT_REQUEST,
    payload,
  };
}

export function postCareOptionProductFailure(error) {
  return {
    type: POST_CARE_OPTION_PRODUCT_FAILURE,
    error,
  };
}

export function postCareOptionProductSuccess(payload) {
  return {
    type: POST_CARE_OPTION_PRODUCT_SUCCESS,
    payload,
  };
}

// * Post Care Option Product
export function postUserShippingRequest(payload) {
  return {
    type: POST_USER_SHIPPING_REQUEST,
    payload,
  };
}

export function postUserShippingFailure(error) {
  return {
    type: POST_USER_SHIPPING_FAILURE,
    error,
  };
}

export function postUserShippingSuccess(payload) {
  return {
    type: POST_USER_SHIPPING_SUCCESS,
    payload,
  };
}

// * Create Payment
export function createPaymentRequest(payload) {
  return {
    type: CREATE_PAYMENT_REQUEST,
    payload,
  };
}

export function createPaymentFailure(error) {
  return {
    type: CREATE_PAYMENT_FAILURE,
    error,
  };
}

export function createPaymentSuccess(payload) {
  return {
    type: CREATE_PAYMENT_SUCCESS,
    payload,
  };
}

// * Get Account
export function accountDetailRequest() {
  return {
    type: ACCOUNT_DETAIL_REQUEST,
  };
}

export function accountDetailFailure(error) {
  return {
    type: ACCOUNT_DETAIL_FAILURE,
    error,
  };
}

export function accountDetailSuccess(payload) {
  return {
    type: ACCOUNT_DETAIL_SUCCESS,
    payload,
  };
}

// * Dermatologist
export function getDermatologistRequest(date) {
  return {
    type: GET_DERMATOLOGIST_REQUEST,
    date,
  };
}

export function getDermatologistFailure(error) {
  return {
    type: GET_DERMATOLOGIST_FAILURE,
    error,
  };
}

export function getDermatologistSuccess(payload) {
  return {
    type: GET_DERMATOLOGIST_SUCCESS,
    payload,
  };
}
