"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.paymentGatewaysRequest = paymentGatewaysRequest;
exports.paymentGatewaysSuccess = paymentGatewaysSuccess;
exports.paymentGatewaysFailure = paymentGatewaysFailure;

var _constants = require("./constants");

// * Get Pgs
function paymentGatewaysRequest() {
  return {
    type: _constants.PAYMENT_GATEWAYS_REQUEST
  };
}

function paymentGatewaysSuccess(payload) {
  return {
    type: _constants.PAYMENT_GATEWAYS_SUCCESS,
    payload: payload
  };
}

function paymentGatewaysFailure(error) {
  return {
    type: _constants.PAYMENT_GATEWAYS_FAILURE,
    error: error
  };
}