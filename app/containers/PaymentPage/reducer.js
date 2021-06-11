/* eslint-disable consistent-return */
import produce from 'immer';
import {
  PAYMENT_GATEWAYS_REQUEST,
  PAYMENT_GATEWAYS_FAILURE,
  PAYMENT_GATEWAYS_SUCCESS,

} from './constants';

export const initialState = {
  loading: false,
  error: null,
  isError: false,
  isSuccess: false,
  pgsData: [],
};

const paymentGatewaysReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // * Account
      case PAYMENT_GATEWAYS_REQUEST:
        draft.loading = true;
        draft.pgsData = {};
        draft.isError = false;
        draft.isSuccess = false;
        break;
      case PAYMENT_GATEWAYS_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        draft.isSuccess = true;
        break;
      case PAYMENT_GATEWAYS_SUCCESS:
        draft.loading = false;
        draft.pgsData = action.payload;
        draft.isError = false;
        draft.isSuccess = true;
        break;

      default:
        return {
          ...draft,
        };
    }
  });

export default paymentGatewaysReducer;
