/* eslint-disable react/no-unused-prop-types */
import React from 'react';

import PropTypes from 'prop-types';

import Carousel from 'react-elastic-carousel';

// icons
import ChatIcon from '../common/assets/icons/chat.svg';
import LeftIcon from '../common/assets/icons/left.svg';
import RightIcon from '../common/assets/icons/right.svg';

export default function CarouselTestimoni(props) {
  const renderContent = () => {
    if (!props.loading) {
      if (props.data.length > 0) {
        return props.data.map((item) => (
          <div
            key={item.testimony_id}
            className="carousel-testimoni d-flex flex-column"
          >
            <ChatIcon />
            <h1 className="pt-serif bold text-center">
              “{item.testimony_desc}”
            </h1>
            <p>— {item.user.user_fullname}</p>
          </div>
        ));
      }
      return <h1 className="title text-center">Testimonial data not found</h1>;
    }

    return <h2>Loading...</h2>;
  };

  const renderArrow = (arrow) => {
    if (arrow.type === 'NEXT') {
      return (
        <button
          onClick={arrow.onClick}
          type="button"
          className="carousel__arrow"
        >
          <RightIcon />
        </button>
      );
    }
    return (
      <button onClick={arrow.onClick} type="button" className="carousel__arrow">
        <LeftIcon />
      </button>
    );
  };

  return <Carousel renderArrow={renderArrow}>{renderContent()}</Carousel>;
}

CarouselTestimoni.propTypes = {
  data: PropTypes.arrayOf(PropTypes.any),
  loading: PropTypes.bool,
};
