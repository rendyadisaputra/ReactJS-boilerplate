import React from 'react';

import PropTypes from 'prop-types';

import Select from 'react-select';

export default function SelectInput(props) {
  console.log(" props ", props.value)
  return (
    <div className="select">
      {props.label && (
        <label htmlFor={props.id} className="text-input__label">
          {props.label}
          {props.required && <span className="required">*</span>}
        </label>
      )}
      <div className={props.spacing && 'u-margin-bottom-small'}>
        <Select
          {...props}
          controlShouldRenderValue
          isSearchable
          name={props.name}
          inputId={props.id}
          classNamePrefix="select"
          options={props.options}
          onChange={props.onChange}
        />
        {props.error && (
          <p className="size12 required text-input__error-text">
            {props.error}
          </p>
        )}
      </div>
    </div>
  );
}

SelectInput.propTypes = {
  label: PropTypes.string,
  id: PropTypes.string,
  required: PropTypes.bool,
  spacing: PropTypes.bool,
  onChange: PropTypes.func,
  name: PropTypes.string,
  error: PropTypes.string,
  options: PropTypes.array,
};
