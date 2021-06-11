/* eslint-disable consistent-return */
import produce from 'immer';
import {
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_DETAIL_FAILURE,
  ACCOUNT_DETAIL_SUCCESS,
  // * Update Profile
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
  // * Provinces

  PROVINCES_REQUEST,
  PROVINCES_SUCCESS,
  PROVINCES_FAILURE
} from './constants';

export const initialState = {
  loading: false,
  error: null,
  isError: false,
  isSuccess: false,
  userData: {},
  provinces: [],
  shippingActiveIndex: ""
};

const accountDetailReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // * Account
      case ACCOUNT_DETAIL_REQUEST:
        draft.loading = true;
        draft.userData = {};
        draft.isError = false;
        draft.isSuccess = false;
        break;
      case ACCOUNT_DETAIL_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        draft.isSuccess = true;
        break;
      case ACCOUNT_DETAIL_SUCCESS:
        draft.loading = false;
        draft.userData = action.payload;
        draft.isError = false;
        draft.isSuccess = true;
        break;

      // * Update Profile
      case UPDATE_PROFILE_REQUEST:
        draft.loading = true;
        draft.isError = false;
        break;
      case UPDATE_PROFILE_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        break;
      case UPDATE_PROFILE_SUCCESS:
        draft.loading = false;
        draft.isError = false;
        break;

      case PROVINCES_REQUEST:
        draft.loading = true;
        draft.isError = false;
        break;
      case PROVINCES_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        break;
      case PROVINCES_SUCCESS:
        draft.loading = false;
        draft.isError = false;
        draft.provinces = action.payload;
        break;
  
      default:
        return {
          ...draft,
        };
    }
  });

export default accountDetailReducer;
