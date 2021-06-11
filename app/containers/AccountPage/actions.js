import {
  ACCOUNT_DETAIL_REQUEST,
  ACCOUNT_DETAIL_FAILURE,
  ACCOUNT_DETAIL_SUCCESS,
  // * Update Profile
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_SUCCESS,
} from './constants';

// * Get Account
export function accountDetailRequest() {
  return {
    type: ACCOUNT_DETAIL_REQUEST,
  };
}

export function accountDetailSuccess(payload) {
  return {
    type: ACCOUNT_DETAIL_SUCCESS,
    payload,
  };
}

export function accountDetailFailure(error) {
  return {
    type: ACCOUNT_DETAIL_FAILURE,
    error,
  };
}

// * Update Profile
export function updateProfileRequest(payload) {
  return {
    type: UPDATE_PROFILE_REQUEST,
    payload,
  };
}

export function updateProfileFailure(error) {
  return {
    type: UPDATE_PROFILE_FAILURE,
    error,
  };
}

export function updateProfileSuccess(payload) {
  return {
    type: UPDATE_PROFILE_SUCCESS,
    payload,
  };
}
