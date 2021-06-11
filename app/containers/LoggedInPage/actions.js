import {
  JOURNEY_FETCH_REQUEST,
  JOURNEY_FETCH_FAILURE,
  JOURNEY_FETCH_SUCCESS,
  GUIDES_FETCH_REQUEST,
  GUIDES_FETCH_FAILURE,
  GUIDES_FETCH_SUCCESS,
  PRODUCT_REC_FETCH_REQUEST,
  PRODUCT_REC_FETCH_FAILURE,
  PRODUCT_REC_FETCH_SUCCESS,
  DIAGNOSE_FETCH_REQUEST,
  DIAGNOSE_FETCH_FAILURE,
  DIAGNOSE_FETCH_SUCCESS,
  TREATMENT_MESSAGE_FETCH_REQUEST,
  TREATMENT_MESSAGE_FETCH_FAILURE,
  TREATMENT_MESSAGE_FETCH_SUCCESS,
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_FAILURE,
  ADD_TRANSACTION_SUCCESS,
  CLEAR_DATA,
} from './constants';

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

// * Guides
export function getGuidesRequest() {
  return {
    type: GUIDES_FETCH_REQUEST,
  };
}

export function getGuidesFailure(error) {
  return {
    type: GUIDES_FETCH_FAILURE,
    error,
  };
}

export function getGuidesSuccess(payload) {
  return {
    type: GUIDES_FETCH_SUCCESS,
    payload,
  };
}

// * Diagnose
export function getDiagnoseRequest() {
  return {
    type: DIAGNOSE_FETCH_REQUEST,
  };
}

export function getDiagnoseFailure(error) {
  return {
    type: DIAGNOSE_FETCH_FAILURE,
    error,
  };
}

export function getDiagnoseSuccess(payload) {
  return {
    type: DIAGNOSE_FETCH_SUCCESS,
    payload,
  };
}

// * Treatment Plan Message
export function getTreatmentMessageRequest() {
  return {
    type: TREATMENT_MESSAGE_FETCH_REQUEST,
  };
}

export function getTreatmentMessageFailure(error) {
  return {
    type: TREATMENT_MESSAGE_FETCH_FAILURE,
    error,
  };
}

export function getTreatmentMessageSuccess(payload) {
  return {
    type: TREATMENT_MESSAGE_FETCH_SUCCESS,
    payload,
  };
}

// * Add Transaction (Add product to cart)
export function addToCartTransactionRequest(payload) {
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

// * Clear Data
export function clearData() {
  return {
    type: CLEAR_DATA,
  };
}
