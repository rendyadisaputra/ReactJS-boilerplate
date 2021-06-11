import {
  GET_TRANSACTION_REQUEST,
  GET_TRANSACTION_FAILURE,
  GET_TRANSACTION_SUCCESS,
  
  GET_SHOPPING_CART_REQUEST,
  GET_SHOPPING_CART_SUCCESS,
  GET_SHOPPING_CART_FAILURE,

  GET_COUNT_SHOPPING_CART_REQUEST,
  GET_COUNT_SHOPPING_CART_SUCCESS,
  GET_COUNT_SHOPPING_CART_FAILURE,

  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_FAILURE,
  ADD_TRANSACTION_SUCCESS,

  CHANGE_AMOUNT_REQUEST,
  CHANGE_AMOUNT_FAILURE,
  CHANGE_AMOUNT_SUCCESS,
  // * Create Payment
  CREATE_PAYMENT_REQUEST,
  CREATE_PAYMENT_FAILURE,
  CREATE_PAYMENT_SUCCESS,
} from './constants';

// * Get Shoopping Cart
// * Get Transaction
export function getShoppingCartRequest() {
  return {
    type: GET_SHOPPING_CART_REQUEST,
  };
}

export function getShoppingCartFailure(error) {
  return {
    type: GET_SHOPPING_CART_FAILURE,
    error,
  };
}

export function getShoppingCartSuccess(payload, productCount) {
  return {
    type: GET_SHOPPING_CART_SUCCESS,
    payload,
    productCount,
  };
}

export function getCountShoppingCartRequest() {
  return {
    type: GET_COUNT_SHOPPING_CART_REQUEST,
  };
}

export function getCountShoppingCartFailure(error) {
  return {
    type: GET_COUNT_SHOPPING_CART_FAILURE,
    error,
  };
}

export function getCountShoppingCartSuccess(payload) {
  return {
    type: GET_COUNT_SHOPPING_CART_SUCCESS,
    payload
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

// * Create Payment
export function changeAmountRequest(amount, productId) {
  return {
    type: CHANGE_AMOUNT_REQUEST,
    amount,
    productId,
  };
}

export function changeAmountFailure(error) {
  return {
    type: CHANGE_AMOUNT_FAILURE,
    error,
  };
}

export function changeAmountSuccess() {
  return {
    type: CHANGE_AMOUNT_SUCCESS,
  };
}
