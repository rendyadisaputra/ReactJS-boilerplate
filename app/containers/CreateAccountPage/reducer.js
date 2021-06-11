/* eslint-disable consistent-return */
import produce from 'immer';
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

export const initialState = {
  loading: false,
  userData: [],
  careOption: [],
  diagnose: null,
  transaction: null,
  accountDetail: null,
  dermatologist: [],
  error: null,
  isError: false,
  isSuccess: false,
  isSuccessVidcall: false,
};

const createAccountReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // * Register
      case CREATE_ACCOUNT_REQUEST:
        draft.loading = true;
        draft.userData = [];
        draft.error = null;
        draft.isError = false;
        break;
      case CREATE_ACCOUNT_SUCCESS:
        draft.loading = false;
        draft.userData = action.payload;
        draft.error = null;
        draft.isError = false;
        break;
      case CREATE_ACCOUNT_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        break;

      // * Diagnose Id
      case GET_DIAGNOSE_ID_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isError = false;
        break;
      case GET_DIAGNOSE_ID_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        break;
      case GET_DIAGNOSE_ID_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.diagnose = action.payload;
        draft.isError = false;
        break;

      // * Care Option
      case GET_CARE_OPTION_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isError = false;
        break;
      case GET_CARE_OPTION_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        break;
      case GET_CARE_OPTION_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.careOption = action.payload;
        draft.isError = false;
        break;

      // * Post Care Option Vidcall
      case POST_CARE_OPTION_VIDCALL_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isError = false;
        draft.isSuccessVidcall = false;
        break;
      case POST_CARE_OPTION_VIDCALL_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        draft.isSuccessVidcall = false;
        break;
      case POST_CARE_OPTION_VIDCALL_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.isError = false;
        draft.isSuccessVidcall = true;
        break;

      // * Post Care Option Product
      case POST_CARE_OPTION_PRODUCT_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isError = false;
        draft.isSuccess = false;
        break;
      case POST_CARE_OPTION_PRODUCT_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        draft.isSuccess = false;
        break;
      case POST_CARE_OPTION_PRODUCT_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.isError = false;
        draft.isSuccess = true;
        draft.transaction = action.payload;
        break;

      // * Post User Shipping
      case POST_USER_SHIPPING_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isError = false;
        draft.isSuccess = false;
        break;
      case POST_USER_SHIPPING_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        draft.isSuccess = false;
        break;
      case POST_USER_SHIPPING_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.isError = false;
        draft.isSuccess = true;
        break;

      // * Create Payment
      case CREATE_PAYMENT_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isError = false;
        draft.isSuccess = false;
        break;
      case CREATE_PAYMENT_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        draft.isSuccess = false;
        break;
      case CREATE_PAYMENT_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.isError = false;
        draft.isSuccess = true;
        break;

      // * Account
      case ACCOUNT_DETAIL_REQUEST:
        draft.loading = true;
        draft.isError = false;
        break;
      case ACCOUNT_DETAIL_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        break;
      case ACCOUNT_DETAIL_SUCCESS:
        draft.loading = false;
        draft.accountDetail = action.payload;
        draft.isError = false;
        break;

      // * Dermatologist
      case GET_DERMATOLOGIST_REQUEST:
        draft.loading = true;
        draft.isError = false;
        draft.dermatologist = [];
        break;
      case GET_DERMATOLOGIST_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        draft.dermatologist = [];
        break;
      case GET_DERMATOLOGIST_SUCCESS:
        draft.loading = false;
        draft.dermatologist = action.payload;
        draft.isError = false;
        break;
      default:
        return {
          ...draft,
        };
    }
  });

export default createAccountReducer;
