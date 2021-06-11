import React, { useState } from 'react';

import PropTypes from 'prop-types';

import { Collapse } from 'reactstrap';

import ArrowIcon from '../common/assets/icons/arrowDown.svg';

export default function Collapsible({ title, description, className }) {
  const [isCollapse, setIsCollapse] = useState();

  const handleCollapseVisible = () => {
    const visible = isCollapse;
    setIsCollapse(!visible);
  };

  return (
    <div className={`collapse-custom ${className}`}>
      <button
        type="button"
        className="collapse-custom__button"
        onClick={handleCollapseVisible}
      >
        <div className="collapse-custom__header">
          <div className="collapse-custom__title">
            <p className="text-left bold size21">{title}</p>
          </div>

          <div
            className={`collapse-custom__icon ml2 ${
              isCollapse ? 'open' : 'close'
            }`}
          >
            <ArrowIcon />
          </div>
        </div>
      </button>

      <Collapse isOpen={isCollapse}>
        <p className="size18">{description}</p>
      </Collapse>
    </div>
  );
}

Collapsible.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  className: PropTypes.string,
};
