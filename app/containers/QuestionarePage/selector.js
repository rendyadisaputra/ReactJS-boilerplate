import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectQuestionnaire = (state) => state.questionnaire || initialState;

const makeSelectLoading = () =>
  createSelector(selectQuestionnaire, (state) => state.loading);

const makeSelectError = () =>
  createSelector(selectQuestionnaire, (state) => state.error);

const makeSelectIsError = () =>
  createSelector(selectQuestionnaire, (state) => state.isError);

const makeSelectQuestionnaire = () =>
  createSelector(selectQuestionnaire, (state) => state.questionnaire);

const makeSelectFullData = () =>
  createSelector(selectQuestionnaire, (state) => state.fullData);

export {
  selectQuestionnaire,
  makeSelectLoading,
  makeSelectIsError,
  makeSelectError,
  makeSelectQuestionnaire,
  makeSelectFullData,
};
