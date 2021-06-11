import React from 'react';

import PropTypes from 'prop-types';

import Skeleton from 'react-loading-skeleton';

export default function CardDermatologist(props) {
  return (
    <div className="dermatologist">
      <div className="d-flex align-items-center">
        <div>
          {props.loading ? (
            <Skeleton style={{ height: '13rem', width: '13rem' }} />
          ) : (
            <img
              alt="dermatologist"
              src={props.image}
              className="dermatologist__image"
            />
          )}
        </div>
        <div className="flex1">
          {props.loading ? (
            <Skeleton
              count={3}
              style={{ height: '2rem' }}
              className="ml1 multiple-skeleton-text-md"
            />
          ) : (
            <>
              <h2 className="pt-serif bold size25 ln-height-2">
                {props.fullName}
              </h2>
              {/* <h2 className="pt-serif bold size25">{props.lastName}</h2> */}
              <hr />
              <p className="uppercase size20">
                {props.experience} Years experience
              </p>
            </>
          )}
        </div>
      </div>

      <div className="u-margin-top-medium">
        {props.loading ? (
          <Skeleton
            style={{ height: '2rem' }}
            count={2}
            className="multiple-skeleton-text-sm"
          />
        ) : (
          <p className="size21">“{props.summary}”</p>
        )}
      </div>
    </div>
  );
}

CardDermatologist.propTypes = {
  image: PropTypes.any,
  fullName: PropTypes.string,
  experience: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  summary: PropTypes.string,
  loading: PropTypes.bool,
};

CardDermatologist.defaultProps = {
  fullName: 'Full Name',
  experience: 9,
  summary:
    '“I’m happy to be part of mySkin. I have the opportunity every day to help people find their best skin ever”',
};
