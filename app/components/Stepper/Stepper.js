import React from 'react';

import PropTypes from 'prop-types';

import ArrowDown from '../common/assets/icons/arrowDown.svg';
import CheckIcon from '../common/assets/icons/checklist.svg';

export default function Stepper({
  type,
  title,
  status,
  withConnector,
  tabIndex,
}) {
  const renderIcon = () => {
    switch (type) {
      case 'complete':
        return <CheckIcon />;
      case 'in-progress':
        return (
          <span className="arrow-icon">
            <ArrowDown />
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <>
      <button
        type="button"
        tabIndex={tabIndex}
        className={`stepper__head w100 ${
          type === 'in-progress' && 'stepper__head--active'
        }`}
      >
        <div className="d-flex flex-row align-items-center flex1">
          <span
            className={`stepper__head__index ${
              (type=='in-progress' || type=='complete') && 'stepper__head__index--active'
            }`}
          >
            {renderIcon()}
          </span>
          <span className="stepper__title size18">{title}</span>
        </div>
        <span className="size18">{status}</span>
      </button>
      <section className="stepper__section">
        {withConnector && <hr className="stepper__connector" />}
      </section>
    </>
  );
}

Stepper.propTypes = {
  type: PropTypes.oneOf(['complete', 'in-progress', 'to come']),
  title: PropTypes.string,
  status: PropTypes.oneOf(['complete', 'in-progress', 'to come']),
  withConnector: PropTypes.bool,
  tabIndex: PropTypes.number,
};
