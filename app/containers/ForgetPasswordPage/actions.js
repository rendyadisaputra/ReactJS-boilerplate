import {
  SENT_EMAIL_REQUEST,
  SENT_EMAIL_FAILURE,
  SENT_EMAIL_SUCCESS,
} from './constants';

// * Sent Email
export function sentEmailRequest(payload) {
  return {
    type: SENT_EMAIL_REQUEST,
    payload,
  };
}

export function sentEmailFailure(error) {
  return {
    type: SENT_EMAIL_FAILURE,
    error,
  };
}

export function sentEmailSuccess(payload) {
  return {
    type: SENT_EMAIL_SUCCESS,
    payload,
  };
}
