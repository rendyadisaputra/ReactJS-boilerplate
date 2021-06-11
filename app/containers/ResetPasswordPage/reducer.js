/* eslint-disable consistent-return */
import produce from 'immer';
import {
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_FAILURE,
  RESET_PASSWORD_SUCCESS,
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
      case RESET_PASSWORD_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.isError = false;
        break;
      case RESET_PASSWORD_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.isError = true;
        break;
      case RESET_PASSWORD_SUCCESS:
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
