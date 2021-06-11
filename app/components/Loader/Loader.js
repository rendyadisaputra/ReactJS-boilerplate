import React from 'react';

import PropTypes from 'prop-types';

export default function Loader({ loadingText }) {
  return (
    <div className="Loader">
      <div className="LoaderBalls">
        <div className="LoaderBalls__item"></div>
        <div className="LoaderBalls__item"></div>
        <div className="LoaderBalls__item"></div>
      </div>
      <p className="u-margin-top-big size20">{loadingText}</p>
    </div>
  );
}

Loader.propTypes = {
  loadingText: PropTypes.string,
};
