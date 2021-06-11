import React from 'react';
import propTypes from 'prop-types';

// * Components
import { Col, Row } from 'reactstrap';
import ImageContainer, {
  ImageContainerHref,
} from '../ImageContainer/ImageContainer';

export default function CardForYou({
  imgUrl,
  title,
  children,
  textSize,
  className,
}) {
  return (
    <div className={`card-foryou ${className}`}>
      <Row className="d-flex align-items-center mb2">
        <Col xs="6" className="card-foryou__img">
          <ImageContainer
            width={100}
            height={100}
            thumb={imgUrl}
            src={imgUrl}
            onIsVisible={() => {}}
            alt="Product"
          />
        </Col>
        <Col xs="6" className="card-foryou__title">
          <h1 className={`fw700 pt-serif ${textSize}`}>{title}</h1>
        </Col>
      </Row>

      {children}
    </div>
  );
}

export function CardForYouItem({ imgUrl, title, description }) {
  return (
    <Row className="d-flex align-items-center card-foryou--item">
      <Col xs="3" className="card-foryou__img--item">
        <ImageContainerHref
          width={100}
          height={100}
          thumb={imgUrl}
          src={imgUrl}
          onIsVisible={() => {}}
          alt="Product"
        />
      </Col>
      <Col xs="9" className="card-foryou__title">
        <span className="size18">
          {title && <b>{title} :</b>} {description}
        </span>
      </Col>
    </Row>
  );
}

CardForYou.propTypes = {
  imgUrl: propTypes.string,
  title: propTypes.string,
  textSize: propTypes.string,
  className: propTypes.string,
  children: propTypes.node,
};

CardForYou.defaultProps = {
  imgUrl:
    'https://user-images.githubusercontent.com/44439185/113833935-6d625380-97b4-11eb-9472-1498e0aee9e5.png',
  textSize: 'size24',
};

CardForYouItem.propTypes = {
  imgUrl: propTypes.string,
  title: propTypes.string,
  description: propTypes.string,
};
