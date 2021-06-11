/* eslint-disable consistent-return */
import produce from 'immer';
import {
  GET_ABOUT_US_REQUEST,
  GET_ABOUT_US_FAILURE,
  GET_ABOUT_US_SUCCESS,
} from './constants';

export const initialState = {
  about: [],
  loading: false,
  error: null,
};

const faqReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // * Get About
      case GET_ABOUT_US_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case GET_ABOUT_US_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case GET_ABOUT_US_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.about = action.payload;
        break;

      default:
        return {
          ...draft,
        };
    }
  });

export default faqReducer;
