import React from 'react';

import PropTypes from 'prop-types';

import ArrowDown from '../common/assets/icons/arrowDown.svg';
import CheckIcon from '../common/assets/icons/checklist.svg';

export default function Stepper(props) {
  const createStyles = () => ({
    circle: (index) => ({
      border: props.activeIndex >= index ? 'none' : '1px solid #828282',
    }),
    title: (index) => ({
      color: index === props.activeIndex ? '#000' : '#828282',
    }),
  });

  const styles = createStyles();

  return (
    <div className="stepper">
      {props.step ? (
        props.step.map((item, index) => (
          <div className="stepper-content">
            <div
              style={styles.circle(index)}
              className={`stepper__circle ${
                props.activeIndex >= index ? 'bg-green' : 'bg-white'
              }`}
            >
              {props.activeIndex > index ? <CheckIcon /> : <ArrowDown />}
            </div>
            <p style={styles.title(index)}>{item.title}</p>
            {index < props.step.length - 1 && (
              <div className="stepper__border" />
            )}
          </div>
        ))
      ) : (
        <p className="size17">Stepper content not found</p>
      )}
    </div>
  );
}

Stepper.propTypes = {
  step: PropTypes.arrayOf(PropTypes.object),
  activeIndex: PropTypes.any,
};
