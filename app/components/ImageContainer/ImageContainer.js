import React from 'react';
import PropTypes from 'prop-types';

// * Hooks
import useIntersectionObserver from '../../helpers/GlobalHelper';
import Image from './Image';

const ImageContainer = (props) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          props.onIsVisible();
          setIsVisible(true);
        }
        observerElement.unobserve(ref.current);
      }
    },
  });

  const aspectRatio = (props.height / props.width) * 100;

  return (
    <div
      ref={ref}
      className={`image-container ${props.className}`}
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      {isVisible && (
        <Image
          src={props.src}
          thumb={props.thumb}
          alt={props.alt}
          className={props.className}
        />
      )}
    </div>
  );
};

export const ImageContainerHref = (props) => {
  const ref = React.useRef();
  const [isVisible, setIsVisible] = React.useState(false);

  useIntersectionObserver({
    target: ref,
    onIntersect: ([{ isIntersecting }], observerElement) => {
      if (isIntersecting) {
        if (!isVisible) {
          props.onIsVisible();
          setIsVisible(true);
        }
        observerElement.unobserve(ref.current);
      }
    },
  });

  const aspectRatio = (props.height / props.width) * 100;

  return (
    <a
      href={props.url}
      ref={ref}
      rel="noopener noreferrer"
      target="_BLANK"
      className="image-container"
      style={{ paddingBottom: `${aspectRatio}%` }}
    >
      {isVisible && (
        <Image
          src={props.src}
          thumb={props.thumb}
          alt={props.alt}
          className={props.className}
        />
      )}
    </a>
  );
};

ImageContainer.propTypes = {
  onIsVisible: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  src: PropTypes.any,
  thumb: PropTypes.any,
  alt: PropTypes.string,
  className: PropTypes.string,
};

ImageContainerHref.propTypes = {
  onIsVisible: PropTypes.func,
  height: PropTypes.number,
  width: PropTypes.number,
  src: PropTypes.any,
  url: PropTypes.any,
  thumb: PropTypes.any,
  alt: PropTypes.string,
  className: PropTypes.string,
};

export default ImageContainer;
