import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectData = (state) => state.data || initialState;

const makeSelectLoading = () =>
  createSelector(selectData, (state) => state.loading);

const makeSelectError = () =>
  createSelector(selectData, (state) => state.error);

const makeSelectIsError = () =>
  createSelector(selectData, (state) => state.isError);

const makeSelectData = () => createSelector(selectData, (state) => state.data);

export {
  selectData,
  makeSelectLoading,
  makeSelectError,
  makeSelectIsError,
  makeSelectData,
};
