/* eslint-disable consistent-return */
import produce from 'immer';
import {
  LIST_TESTIMONY_FETCH_REQUEST,
  LIST_TESTIMONY_FETCH_FAILURE,
  LIST_TESTIMONY_FETCH_SUCCESS,
  PATIENT_TESTIMONY_FETCH_REQUEST,
  PATIENT_TESTIMONY_FETCH_FAILURE,
  PATIENT_TESTIMONY_FETCH_SUCCESS,
  DOCTOR_TESTIMONY_FETCH_REQUEST,
  DOCTOR_TESTIMONY_FETCH_FAILURE,
  DOCTOR_TESTIMONY_FETCH_SUCCESS,
} from './constants';

export const initialState = {
  userTestimony: [],
  doctorTestimony: [],
  patientTestimony: [],
  loading: false,
  error: null,
};

const homeReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // * List Testimony
      case LIST_TESTIMONY_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.userTestimony = [];
        break;
      case LIST_TESTIMONY_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.userTestimony = [];
        break;
      case LIST_TESTIMONY_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.userTestimony = action.payload;
        break;

      // * Patient Testimony
      case PATIENT_TESTIMONY_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.patientTestimony = [];
        break;
      case PATIENT_TESTIMONY_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.patientTestimony = [];
        break;
      case PATIENT_TESTIMONY_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.patientTestimony = action.payload;
        break;

      // * Doctor Testimony
      case DOCTOR_TESTIMONY_FETCH_REQUEST:
        draft.loading = true;
        draft.error = null;
        draft.doctorTestimony = [];
        break;
      case DOCTOR_TESTIMONY_FETCH_FAILURE:
        draft.loading = false;
        draft.error = action.error;
        draft.doctorTestimony = [];
        break;
      case DOCTOR_TESTIMONY_FETCH_SUCCESS:
        draft.loading = false;
        draft.error = null;
        draft.doctorTestimony = action.payload;
        break;
      default:
        return {
          ...draft,
        };
    }
  });

export default homeReducer;
