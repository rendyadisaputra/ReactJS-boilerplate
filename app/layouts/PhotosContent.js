import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'reactstrap';
import ImageContainer from '../components/ImageContainer/ImageContainer';
export default function PhotosContent({ data }) {
  const renderContent = () => {
    if (data.length > 0) {
      return data.map((item) => (
        <Col>
          <ImageContainer
            src={item}
            thumb={item}
            height={100}
            width={100}
            alt="results"
            onIsVisible={() => {}}
          />
          <p className="size18 mt1 mb3">02/03/2021</p>
        </Col>
      ));
    }

    return (
      <Col>
        <h2>Photos not found</h2>
      </Col>
    );
  };

  return (
    <div className="photos">
      <Row xs="2">{renderContent()}</Row>
    </div>
  );
}

PhotosContent.propTypes = {
  data: PropTypes.array,
};
