/* eslint-disable consistent-return */
import produce from 'immer';
import { LOGIN_REQUEST, LOGIN_FAILURE, LOGIN_SUCCESS } from './constants';

export const initialState = {
  loading: false,
  userData: [],
  isError: false,
  error: null,
};

const loginReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case LOGIN_REQUEST:
        draft.loading = true;
        draft.isError = false;
        draft.error = null;
        break;
      case LOGIN_SUCCESS:
        draft.loading = false;
        draft.isError = false;
        draft.userData = action.payload;
        draft.error = null;
        break;
      case LOGIN_FAILURE:
        draft.loading = false;
        draft.isError = true;
        draft.error = action.error;
        break;
      default:
        return {
          ...draft,
        };
    }
  });

export default loginReducer;
