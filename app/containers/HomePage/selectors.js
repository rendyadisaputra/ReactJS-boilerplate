import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectUserTestimony = (state) => state.userTestimony || initialState;

const makeSelectLoading = () =>
  createSelector(selectUserTestimony, (state) => state.loading);

const makeSelectError = () =>
  createSelector(selectUserTestimony, (state) => state.error);

const makeSelectUserTestimony = () =>
  createSelector(selectUserTestimony, (state) => state.userTestimony);

const makeSelectDoctorTestimony = () =>
  createSelector(selectUserTestimony, (state) => state.doctorTestimony);

const makeSelectPatientTestimony = () =>
  createSelector(selectUserTestimony, (state) => state.patientTestimony);

export {
  selectUserTestimony,
  makeSelectLoading,
  makeSelectError,
  makeSelectUserTestimony,
  makeSelectDoctorTestimony,
  makeSelectPatientTestimony,
};
