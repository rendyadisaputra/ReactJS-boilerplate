/* eslint-disable consistent-return */
import produce from 'immer';
import {
  SENT_EMAIL_REQUEST,
  SENT_EMAIL_FAILURE,
  SENT_EMAIL_SUCCESS,
} from './constants';

export const initialState = {
  loading: false,
  error: null,
  isError: false,
  data: null,
};

const forgetPasswordReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case SENT_EMAIL_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isError = false;
        break;
      case SENT_EMAIL_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        break;
      case SENT_EMAIL_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.isError = false;
        draft.data = action.payload;
        break;
      default:
        return draft;
    }
  });

export default forgetPasswordReducer;
