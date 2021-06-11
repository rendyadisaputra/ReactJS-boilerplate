/* eslint-disable no-restricted-syntax */
import { useEffect } from 'react';
import { useLocation } from 'react-router';
import Swal from 'sweetalert2';
import qs from 'qs';
import { stepperKey } from './GlobalConstant';

let completeIndex = -1;

// eslint-disable-next-line consistent-return
export function isInputError(formik, fieldName) {
  if (formik.errors[fieldName] && formik.touched[fieldName]) {
    return formik.errors[fieldName];
  }
}

export function showAlert(title, message, type) {
  return Swal.fire({
    title,
    text: message,
    icon: type,
  });
}

export function parseNumFormat(amount) {
  if (amount) {
    return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  }
  return 0;
}

/**
 * @function Helper_Question_Page
 * @description Helper Questionnaire Page
 */

export function renderQuestionTitle(questionnaire, index) {
  if (questionnaire.length > 0) {
    return questionnaire[index].form_component_comp_title;
  }

  return 'Title Questionnaire';
}

export function renderQuestionDescription(questionnaire, index) {
  if (questionnaire.length > 0) {
    const formType = questionnaire[index].form_component_type;
    if (formType !== 14 && formType !== 15 && formType !== 16) {
      return questionnaire[index].form_component_description;
    }
  }

  return null;
}

export function renderQuestionButtonLabel(questionnaire, index) {
  if (questionnaire.length > 0) {
    const label = questionnaire[index].form_component_button_label;

    if (label) {
      return label;
    }

    if (index === questionnaire.length - 1) {
      return 'Submit';
    }
  }

  return 'Next';
}

export const isQuestionButtonDisabled = (questionnaire, index, type) => {
  if (questionnaire.length > 0) {
    if (type === 'next') {
      return index === questionnaire.length - 1;
    }
    return index === 0;
  }
  return true;
};

export const NumOnly = (e) => {
  const regexPattern = /[0-9]/g;

  if (regexPattern.test(e.key) === false) {
    e.preventDefault();
  }
};

export function capitalizeFirstLetter(name) {
  const fullName = name.split(' ');
  const lastInd = fullName.length - 1;
  const lastName = fullName[lastInd];
  return lastName.slice(0, 1).toUpperCase() + lastName.slice(1);
}

export const useIntersectionObserver = ({
  target,
  onIntersect,
  threshold = 0.1,
  rootMargin = '0px',
}) => {
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersect, {
      rootMargin,
      threshold,
    });

    const { current } = target;

    observer.observe(current);

    return () => {
      observer.unobserve(current);
    };
  });
};

export default useIntersectionObserver;

export function useQuery() {
  return qs.parse(useLocation().search, { ignoreQueryPrefix: true });
}

// * Stepper
export const selectType = (journey, type, index) => {
  if (journey) {
    if (journey[type]) {
      completeIndex = stepperKey.indexOf(type);
      return 'complete';
    }

    if (completeIndex + 1 === index) {
      return 'in-progress';
    }
  }

  return null;
};

export const selectStatus = (journey, type, index) => {
  if (journey) {
    if (journey[type]) {
      completeIndex = stepperKey.indexOf(type);
      return 'Complete';
    }

    if (completeIndex + 1 === index) {
      return 'In-Progress';
    }
  }

  return 'To Come';
};

export const completeStatusIndex = (journey) => {
  if (journey) {
    for (const [key] of Object.entries(journey)) {
      if (journey[key]) {
        return stepperKey.indexOf(key);
      }
    }
  }

  return -1;
};
