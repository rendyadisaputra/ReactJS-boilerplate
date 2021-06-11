import React from 'react';

import PropTypes from 'prop-types';

export default function OpinionScale(props) {
  return (
    <div>
      <input
        type="range"
        min="0"
        max="10"
        value={props.value}
        className="slider"
        onChange={props.onChange}
      />
      <div className="d-flex justify-content-between align-items-center mt-2">
        {props.labelLeft && <p>{props.labelLeft}</p>}
        {props.labelCenter && <p>{props.labelCenter}</p>}
        {props.labelRight && <p>{props.labelRight}</p>}
      </div>
    </div>
  );
}

OpinionScale.propTypes = {
  labelLeft: PropTypes.string,
  labelCenter: PropTypes.string,
  labelRight: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
};
