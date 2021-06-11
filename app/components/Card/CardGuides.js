import React from 'react';
import PropTypes from 'prop-types';

// * Components
import { Col, Row } from 'reactstrap';
import ImageContainer from '../ImageContainer/ImageContainer';

export default function CardGuides({ imgUrl, title, className }) {
  return (
    <div className={`card-guides ${className}`}>
      <div className="card-guides__content">
        <Row noGutters className="align-items-center">
          <Col xs="3">
            <ImageContainer
              src={imgUrl}
              thumb={imgUrl}
              height={100}
              width={100}
              alt="results"
              onIsVisible={() => {}}
            />
          </Col>
          <Col xs="8">
            <h2 className="pt-serif fw700 size24">{title}</h2>
          </Col>
        </Row>
      </div>
    </div>
  );
}

CardGuides.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  className: PropTypes.string,
};

CardGuides.defaultProps = {
  title: 'Lorem ipsum dolor sit amet',
};
