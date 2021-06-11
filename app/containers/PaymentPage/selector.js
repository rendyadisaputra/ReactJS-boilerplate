import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPgsData = (state) => state.pgsData || initialState;

const makeSelectLoading = () =>
  createSelector(selectPgsData, (state) => state.loading);

const makeSelectPgsData = () =>
  createSelector(selectPgsData, (state) => state.pgsData);

const makeSelectError = () =>
  createSelector(selectPgsData, (state) => state.error);

const makeSelectIsError = () =>
  createSelector(selectPgsData, (state) => state.isError);

const makeSelectIsSuccess = () =>
  createSelector(selectPgsData, (state) => state.isSuccess);

export {
  selectPgsData,
  makeSelectError,
  makeSelectIsError,
  makeSelectLoading,
  makeSelectPgsData,
  makeSelectIsSuccess,
};
