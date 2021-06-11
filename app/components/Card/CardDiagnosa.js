import React from 'react';

import PropTypes from 'prop-types';

export default function CardDiagnosa(props) {
  return (
    <div className="card-myskin diagnosa">
      <div className="diagnosa__header diagnosa--spacing">
        <h1 className="pt-serif bold color-text-white">{props.name}</h1>
      </div>

      <div className="diagnosa--spacing diagnosa__content">
        <p className="text-grey uppercase">Diagnosis</p>
        <p>{props.diagnosis}</p>
      </div>

      <div className="diagnosa--spacing diagnosa__content">
        <p className="text-grey uppercase">PRESCRIPTION INGREDIENTS</p>
        <p>Retinoic Acid 0.05%</p>
        <p>Desonide</p>
        <p>Clindmycin 1%</p>
      </div>
    </div>
  );
}

CardDiagnosa.propTypes = {
  name: PropTypes.string,
  diagnosis: PropTypes.string,
};

CardDiagnosa.defaultProps = {
  name: 'Robert',
  diagnosis: 'Oily skin, acne vulgaris, blackheads',
};
