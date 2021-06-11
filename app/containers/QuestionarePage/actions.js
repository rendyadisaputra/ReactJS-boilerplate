import {
  QUESTIONNAIRE_LIST_DETAIL_REQUEST,
  QUESTIONNAIRE_LIST_DETAIL_FAILURE,
  QUESTIONNAIRE_LIST_DETAIL_SUCCESS,
  QUESTIONNAIRE_SEND_ANSWER_REQUEST,
  QUESTIONNAIRE_SEND_ANSWER_FAILURE,
  QUESTIONNAIRE_SEND_ANSWER_SUCCESS,
} from './constants';

// * Get Questionnaire Detail
export function getQuestionnaireRequest() {
  return {
    type: QUESTIONNAIRE_LIST_DETAIL_REQUEST,
  };
}

export function getQuestionnaireSuccess(payload, formComponent) {
  return {
    type: QUESTIONNAIRE_LIST_DETAIL_SUCCESS,
    payload,
    formComponent,
  };
}

export function getQuestionnaireFailure(error) {
  return {
    type: QUESTIONNAIRE_LIST_DETAIL_FAILURE,
    error,
  };
}

// * Post Answer
export function sendAnswerRequest(payload) {
  return {
    type: QUESTIONNAIRE_SEND_ANSWER_REQUEST,
    payload,
  };
}

export function sendAnswerFailure(error) {
  return {
    type: QUESTIONNAIRE_SEND_ANSWER_FAILURE,
    error,
  };
}

export function sendAnswerSuccess(payload) {
  return {
    type: QUESTIONNAIRE_SEND_ANSWER_SUCCESS,
    payload,
  };
}
