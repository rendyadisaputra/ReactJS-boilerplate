import {
  REFERRAL_FETCH_REQUEST,
  REFERRAL_FETCH_FAILURE,
  REFERRAL_FETCH_SUCCESS,
} from './constants';

// * Referral Fetch
export function referralFetchRequest() {
  return {
    type: REFERRAL_FETCH_REQUEST,
  };
}

export function referralFetchFailure(error) {
  return {
    type: REFERRAL_FETCH_FAILURE,
    error,
  };
}

export function referralFetchSuccess(payload) {
  return {
    type: REFERRAL_FETCH_SUCCESS,
    payload,
  };
}
