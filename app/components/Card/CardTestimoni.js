import React from 'react';

import PropTypes from 'prop-types';
import Skeleton from 'react-loading-skeleton';

export default function CardTestimoni(props) {
  return (
    <div className="testimoni">
      <div className="align-items-center text-center">
        {props.loading ? (
          <Skeleton style={{ width: '22rem', height: '22rem' }} />
        ) : (
          <img src={props.image} alt="Results" className="testimoni__image" />
        )}
      </div>

      <h1 className="pt-serif bold">{props.name}</h1>

      <div className="d-flex justify-content-between align-items-center treatment-time">
        <p>Treatment Time</p>
        {props.loading ? (
          <Skeleton style={{ width: '7rem', height: '2rem' }} />
        ) : (
          <p>{props.time}</p>
        )}
      </div>

      <div className="description">
        {props.loading ? (
          <Skeleton
            style={{ height: '1.5rem' }}
            count={2}
            className="multiple-skeleton-text-sm"
          />
        ) : (
          <p className="pt-serif">“{props.description}”</p>
        )}
      </div>
    </div>
  );
}

CardTestimoni.propTypes = {
  image: PropTypes.any,
  time: PropTypes.string,
  name: PropTypes.string,
  description: PropTypes.string,
  loading: PropTypes.bool,
};

CardTestimoni.defaultProps = {
  time: '6 months',
};
