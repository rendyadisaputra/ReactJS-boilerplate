import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserData = (state) => state.userData || initialState;

const makeSelectLoading = () =>
  createSelector(selectUserData, (state) => state.loading);

const makeSelectUserData = () =>
  createSelector(selectUserData, (state) => state.userData);

const makeSelectError = () =>
  createSelector(selectUserData, (state) => state.error);

const makeSelectIsError = () =>
  createSelector(selectUserData, (state) => state.isError);

const makeSelectIsSuccess = () =>
  createSelector(selectUserData, (state) => state.isSuccess);

export {
  selectUserData,
  makeSelectError,
  makeSelectIsError,
  makeSelectLoading,
  makeSelectUserData,
  makeSelectIsSuccess,
};
