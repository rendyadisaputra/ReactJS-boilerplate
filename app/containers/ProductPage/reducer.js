/* eslint-disable consistent-return */
import produce from 'immer';

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
  // * Journey
  JOURNEY_FETCH_REQUEST,
  JOURNEY_FETCH_FAILURE,
  JOURNEY_FETCH_SUCCESS,
} from './constants';

export const initialState = {
  products: [],
  detailProduct: null,
  cart: [],
  productCount: 0,
  journey: null,
  loading: false,
  loadingAdd: false,
  error: null,
  successAdd: false,
};

const productPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // * User Journey
      case JOURNEY_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case JOURNEY_FETCH_FAILURE:
        draft.loading = false;
        draft.error = null;
        draft.journey = {
          dm_id: null,
          diagnose_id: null,
          result_batch: null,
          diagnose_title: null,
          diagnose_description: null,
          diagnose_status: null,
          diagnose_skin_type: null,
          skin_survey: null,
          order: null,
          dermatologist_appointment: null,
          prescriptions_formulated: null,
          order_delivery: null,
          follow_up_appointment: null,
        };
        break;
      case JOURNEY_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.journey = action.payload;
        // console.log(" success journey ", action)
        break;

      // * Product List
      case PRODUCT_LIST_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case PRODUCT_LIST_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case PRODUCT_LIST_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.products = action.payload;
        console.log("action payload ", action.payload)
        break;

      // * Product Recommended
      case PRODUCT_REC_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case PRODUCT_REC_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case PRODUCT_REC_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.products = action.payload;
        break;

      // * Product Detail
      case PRODUCT_DETAIL_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case PRODUCT_DETAIL_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case PRODUCT_DETAIL_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.detailProduct = action.payload;
        break;

      // * Get Transaction
      case GET_TRANSACTION_REQUEST:
        draft.loading = false;
        draft.error = null;
        break;
      case GET_TRANSACTION_FAILURE:
        draft.loading = false;
        draft.error = null;
        draft.cart = [];
        draft.isSuccess = false;
        break;
      case GET_TRANSACTION_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.cart = action.payload;
        draft.isSuccess = false;
        draft.productCount = action.productCount;
        break;

      // * Create Order
      case ADD_TRANSACTION_REQUEST:
        draft.loadingAdd = true;
        draft.error = null;
        draft.successAdd = false;
        break;
      case ADD_TRANSACTION_FAILURE:
        draft.loadingAdd = false;
        draft.error = null;
        draft.successAdd = false;
        break;
      case ADD_TRANSACTION_SUCCESS:
        draft.loadingAdd = false;
        draft.error = null;
        draft.successAdd = true;
        break;
      default:
        return {
          ...draft,
        };
    }
  });

export default productPageReducer;
