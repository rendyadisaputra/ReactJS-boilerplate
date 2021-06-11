import { createSelector } from 'reselect';

import { initialState } from './reducer';

const selectJourney = (state) => state.journey || initialState;

const makeSelectLoading = () =>
    createSelector(selectJourney, (state) => state.loading);

const makeSelectLoadingAdd = () =>
    createSelector(selectJourney, (state) => state.loadingAdd);

const makeSelectError = () =>
    createSelector(selectJourney, (state) => state.error);

const makeSelectJourney = () =>
    createSelector(selectJourney, (state) => state.journey);

const makeSelectJourneyList = () =>
    createSelector(selectJourney, (state) => state.journeyList);

const makeSelectGuides = () =>
    createSelector(selectJourney, (state) => state.guides);

const makeSelectProductRecommended = () =>
    createSelector(selectJourney, (state) => state.productRec);

const makeSelectDiagnose = () =>
    createSelector(selectJourney, (state) => state.diagnose);

const makeSelectIsSuccess = () =>
    createSelector(selectJourney, (state) => state.isSuccess);

const makeSelectTreatmentMessage = () =>
    createSelector(selectJourney, (state) => state.treatmentMessage);

export {
    selectJourney,
    makeSelectLoading,
    makeSelectError,
    makeSelectJourney,
    makeSelectJourneyList,
    makeSelectGuides,
    makeSelectProductRecommended,
    makeSelectDiagnose,
    makeSelectTreatmentMessage,
    makeSelectIsSuccess,
    makeSelectLoadingAdd,
};