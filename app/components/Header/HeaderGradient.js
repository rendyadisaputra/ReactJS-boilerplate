import React from 'react';

import PropTypes from 'prop-types';

export default function HeaderGradient(props) {
  return (
    <div
      className={`heading heading-gradient heading--${props.type} ${props.className}`}
    >
      {props.children}
    </div>
  );
}

HeaderGradient.propTypes = {
  children: PropTypes.node,
  type: PropTypes.string,
  className: PropTypes.string,
};

HeaderGradient.defaultProps = {
  type: 'md',
};
