import React from 'react';
import PropTypes from 'prop-types';

import { Col, Row } from 'reactstrap';
import { parseNumFormat } from '../../helpers/GlobalHelper';
import ImageContainer from '../ImageContainer/ImageContainer';

export default function CardCart({
  imgUrl,
  name,
  price,
  handleChangeAmount,
  orderId,
  amount,
  amountDisabled,
}) {
  return (
    <div className="hr-thin pb3 pt3">
      <Row className="card-cart align-items-center">
        <Col xs="4">
          <ImageContainer
            src={imgUrl}
            thumb={imgUrl}
            height={100}
            width={100}
            alt="results"
            onIsVisible={() => {}}
            className="default-radius"
          />
        </Col>
        <Col xs="8" style={{ paddingLeft: 0 }}>
          <h2 className="size225 pt-serif bold">{name}</h2>

          <Row className="align-items-center justify-content-between mt15">
            <Col xs="4">
              <select
                name="count"
                id="count"
                className="select-custom"
                // onChange={(e) => {
                //   console.log(" e ", this)
                // }}
                defaultValue={String(amount)}
              
                disabled={amountDisabled}
              >

                {['hapus'].concat(new Array(10).fill(' ')).map((item, index) => (
                  (index? 
                    <option key={index} value={index}>{index}</option> : 
                    <option key={index} value={index}>{item}</option>)
                ))}
              </select>
            </Col>

            <Col xs="8" className="text-right">
              <p className="pt-serif size18 bold clear-space">
                Rp. {parseNumFormat(price)}
              </p>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
}

CardCart.propTypes = {
  imgUrl: PropTypes.string,
  name: PropTypes.string,
  price: PropTypes.string,
  handleChangeAmount: PropTypes.func,
  orderId: PropTypes.any,
  amount: PropTypes.any,
  amountDisabled: PropTypes.bool,
};
