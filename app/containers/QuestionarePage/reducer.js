/* eslint-disable consistent-return */
import produce from 'immer';
import {
  QUESTIONNAIRE_LIST_DETAIL_REQUEST,
  QUESTIONNAIRE_LIST_DETAIL_FAILURE,
  QUESTIONNAIRE_LIST_DETAIL_SUCCESS,
  QUESTIONNAIRE_SEND_ANSWER_REQUEST,
  QUESTIONNAIRE_SEND_ANSWER_FAILURE,
  QUESTIONNAIRE_SEND_ANSWER_SUCCESS,
} from './constants';

export const initialState = {
  loading: true,
  questionnaire: [],
  fullData: null,
  isError: false,
  error: null,
};

const questionnaireReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case QUESTIONNAIRE_LIST_DETAIL_REQUEST:
        draft.loading = true;
        draft.isError = false;
        draft.error = null;
        break;
      case QUESTIONNAIRE_LIST_DETAIL_SUCCESS:
        draft.loading = false;
        draft.isError = false;
        draft.error = null;
        draft.fullData = action.payload;
        draft.questionnaire = action.formComponent;
        break;
      case QUESTIONNAIRE_LIST_DETAIL_FAILURE:
        draft.loading = false;
        draft.isError = true;
        draft.error = action.error;
        break;
      case QUESTIONNAIRE_SEND_ANSWER_REQUEST:
        draft.loading = true;
        draft.isError = false;
        draft.error = null;
        break;
      case QUESTIONNAIRE_SEND_ANSWER_SUCCESS:
        draft.loading = false;
        draft.isError = false;
        draft.error = null;
        break;
      case QUESTIONNAIRE_SEND_ANSWER_FAILURE:
        draft.loading = false;
        draft.isError = true;
        draft.error = action.error;
        break;
      default:
        return {
          ...draft,
        };
    }
  });

export default questionnaireReducer;
