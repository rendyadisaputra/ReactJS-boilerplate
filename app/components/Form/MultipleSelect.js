import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';

const MultipleSelect = forwardRef((props, ref) => (
  <li className="d-flex align-items-center checkbox-input">
    <label className="container size18">
      {props.label}
      <input
        {...props}
        ref={ref}
        key={props.id}
        type={props.type}
        checked={props.pselected == 'true' ? true: false}
        value={props.value}
        onClick={props.handleClick}
        className="single-checkbox"
      />
      <span className={`checkmark ${props.className}`}></span>
    </label>
  </li>
));

MultipleSelect.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  pselected: (PropTypes.any),
  handleClick: PropTypes.func,
  value: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  className: PropTypes.string,
  ref: PropTypes.any,
};

MultipleSelect.defaultProps = {
  type: 'checkbox',
  // pselected: false
};

export default MultipleSelect;
