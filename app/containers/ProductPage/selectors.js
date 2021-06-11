import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectProducts = (state) => state.products || initialState;

const makeSelectLoading = () =>
  createSelector(selectProducts, (state) => state.loading);

const makeSelectLoadingAdd = () =>
  createSelector(selectProducts, (state) => state.loadingAdd);

const makeSelectError = () =>
  createSelector(selectProducts, (state) => state.error);

const makeSelectSuccessAdd = () =>
  createSelector(selectProducts, (state) => state.successAdd);

const makeSelectProducts = () =>
  createSelector(selectProducts, (state) => state.products);

const makeSelectDetailProduct = () =>
  createSelector(selectProducts, (state) => state.detailProduct);

const makeSelectJourney = () =>
  createSelector(selectProducts, (state) => state.journey);

export {
  selectProducts,
  makeSelectLoading,
  makeSelectLoadingAdd,
  makeSelectError,
  makeSelectProducts,
  makeSelectDetailProduct,
  makeSelectSuccessAdd,
  makeSelectJourney,
};
