/* eslint-disable consistent-return */
import produce from 'immer';
import {
  REFERRAL_FETCH_REQUEST,
  REFERRAL_FETCH_FAILURE,
  REFERRAL_FETCH_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: null,
  isError: false,
  referral: null,
};

const referralReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case REFERRAL_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isError = false;
        break;
      case REFERRAL_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        break;
      case REFERRAL_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.isError = false;
        draft.referral = action.payload;
        break;
      default:
        return draft;
    }
  });

export default referralReducer;
