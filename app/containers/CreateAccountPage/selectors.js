import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserData = (state) => state.userData || initialState;

const makeSelectLoading = () =>
  createSelector(selectUserData, (state) => state.loading);

const makeSelectUserData = () =>
  createSelector(selectUserData, (state) => state.userData);

const makeSelectDiagnose = () =>
  createSelector(selectUserData, (state) => state.diagnose);

const makeSelectCareOption = () =>
  createSelector(selectUserData, (state) => state.careOption);

const makeSelectError = () =>
  createSelector(selectUserData, (state) => state.error);

const makeSelectIsError = () =>
  createSelector(selectUserData, (state) => state.isError);

const makeSelectIsSuccess = () =>
  createSelector(selectUserData, (state) => state.isSuccess);

const makeSelectIsSuccessVidCall = () =>
  createSelector(selectUserData, (state) => state.isSuccessVidcall);

const makeSelectTransaction = () =>
  createSelector(selectUserData, (state) => state.transaction);

const makeSelectAccountDetail = () =>
  createSelector(selectUserData, (state) => state.accountDetail);

const makeSelectDermatologist = () =>
  createSelector(selectUserData, (state) => state.dermatologist);

export {
  selectUserData,
  makeSelectLoading,
  makeSelectUserData,
  makeSelectError,
  makeSelectIsError,
  makeSelectDiagnose,
  makeSelectCareOption,
  makeSelectIsSuccess,
  makeSelectTransaction,
  makeSelectAccountDetail,
  makeSelectDermatologist,
  makeSelectIsSuccessVidCall,
};
