import React from 'react';

import PropTypes from 'prop-types';

export default function StepperWrapper(props) {
  return <div className="stepper-vertical">{props.children}</div>;
}

StepperWrapper.propTypes = {
  children: PropTypes.node,
};
