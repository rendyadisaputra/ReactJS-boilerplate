import React from 'react';

import PropTypes from 'prop-types';

export default function PictureChoice(props) {
  return (
    <li className="d-flex align-items-start checkbox-input">
      <label className="container size18">
        <img src={props.uri} alt="face type" className="checkbox-picture" />
        <input
          {...props}
          key={props.id}
          type={props.type}
          checked={props.ischecked}
          value={props.value}
          onClick={props.handleClick}
        />
        <span className="checkmark"></span>
      </label>
    </li>
  );
}

PictureChoice.propTypes = {
  id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  ischecked: PropTypes.bool,
  handleClick: PropTypes.func,
  value: PropTypes.string,
  type: PropTypes.string,
  uri: PropTypes.string,
};

PictureChoice.defaultProps = {
  type: 'checkbox',
  ischecked: false
};
