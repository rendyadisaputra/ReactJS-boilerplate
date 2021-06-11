import {
  GET_FAQ_REQUEST,
  GET_FAQ_FAILURE,
  GET_FAQ_SUCCESS,
  GET_FAQ_TITLE_REQUEST,
  GET_FAQ_TITLE_FAILURE,
  GET_FAQ_TITLE_SUCCESS,
} from './constants';

// * Get FAQ
export function getFaqRequest() {
  return {
    type: GET_FAQ_REQUEST,
  };
}

export function getFaqFailure(error) {
  return {
    type: GET_FAQ_FAILURE,
    error,
  };
}

export function getFaqSuccess(payload) {
  return {
    type: GET_FAQ_SUCCESS,
    payload,
  };
}

// * Get FAQ Title
export function getFaqTitleRequest() {
  return {
    type: GET_FAQ_TITLE_REQUEST,
  };
}

export function getFaqTitleFailure(error) {
  return {
    type: GET_FAQ_TITLE_FAILURE,
    error,
  };
}

export function getFaqTitleSuccess(payload) {
  return {
    type: GET_FAQ_TITLE_SUCCESS,
    payload,
  };
}
