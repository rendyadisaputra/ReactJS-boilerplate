import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectProducts = (state) => state.detailProduct || initialState;

const makeSelectLoading = () =>
  createSelector(selectProducts, (state) => state.loading);

const makeSelectError = () =>
  createSelector(selectProducts, (state) => state.error);

const makeSelectDetailProduct = () =>
  createSelector(selectProducts, (state) => state.detailProduct);

export {
  selectProducts,
  makeSelectLoading,
  makeSelectError,
  makeSelectDetailProduct,
};
