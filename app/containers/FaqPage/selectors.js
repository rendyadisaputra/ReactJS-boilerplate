import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectFaq = (state) => state.faq || initialState;

const makeSelectLoading = () =>
  createSelector(selectFaq, (state) => state.loading);

const makeSelectError = () => createSelector(selectFaq, (state) => state.error);

const makeSelectFaq = () => createSelector(selectFaq, (state) => state.faq);

const makeSelectFaqTitle = () =>
  createSelector(selectFaq, (state) => state.faqTitle);

export {
  selectFaq,
  makeSelectLoading,
  makeSelectError,
  makeSelectFaq,
  makeSelectFaqTitle,
};
