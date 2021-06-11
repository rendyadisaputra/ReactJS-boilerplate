import {
 PAYMENT_GATEWAYS_REQUEST,
 PAYMENT_GATEWAYS_FAILURE,
 PAYMENT_GATEWAYS_SUCCESS,

} from './constants';

// * Get Pgs
export function paymentGatewaysRequest() {
  return {
    type:PAYMENT_GATEWAYS_REQUEST,
  };
}

export function paymentGatewaysSuccess(payload) {
  return {
    type:PAYMENT_GATEWAYS_SUCCESS,
    payload,
  };
}

export function paymentGatewaysFailure(error) {
  return {
    type:PAYMENT_GATEWAYS_FAILURE,
    error,
  };
}
