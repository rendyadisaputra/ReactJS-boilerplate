import {
  PRODUCT_DETAIL_FETCH_REQUEST,
  PRODUCT_DETAIL_FETCH_FAILURE,
  PRODUCT_DETAIL_FETCH_SUCCESS,
} from './constants';

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
