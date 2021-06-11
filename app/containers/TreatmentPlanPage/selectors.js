import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectTreatmentDetail = (state) => state.treatmentDetail || initialState;

const makeSelectLoading = () =>
  createSelector(selectTreatmentDetail, (state) => state.loading);

const makeSelectLoadingAdd = () =>
  createSelector(selectTreatmentDetail, (state) => state.loadingAdd);

const makeSelectError = () =>
  createSelector(selectTreatmentDetail, (state) => state.error);

const makeSelectIsSuccess = () =>
  createSelector(selectTreatmentDetail, (state) => state.isSuccess);

const makeSelectTreatmentDetail = () =>
  createSelector(selectTreatmentDetail, (state) => state.treatmentDetail);

export {
  makeSelectLoading,
  makeSelectError,
  makeSelectTreatmentDetail,
  makeSelectIsSuccess,
  makeSelectLoadingAdd,
};
