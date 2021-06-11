import React, { forwardRef } from 'react';

import PropTypes from 'prop-types';

import BackArrowIcon from '../common/assets/icons/backArrow.svg';

const ButtonBack = forwardRef((props, ref) => (
  <button
    {...props}
    ref={ref}
    type="button"
    className="btn-back"
    onClick={props.onClick}
  >
    <BackArrowIcon />
  </button>
));

ButtonBack.propTypes = {
  onClick: PropTypes.func,
};

export default ButtonBack;
