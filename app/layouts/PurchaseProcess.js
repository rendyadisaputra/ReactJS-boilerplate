/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Col, Collapse, Row } from 'reactstrap';
import Button from '../components/Button/Button';
import { parseNumFormat } from '../helpers/GlobalHelper';
import FormShipping from './FormShipping';

export default function PurchaseProcess({
  price,
  productName,
  loading,
  isSuccess,
  handleUserShipping,
  handleConfirmOrder,
  accountDetail,
  isVideoCall,
}) {
  const [activeIndex, setActiveIndex] = useState(
    accountDetail?.user_address ? 1 : 0,
  );

  useEffect(() => {
    if (isSuccess && activeIndex === 0) {
      setActiveIndex(1);
    }
  }, [isSuccess]);

  return (
    <div className="container-myskin pt3 pb5">
      <section className="mb5">
        <h2 className="title">Order Summary</h2>

        <div className="hr-thin mt3">
          <Row>
            <Col xs="7">
              <p>{productName}</p>
            </Col>
            <Col xs="5" className="text-right">
              <p>Rp. {parseNumFormat(price)}</p>
            </Col>
          </Row>
        </div>
        <div className="mt3">
          <Row>
            <Col xs="7">
              <p>Total</p>
            </Col>
            <Col xs="5" className="text-right">
              <p>Rp. {parseNumFormat(price)}</p>
            </Col>
          </Row>
        </div>
      </section>

      <section className="pt3">
        <h2 className="title">Purchase</h2>

        <div className="mt2">
          <div
            className={`card card-myskin pl2 pr2 pt2 pb2 mb5 ${
              activeIndex === 0 ? 'card-form' : ''
            }`}
            onClick={() => activeIndex > 0 && setActiveIndex(0)}
          >
            <h2
              className={`pt-serif bold size23 ${
                activeIndex === 0 ? 'mb2' : ''
              }`}
            >
              1. Shipping Address
            </h2>

            <Collapse isOpen={activeIndex === 0}>
              <FormShipping
                activeIndex={activeIndex}
                handleSubmit={handleUserShipping}
                loading={loading}
              />
            </Collapse>
          </div>

          <div
            className={`card card-myskin pl2 pr2 pt2 pb2 mb5 ${
              activeIndex === 1 ? 'card-form' : ''
            }`}
            onClick={() => activeIndex > 0 && setActiveIndex(1)}
          >
            <h2 className="pt-serif bold size23">2. Confirm Order</h2>

            <Collapse isOpen={activeIndex === 1}>
              <form
                className={`form form__shipping ${
                  activeIndex === 1 ? '' : 'display-none'
                }`}
              >
                <Button
                  className="mt2"
                  onClick={handleConfirmOrder}
                  isLoading={loading}
                >
                  Submit
                </Button>
              </form>
            </Collapse>
          </div>
        </div>
      </section>
    </div>
  );
}

PurchaseProcess.propTypes = {
  price: PropTypes.string,
  productName: PropTypes.string,
  loading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  isVideoCall: PropTypes.bool,
  handleUserShipping: PropTypes.func,
  handleConfirmOrder: PropTypes.func,
  accountDetail: PropTypes.any,
};
