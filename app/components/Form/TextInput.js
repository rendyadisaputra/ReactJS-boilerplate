/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import EyeIcon from '../common/assets/icons/eye.svg';
import EyeLineIcon from '../common/assets/icons/eyeLine.svg';

const TextInput = (props) => {
  const createStyles = () => ({
    label: {
      marginBottom: 0,
      fontWeight: 700,
    },
  });

  const styles = createStyles();

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [editVisible, setEditVisible] = useState(true);

  const handlePasswordVisibility = () => {
    const visibility = passwordVisible;
    setPasswordVisible(!visibility);
  };

  const handleEditVisibility = () => {
    const visibility = editVisible;
    if (!visibility && !props.editDisabled) {
      return props
        .onsave()
        .then((res) => {
          setEditVisible(!visibility);
        })
        .catch((err) => {});
    }

    if (visibility || props.editDisabled) {
      return setEditVisible(!visibility);
    }

    return null;
  };

  const renderFormType = () => {
    if (props.ispassword) {
      if (!passwordVisible) {
        return 'password';
      }

      return 'text';
    }

    return props.type;
  };

  const inputProps = {
    ...props,
    ref: (input) => {
      if (input !== null) {
        if (editVisible === false) {
          input.focus();
        }
      }
    },
    id: props.id,
    disabled:
      props.bordered || props.disabled ? editVisible || props.disabled : false,
    type: renderFormType(),
    className: `text-input ${props.bordered && 'text-input-bordered'} ${
      props.rounded && 'rounded'
    } ${props.textinputclassname}`,
  };

  return (
    <div
      className={`text-input-container ${props.className} ${
        props.spacing && 'u-margin-bottom-small'
      }`}
    >
      {props.label && (
        <label
          htmlFor={props.id}
          className="text-input__label"
          style={props.bordered ? styles.label : {}}
        >
          {props.label}
          {props.required && <span className="required">*</span>}
        </label>
      )}
      <div className="text-input-group">
        {/* Conditional Tag Rendering */}
        {props.multiline ? (
          <textarea {...inputProps} rows={3} />
        ) : (
          <input {...inputProps} />
        )}

        {/* Show eye icon when password = true */}
        {props.ispassword && (
          <button
            onClick={handlePasswordVisibility}
            type="button"
            className="text-input--right"
            style={{ bottom: 0 }}
          >
            {passwordVisible ? <EyeIcon /> : <EyeLineIcon />}
          </button>
        )}

        {/* Show when bordered = true */}
        {props.bordered && (
          <button
            onClick={handleEditVisibility}
            type="button"
            className={`text-input--right ${
              !editVisible && !props.multiline && 'save-btn'
            }`}
          >
            <p className="uppercase size14 bold">
              {editVisible ? 'edit' : 'save'}
            </p>
          </button>
        )}
      </div>
      {props.error && (
        <p className="size12 required text-input__error-text">{props.error}</p>
      )}
    </div>
  );
};
// console.log(" PropTypes.bool ",  PropTypes.string)
TextInput.propTypes = {
  label: PropTypes.string,
  ispassword: PropTypes.bool,
  type: PropTypes.string,
  id: PropTypes.string,
  spacing: PropTypes.bool,
  required: PropTypes.bool,
  className: PropTypes.string,
  rounded: PropTypes.bool,
  error: PropTypes.string,
  textinputclassname: PropTypes.string,
  bordered: PropTypes.bool,
  multiline: PropTypes.bool,
  disabled: PropTypes.bool,
  onsave: PropTypes.func,
  editDisabled: PropTypes.bool,
};

TextInput.defaultProps = {
  textinputclassname: 'iclass',
  className: ''
};

export default TextInput;
