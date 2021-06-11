/* eslint-disable react/button-has-type */
import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';
import { Spinner } from 'reactstrap';

const Button = forwardRef((props, ref) => (
  <button
    ref={ref}
    disabled={props.disabled}
    className={`btn ${props.className}`}
    type={props.type}
    onClick={props.onClick}
  >
    {props.isLoading ? (
      <div className="d-flex align-items-center">
        Loading
        <Spinner color="secondary" className="ml-3" />
      </div>
    ) : (
      props.children
    )}
  </button>
));

Button.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
  type: PropTypes.string,
  isLoading: PropTypes.bool,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
};

Button.defaultProps = {
  type: 'button',
};

export default Button;
