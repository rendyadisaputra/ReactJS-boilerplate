import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectAbout = (state) => state.about || initialState;

const makeSelectLoading = () =>
  createSelector(selectAbout, (state) => state.loading);

const makeSelectError = () =>
  createSelector(selectAbout, (state) => state.error);

const makeSelectAbout = () =>
  createSelector(selectAbout, (state) => state.about);

export { selectAbout, makeSelectLoading, makeSelectError, makeSelectAbout };
