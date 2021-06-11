import { call, takeLatest, put } from 'redux-saga/effects';
import Swal from 'sweetalert2';

// * Utils
import request from '../../utils/request';
import history from '../../utils/history';

// * Redux Saga
import {
  getQuestionnaireSuccess,
  getQuestionnaireFailure,
  sendAnswerFailure,
  sendAnswerSuccess,
} from './actions';
import {
  QUESTIONNAIRE_LIST_DETAIL_REQUEST,
  QUESTIONNAIRE_SEND_ANSWER_REQUEST,
} from './constants';

export function* getQuestionnaireDetail() {
  const requestUrl = '/api/v1/questionnaire';
  try {
    const response = yield call(request, requestUrl, {
      method: 'GET',
    });

    const questionnaireComponent = response.data.components;

    yield put(getQuestionnaireSuccess(response.data, questionnaireComponent));
  } catch (error) {
    const err = yield error;

    yield put(getQuestionnaireFailure(err));
  }
}

export function* postAnswerQuestionnaire({ payload }) {
  const requestUrl = '/api/v1/questionnaire';

  try {
    const response = yield call(request, requestUrl, {
      method: 'post',
      data: payload,
    });

    yield Swal.fire({
      title: 'Berhasil mengisi kuisoner',
      icon: 'success',
      text: 'Terimakasih sudah mengisi kuisoner',
    }).then(() => {
      history.replace('/service-plan', {
        activeIndex: 1,
      });
    });

    yield put(sendAnswerSuccess(response));
  } catch (err) {
    const error = yield err;

    yield Swal.fire({
      text: 'Gagal mengirim hasil jawabanmu',
      icon: 'error',
    });

    yield put(sendAnswerFailure(error));
  }
}

export default function* questionnaireSaga() {
  yield takeLatest(QUESTIONNAIRE_LIST_DETAIL_REQUEST, getQuestionnaireDetail);
  yield takeLatest(QUESTIONNAIRE_SEND_ANSWER_REQUEST, postAnswerQuestionnaire);
}
