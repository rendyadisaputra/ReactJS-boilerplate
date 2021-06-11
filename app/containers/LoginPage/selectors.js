import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserData = (state) => state.userData || initialState;

const makeSelectLoading = () =>
  createSelector(selectUserData, (state) => state.loading);

const makeSelectError = () =>
  createSelector(selectUserData, (state) => state.error);

const makeSelectIsError = () =>
  createSelector(selectUserData, (state) => state.isError);

const makeSelectUserData = () =>
  createSelector(selectUserData, (state) => state.userData);

export {
  selectUserData,
  makeSelectLoading,
  makeSelectError,
  makeSelectIsError,
  makeSelectUserData,
};
