import React from 'react';

import PropTypes from 'prop-types';

import Carousel from 'react-elastic-carousel';

// icons
import LeftIcon from '../common/assets/icons/left.svg';
import RightIcon from '../common/assets/icons/right.svg';
import { ImageContainerHref } from '../ImageContainer/ImageContainer';

export default function CarouselProduct({ imgUrl }) {
  const renderContent = () => (
    <div className="carousel-product">
      <ImageContainerHref
        src={imgUrl}
        thumb={imgUrl}
        url={imgUrl}
        height={100}
        width={100}
        alt="results"
        onIsVisible={() => {}}
      />
    </div>
  );

  const renderArrow = (arrow) => {
    if (arrow.type === 'NEXT') {
      return (
        <button
          onClick={arrow.onClick}
          type="button"
          className="carousel-product__arrow mr1"
        >
          <RightIcon />
        </button>
      );
    }
    return (
      <button
        onClick={arrow.onClick}
        type="button"
        className="carousel-product__arrow ml1"
      >
        <LeftIcon />
      </button>
    );
  };

  return <Carousel renderArrow={renderArrow}>{renderContent()}</Carousel>;
}

CarouselProduct.propTypes = {
  imgUrl: PropTypes.string,
};
