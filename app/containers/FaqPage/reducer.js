/* eslint-disable consistent-return */
import produce from 'immer';
import {
  GET_FAQ_REQUEST,
  GET_FAQ_FAILURE,
  GET_FAQ_SUCCESS,
  GET_FAQ_TITLE_REQUEST,
  GET_FAQ_TITLE_FAILURE,
  GET_FAQ_TITLE_SUCCESS,
} from './constants';

export const initialState = {
  faq: [],
  faqTitle: [],
  loading: false,
  error: null,
};

const faqReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // * Get Faq
      case GET_FAQ_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case GET_FAQ_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case GET_FAQ_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.faq = action.payload;
        break;

      // * Get Faq Title
      case GET_FAQ_TITLE_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case GET_FAQ_TITLE_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        break;
      case GET_FAQ_TITLE_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.faqTitle = action.payload;
        break;

      default:
        return {
          ...draft,
        };
    }
  });

export default faqReducer;
