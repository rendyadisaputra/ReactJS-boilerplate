/* eslint-disable no-plusplus */
/* eslint-disable no-case-declarations */
/* eslint-disable no-alert */
/* eslint-disable func-names */
/* eslint-disable camelcase */
import React, { createRef, memo, useEffect, useState } from 'react';

// * Utils
import PropTypes from 'prop-types';
import $ from 'jquery';
import moment from 'moment';
import { isArray } from 'lodash-es';

// * Components
import { Progress } from 'reactstrap';
import Button from 'components/Button/Button';
import ButtonBack from 'components/Button/ButtonBack';
import TextInput from 'components/Form/TextInput';
import MultipleSelect from 'components/Form/MultipleSelect';
import PictureChoice from 'components/Form/PictureChoice';
import OpinionScale from 'components/Form/OpinionScale';
import DatePicker from 'components/Form/DatePicker';
import SelectInput from 'components/Form/SelectInput';
import FileUpload from 'components/Form/FileUpload';
import HeaderGradient from 'components/Header/HeaderGradient';
import SkinIcon from 'components/common/assets/icons/skin.svg';

import {
  NumOnly,
  renderQuestionButtonLabel,
  isQuestionButtonDisabled,
  renderQuestionTitle,
  renderQuestionDescription,
} from '../helpers/GlobalHelper';

import request from '../utils/request';

function QuestionnaireContent(props) {
  const buttonNextRef = createRef();

  const [index, setIndex] = useState(0);

  const [state, setState] = useState({});
  const [errorMsg, setErrorMsg] = useState();

  const [dateValue, setDateValue] = useState(moment().format('YYYY-MM-DD'));
  const [dropdownValue, setDropdownValue] = useState();
  const [nextDisabled, setNextDisabled] = useState(true);

  const [selectedFiles, setSelectedFiles] = useState([{}]);
  const [latestIndex, setLatestIndex] = useState(0);

  useEffect(() => {
    doRenderAgain();
  }, [index]);

  const next = () => {
    const {
      component_tree,
      logic_tree,
      form_component_id,
    } = props.questionnaire[index];
    const formValue = state[form_component_id];
    let currIndex = index;
    setNextDisabled(true);
    if (logic_tree > 0) {
      if (isArray(formValue.answer)) {
        const jumpTo = component_tree.filter(
          (item) =>
            item.answer.toLowerCase() ===
            formValue.answer[0].value.toLowerCase(),
        )[0].form_component_sequence;

        setLatestIndex(index);
        return setIndex(jumpTo - 1);
      }
    }

    setLatestIndex(index);
    setIndex((currIndex += 1));
    return null;
  };

  const prev = () => {
    // let currIndex = index;
    setNextDisabled(false);
    setIndex(latestIndex);
    setErrorMsg();
  };

  const doRenderAgain = () => {
    const currentQuestion = props.questionnaire[index];

    if (props.questionnaire.length > 0) {
      const formType = currentQuestion.form_component_type;
      switch (formType) {
        case 3:
          checkedLastValue(currentQuestion);
          break;
        case 5:
          checkedLastValue(currentQuestion);
          break;
        case 6:
          checkedLastValueRadio(currentQuestion);
          break;
        case 'rating question':
        case 'legal question':
          setNextDisabled(false);
          break;
        default:
      }
    }
  };

  const checkedLastValue = (question) => {
    const currentAnswer = state[question.form_component_id];
    if (currentAnswer) {
      if (currentAnswer.answer) {
        currentAnswer.answer.forEach((item) => {
          $(`#mc-${item.id}`).prop('checked', true);
        });
      }
    }
  };

  const checkedLastValueRadio = (question) => {
    const currentAnswer = state[question.form_component_id];
    if (currentAnswer) {
      $(`#mc-${currentAnswer[0].answer}`).prop('checked', true);
    }
  };

  // * Logic for handle all input
  const handleInputChange = (question, value) => {
    const maxLength = question.form_component_size ?? 100;
    const { form_component_id } = question;
    if (value.length > 0) {
      const formType = question.form_component_description.toLowerCase().trim();

      if (formType === 'email question') {
        const regexPattern = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/g;
        if (regexPattern.test(value) === false) {
          setErrorMsg('Tolong masukkan email yg valid');
        } else {
          setNextDisabled(false);
          setErrorMsg();
        }
      } else if (formType === 'number question') {
        const minNum = question.form_component_min_number;
        const maxNum = question.form_component_max_number;

        if (Number(value) < Number(minNum)) {
          setErrorMsg('Angka tidak boleh kosong');
        } else if (Number(value) > Number(maxNum)) {
          setErrorMsg(`Angka tidak boleh lebih dari ${maxNum}`);
        } else {
          setNextDisabled(false);
          setErrorMsg();
        }
      } else {
        setNextDisabled(false);
        setErrorMsg();
      }
    } else {
      setNextDisabled(true);
      setErrorMsg('Tidak boleh kosong');
    }

    if (value.length <= Number(maxLength)) {
      const formValue = {
        form_component_id,
        answer: value,
      };

      setState({
        ...state,
        [form_component_id]: { ...formValue },
      });
    }
  };

  const checkInputValue = (question) => {
    const formValue = state[question.form_component_id];

    return formValue ? formValue.answer : '';
  };

  // * Logic for handle multiple choice
  const handleMultipleChoice = (question, item, e) => {
    const { checked } = e.target;
    const limit = question.form_component_selection_limit
      ? question.form_component_selection_limit
      : 10;

    $('input[type=checkbox]').on('change', function () {
      if ($('input[type=checkbox]:checked').length > limit) {
        $(this).prop('checked', false);
      }

      if ($('input[type=checkbox]:checked').length > 0) {
        setNextDisabled(false);
      } else {
        setNextDisabled(true);
      }
    });

    const { form_component_id } = question;

    const mcValue = {
      id: item.mc_id,
      value: item.mc_value,
    };

    if (state[form_component_id]) {
      const mcArray = state[form_component_id].answer;
      if (checked) {
        if (mcArray.length < limit) {
          mcArray.push(mcValue);
        }
      } else {
        const removeItem = mcArray.findIndex((val) => val.id === mcValue.id);
        if (removeItem > -1) {
          mcArray.splice(removeItem, 1);
        }
      }

      setState({
        ...state,
      });
    } else {
      setState({
        ...state,
        [form_component_id]: {
          form_component_id,
          answer: [mcValue],
        },
      });
    }
  };

  // * Logic for Yes or No
  const handleRadio = (question, e, item) => {
    const { form_component_id } = question;
    const { value } = e.target;

    setNextDisabled(false);

    setState({
      ...state,
      [form_component_id]: {
        form_component_id,
        answer: [
          {
            id: item.mc_id,
            value,
          },
        ],
      },
    });
  };

  // * Logic for Dropdown
  const handleDropdownValue = (question, e) => {
    const { form_component_id } = question;
    const { value } = e;
    const formValue = {
      form_component_id,
      answer: value,
    };
    const dropdownVal = {
      label: e.label,
      value,
    };

    setNextDisabled(false);

    setDropdownValue(dropdownVal);
    setState({
      ...state,
      [form_component_id]: { ...formValue },
    });
  };

  // * Logic for File Upload
  const handleFileUpload = (file, formCompId) => {
    const requestUrl = '/api/v1/questionnaire/upload';

    const payload = {
      form_id: props.questionnaireData.form_id,
      form_component_id: formCompId,
      image: file[0],
    };

    const postData = new FormData();

    Object.entries(payload).map((item) => postData.append(item[0], item[1]));

    request(requestUrl, {
      method: 'POST',
      data: postData,
      headers: {
        'content-type': 'multipart/form-data',
      },
      onUploadProgress: (event) => {
        setNextDisabled(true);
        setSelectedFiles([
          ...selectedFiles,
          {
            image: file[0],
            progress: Math.round((100 * event.loaded) / event.total),
          },
        ]);
      },
    })
      .then((response) => {
        setNextDisabled(false);
        if (state[formCompId]) {
          state[formCompId].answer.push(response.data);

          setState({
            ...state,
          });
        } else {
          setState({
            ...state,
            [formCompId]: {
              form_component_id: formCompId,
              answer: [response.data],
            },
          });
        }
      })
      .catch((err) => Promise.reject(err));
  };

  // * Click Next when press key enter
  const handleNextEnter = (e) => {
    if (e.key === 'Enter') {
      buttonNextRef.current.click();
    }
  };

  const renderContent = () => {
    const { questionnaire } = props;

    if (questionnaire.length > 0) {
      const currentQuestion = questionnaire[index];
      const formType = currentQuestion.form_component_type;

      switch (formType) {
        // * Short Question
        case 1:
          return (
            <TextInput
              placeholder="Short Text"
              onChange={(e) =>
                handleInputChange(currentQuestion, e.target.value)
              }
              value={checkInputValue(currentQuestion)}
              error={errorMsg}
              onKeyPress={handleNextEnter}
            />
          );

        // * Long Text Question
        case 2:
          return (
            <TextInput
              multiline
              placeholder="Address"
              onChange={(e) =>
                handleInputChange(currentQuestion, e.target.value)
              }
              value={checkInputValue(currentQuestion)}
              onKeyPress={handleNextEnter}
            />
          );

        // * Multiple Choice Question
        case 3:
          return currentQuestion.multiple_choice.map((item) => (
            <MultipleSelect
              key={item.mc_id}
              type="checkbox"
              value={item.mc_value}
              label={item.mc_label}
              id={`mc-${item.mc_id}`}
              onChange={(e) => handleMultipleChoice(currentQuestion, item, e)}
            />
          ));

        // * Phone Number Question
        case 4:
          return (
            <TextInput
              type="number"
              placeholder="Input your phone number"
              onKeyPress={(e) => {
                NumOnly(e);
                handleNextEnter(e);
              }}
              onChange={(e) =>
                handleInputChange(currentQuestion, e.target.value)
              }
              value={checkInputValue(currentQuestion)}
            />
          );

        // * Picture Choice
        case 5:
          return currentQuestion.multiple_choice.map((face) => (
            <PictureChoice
              key={face.mc_id}
              uri={face.mc_label}
              id={`mc-${face.mc_id}`}
              value={face.mc_value}
              onChange={(e) => handleMultipleChoice(currentQuestion, face, e)}
            />
          ));

        // * Yes or No
        case 6:
          return currentQuestion.multiple_choice.map((item) => (
            <MultipleSelect
              key={item.mc_id}
              type="radio"
              name="yesno"
              label={item.mc_label}
              value={item.mc_label}
              id={`mc-${item.mc_label}`}
              onChange={(e) => handleRadio(currentQuestion, e, item)}
            />
          ));

        // * Email
        case 7:
          return (
            <TextInput
              type="email"
              placeholder="Email"
              onChange={(e) =>
                handleInputChange(currentQuestion, e.target.value)
              }
              onKeyPress={handleNextEnter}
              value={checkInputValue(currentQuestion)}
              error={errorMsg}
            />
          );

        // * Opinion Scale
        case 8:
          return (
            <OpinionScale
              labelLeft={currentQuestion.form_component_label_left}
              labelRight={currentQuestion.form_component_label_right}
              onChange={({ target }) => {
                handleInputChange(currentQuestion, target.value);
              }}
              value={checkInputValue(currentQuestion)}
            />
          );

        // * Date Picker
        case 10:
          return (
            <DatePicker
              placeholder="dd/mm/yyyy"
              onChange={({ target }) => {
                setDateValue(target.value);
                handleInputChange(
                  currentQuestion,
                  moment(target.value).format('DD/MM/YYYY'),
                );
              }}
              value={dateValue}
            />
          );

        // * Number
        case 11:
          return (
            <TextInput
              type="number"
              placeholder="Number"
              onChange={({ target }) =>
                handleInputChange(currentQuestion, target.value)
              }
              onKeyPress={handleNextEnter}
              value={checkInputValue(currentQuestion)}
              error={errorMsg}
            />
          );

        // * Dropdown
        case 12:
          const options = currentQuestion.multiple_choice.map((item) => ({
            id: item.mc_id,
            label: item.mc_label,
            value: item.mc_value + item.mc_id,
          }));

          return (
            <SelectInput
              options={options}
              onChange={(value) => handleDropdownValue(currentQuestion, value)}
              value={dropdownValue}
            />
          );

        // * File Upload
        case 14:
          return (
            <FileUpload
              fileUploaded={(file) => {
                if (file[0]) {
                  handleFileUpload(file, currentQuestion.form_component_id);
                }
              }}
              selectedImages={selectedFiles}
            />
          );

        // * Welcome Page
        case 15:
          return <h1>Selamat datang di kuisoner</h1>;

        // * End Screen
        case 16:
          return <h1 className="title">Batas Akhir Kuisoner</h1>;
        default:
          return <h1 className="title">Nothing here</h1>;
      }
    } else {
      return <h1>Questionnaire tidak tersedia</h1>;
    }
  };

  const checkButtonDisabled = () => {
    if (props.questionnaire.length > 0) {
      const { form_component_id, form_component_type } = props.questionnaire[
        index
      ];
      const formValue = state[form_component_id];

      if (form_component_type !== 15 || form_component_type !== 16) {
        if (formValue) {
          if (!errorMsg) {
            if (formValue.answer.length > 0 || formValue.answer) {
              return false;
            }
          }
        } else {
          return nextDisabled;
        }
      } else {
        return false;
      }
    }

    return true;
  };

  const countProgress = () => {
    if (props.questionnaire.length > 0) {
      return (index / props.questionnaire.length) * 100;
    }

    return 0;
  };

  return (
    <div>
      <Progress value={countProgress()} />
      <HeaderGradient type="sm">
        <div className="container-myskin d-flex questionare__heading">
          <SkinIcon />
          <h1 className="size26 pt-serif bold text-white">
            {renderQuestionTitle(props.questionnaire, index)}
          </h1>
        </div>
      </HeaderGradient>

      <div className="container-myskin pt4 pb4">
        <div className="questionare__content">
          <h2 className="mb1">
            {renderQuestionDescription(props.questionnaire, index)}
          </h2>
          {renderContent()}
        </div>

        <div className="questionare__footer d-flex align-items-center justify-content-between">
          <ButtonBack
            disabled={isQuestionButtonDisabled(
              props.questionnaire,
              index,
              'back',
            )}
            onClick={prev}
          />
          <Button
            ref={buttonNextRef}
            disabled={checkButtonDisabled()}
            onClick={
              isQuestionButtonDisabled(props.questionnaire, index, 'next')
                ? () => props.handleSubmit(state)
                : next
            }
          >
            {renderQuestionButtonLabel(props.questionnaire, index)}
          </Button>
        </div>
      </div>
    </div>
  );
}

QuestionnaireContent.propTypes = {
  questionnaire: PropTypes.array,
  questionnaireData: PropTypes.any,
  handleSubmit: PropTypes.func,
};

export default memo(QuestionnaireContent);
