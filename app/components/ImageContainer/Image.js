import React from 'react';
import PropTypes from 'prop-types';

const Image = (props) => {
  const [isLoaded, setIsLoaded] = React.useState(false);
  return (
    <>
      <img
        className={`image thumb ${props.className}`}
        alt={props.alt}
        src={props.thumb}
        style={{ visibility: isLoaded ? 'hidden' : 'visible' }}
      />
      <img
        onLoad={() => {
          setIsLoaded(true);
        }}
        className={`image full ${props.className}`}
        style={{ opacity: isLoaded ? 1 : 0 }}
        alt={props.alt}
        src={props.src}
      />
    </>
  );
};

Image.propTypes = {
  alt: PropTypes.string,
  className: PropTypes.string,
  thumb: PropTypes.any,
  src: PropTypes.any,
};

export default Image;
