"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSelectIsSuccess = exports.makeSelectPgsData = exports.makeSelectLoading = exports.makeSelectIsError = exports.makeSelectError = exports.selectPgsData = void 0;

var _reselect = require("reselect");

var _reducer = require("./reducer");

var selectPgsData = function selectPgsData(state) {
  return state.pgsData || _reducer.initialState;
};

exports.selectPgsData = selectPgsData;

var makeSelectLoading = function makeSelectLoading() {
  return (0, _reselect.createSelector)(selectPgsData, function (state) {
    return state.loading;
  });
};

exports.makeSelectLoading = makeSelectLoading;

var makeSelectPgsData = function makeSelectPgsData() {
  return (0, _reselect.createSelector)(selectPgsData, function (state) {
    return state.pgsData;
  });
};

exports.makeSelectPgsData = makeSelectPgsData;

var makeSelectError = function makeSelectError() {
  return (0, _reselect.createSelector)(selectPgsData, function (state) {
    return state.error;
  });
};

exports.makeSelectError = makeSelectError;

var makeSelectIsError = function makeSelectIsError() {
  return (0, _reselect.createSelector)(selectPgsData, function (state) {
    return state.isError;
  });
};

exports.makeSelectIsError = makeSelectIsError;

var makeSelectIsSuccess = function makeSelectIsSuccess() {
  return (0, _reselect.createSelector)(selectPgsData, function (state) {
    return state.isSuccess;
  });
};

exports.makeSelectIsSuccess = makeSelectIsSuccess;