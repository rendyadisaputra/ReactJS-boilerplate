/* eslint-disable consistent-return */
import produce from 'immer';
import {
  GET_TREATMENT_DETAIL_REQUEST,
  GET_TREATMENT_DETAIL_FAILURE,
  GET_TREATMENT_DETAIL_SUCCESS,
  // * Transaction
  ADD_TRANSACTION_REQUEST,
  ADD_TRANSACTION_FAILURE,
  ADD_TRANSACTION_SUCCESS,
} from './constants';

export const initialState = {
  treatmentDetail: null,
  loading: false,
  loadingAdd: false,
  error: null,
  isSuccess: false,
};

const treatmentPlanReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case GET_TREATMENT_DETAIL_REQUEST:
        draft.isSuccess = false;
        draft.loading = true;
        draft.error = null;
        break;
      case GET_TREATMENT_DETAIL_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case GET_TREATMENT_DETAIL_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.treatmentDetail = action.payload;
        break;

      // * Create Order
      case ADD_TRANSACTION_REQUEST:
        draft.loadingAdd = true;
        draft.error = null;
        draft.isSuccess = false;
        break;
      case ADD_TRANSACTION_FAILURE:
        draft.loadingAdd = false;
        draft.error = action.error;
        draft.isSuccess = false;
        break;
      case ADD_TRANSACTION_SUCCESS:
        draft.loadingAdd = false;
        draft.error = null;
        draft.isSuccess = true;
        break;
      default:
        return {
          ...draft,
        };
    }
  });

export default treatmentPlanReducer;
