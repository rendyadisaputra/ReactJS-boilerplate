import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectCart = (state) => state.cart || initialState;

const makeSelectLoading = () =>
  createSelector(selectCart, (state) => state.loading);

const makeSelectError = () =>
  createSelector(selectCart, (state) => state.error);

const makeSelectIsSuccess = () =>
  createSelector(selectCart, (state) => state.isSuccess);

const makeSelectCart = () => createSelector(selectCart, (state) => state.cart);

const makeSelectProductCount = () =>
  createSelector(selectCart, (state) => state.productCount);

export {
  selectCart,
  makeSelectLoading,
  makeSelectError,
  makeSelectIsSuccess,
  makeSelectCart,
  makeSelectProductCount,
};
