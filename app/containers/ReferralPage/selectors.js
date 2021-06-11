import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectReferral = (state) => state.referral || initialState;

const makeSelectLoading = () =>
  createSelector(selectReferral, (state) => state.loading);

const makeSelectError = () =>
  createSelector(selectReferral, (state) => state.error);

const makeSelectIsError = () =>
  createSelector(selectReferral, (state) => state.isError);

const makeSelectRefferal = () =>
  createSelector(selectReferral, (state) => state.referral);

export {
  selectReferral,
  makeSelectLoading,
  makeSelectError,
  makeSelectIsError,
  makeSelectRefferal,
};
