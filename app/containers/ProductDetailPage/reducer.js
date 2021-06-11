/* eslint-disable consistent-return */
import produce from 'immer';

import {
  PRODUCT_DETAIL_FETCH_REQUEST,
  PRODUCT_DETAIL_FETCH_FAILURE,
  PRODUCT_DETAIL_FETCH_SUCCESS,
} from './constants';

export const initialState = {
  detailProduct: null,
  loading: false,
  error: null,
};

const productPageReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // * Product Detail
      case PRODUCT_DETAIL_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        break;
      case PRODUCT_DETAIL_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.detailProduct = null;
        break;
      case PRODUCT_DETAIL_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.detailProduct = action.payload;
        break;
      default:
        return {
          ...draft,
        };
    }
  });

export default productPageReducer;
