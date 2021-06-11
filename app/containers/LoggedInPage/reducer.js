/* eslint-disable consistent-return */
import produce from 'immer';

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

export const initialState = {
  journey: null,
  guides: [],
  productRec: [],
  diagnose: null,
  treatmentCurrent: null,
  treatmentMessage: null,
  loading: false,
  loadingAdd: false,
  error: null,
  isSuccess: false,
};

const loggedInReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // * User Journey
      case JOURNEY_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isSuccess = false;
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
        draft.journeyList = action.payload.journeys;
        break;

      // * Guides
      case GUIDES_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case GUIDES_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case GUIDES_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.guides = action.payload;
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
        draft.productRec = action.payload;
        break;

      // * Diagnose
      case DIAGNOSE_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case DIAGNOSE_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case DIAGNOSE_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.diagnose = action.payload;
        break;

      // * Treatment Plan Message
      case TREATMENT_MESSAGE_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case TREATMENT_MESSAGE_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case TREATMENT_MESSAGE_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.treatmentMessage = action.payload;
        break;

      // * Create Order
      case ADD_TRANSACTION_REQUEST:
        draft.loadingAdd = true;
        draft.error = null;
        draft.isSuccess = true;
        break;
      case ADD_TRANSACTION_FAILURE:
        draft.loadingAdd = false;
        draft.error = null;
        draft.isSuccess = false;
        break;
      case ADD_TRANSACTION_SUCCESS:
        draft.loadingAdd = false;
        draft.error = null;
        draft.isSuccess = true;
        break;

      // * Clear Data
      case CLEAR_DATA:
        draft.loading = false;
        draft.error = null;
        draft.isSuccess = false;
        break;
      default:
        return {
          ...draft,
        };
    }
  });

export default loggedInReducer;
