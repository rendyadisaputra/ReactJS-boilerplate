import {
  GET_ABOUT_US_REQUEST,
  GET_ABOUT_US_FAILURE,
  GET_ABOUT_US_SUCCESS,
} from './constants';

// * Get FAQ
export function getAboutUsRequest() {
  return {
    type: GET_ABOUT_US_REQUEST,
  };
}

export function getAboutUsFailure(error) {
  return {
    type: GET_ABOUT_US_FAILURE,
    error,
  };
}

export function getAboutUsSuccess(payload) {
  return {
    type: GET_ABOUT_US_SUCCESS,
    payload,
  };
}
