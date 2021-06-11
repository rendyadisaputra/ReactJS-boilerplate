import {
  PRODUCT_LIST_FETCH_REQUEST,
  PRODUCT_LIST_FETCH_FAILURE,
  PRODUCT_LIST_FETCH_SUCCESS,
  PRODUCT_REC_FETCH_REQUEST,
  PRODUCT_REC_FETCH_FAILURE,
  PRODUCT_REC_FETCH_SUCCESS,
  PRODUCT_DETAIL_FETCH_REQUEST,
  PRODUCT_DETAIL_FETCH_FAILURE,
  PRODUCT_DETAIL_FETCH_SUCCESS,
  // * Transactions
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_FAILURE,
  GET_TRANSACTION_SUCCESS,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_FAILURE,
  ADD_TRANSACTION_SUCCESS,
  // * Account
  JOURNEY_FETCH_REQUEST,
  JOURNEY_FETCH_FAILURE,
  JOURNEY_FETCH_SUCCESS,
} from './constants';

// * Product Recommended
export function getProductListRequest() {
  return {
    type: PRODUCT_LIST_FETCH_REQUEST,
  };
}

export function getProductListFailure(error) {
  return {
    type: PRODUCT_LIST_FETCH_FAILURE,
    error,
  };
}

export function getProductListSuccess(payload) {
  return {
    type: PRODUCT_LIST_FETCH_SUCCESS,
    payload,
  };
}

// * Product Recommended
export function getProductRecRequest() {
  return {
    type: PRODUCT_REC_FETCH_REQUEST,
  };
}

export function getProductRecFailure(error) {
  return {
    type: PRODUCT_REC_FETCH_FAILURE,
    error,
  };
}

export function getProductRecSuccess(payload) {
  return {
    type: PRODUCT_REC_FETCH_SUCCESS,
    payload,
  };
}

// * Product Detail
export function getProductDetailRequest(id) {
  return {
    type: PRODUCT_DETAIL_FETCH_REQUEST,
    id,
  };
}

export function getProductDetailFailure(error) {
  return {
    type: PRODUCT_DETAIL_FETCH_FAILURE,
    error,
  };
}

export function getProductDetailSuccess(payload) {
  return {
    type: PRODUCT_DETAIL_FETCH_SUCCESS,
    payload,
  };
}

// * Get Transaction
export function getTransactionRequest() {
  return {
    type: GET_TRANSACTION_REQUEST,
  };
}

export function getTransactionFailure(error) {
  return {
    type: GET_TRANSACTION_FAILURE,
    error,
  };
}

export function getTransactionSuccess(payload, productCount) {
  return {
    type: GET_TRANSACTION_SUCCESS,
    payload,
    productCount,
  };
}

// * Add Transaction (Add product to cart)
export function addTransactionRequest(payload) {
  return {
    type: ADD_TRANSACTION_REQUEST,
    payload,
  };
}

export function addTransactionFailure(error) {
  return {
    type: ADD_TRANSACTION_FAILURE,
    error,
  };
}

export function addTransactionSuccess(payload) {
  return {
    type: ADD_TRANSACTION_SUCCESS,
    payload,
  };
}

// * Journey
export function getJourneyRequest() {
  return {
    type: JOURNEY_FETCH_REQUEST,
  };
}

export function getJourneyFailure(error) {
  return {
    type: JOURNEY_FETCH_FAILURE,
    error,
  };
}

export function getJourneySuccess(payload) {
  return {
    type: JOURNEY_FETCH_SUCCESS,
    payload,
  };
}
