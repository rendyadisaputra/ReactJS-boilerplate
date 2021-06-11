import {
  GET_TREATMENT_DETAIL_REQUEST,
  GET_TREATMENT_DETAIL_FAILURE,
  GET_TREATMENT_DETAIL_SUCCESS,
  // * Transaction
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_FAILURE,
  ADD_TRANSACTION_SUCCESS,
} from './constants';

// * Get Treatment Plan Detail
export function getTreatmentPlanDetailRequest(id) {
  return {
    type: GET_TREATMENT_DETAIL_REQUEST,
    id,
  };
}

export function getTreatmentPlanDetailFailure(error) {
  return {
    type: GET_TREATMENT_DETAIL_FAILURE,
    error,
  };
}

export function getTreatmentPlanDetailSuccess(payload) {
  return {
    type: GET_TREATMENT_DETAIL_SUCCESS,
    payload,
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
