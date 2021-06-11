import React from 'react';
import { Link } from 'react-router-dom';

import PropTypes from 'prop-types';

// * Components
import HTMLReactParser from 'html-react-parser';
import Button from '../Button/Button';

import ImageContainer from '../ImageContainer/ImageContainer';
import { parseNumFormat } from '../../helpers/GlobalHelper';

export default function CardProduct({
  title,
  description,
  skinType,
  price,
  imgUrl,
  productId,
  addToCart,
}) {
  return (
    <div className="card-product w100">
      <div className="card card-myskin">
        <Link to={`/product/detail/${productId}`}>
          <ImageContainer
            src={imgUrl}
            thumb={imgUrl}
            height={80}
            width={100}
            alt="results"
            onIsVisible={() => {}}
          />

          <div className="pt2 pr2 pl2">
            <h2 className="pt-serif size22 bold u-mb05">{title}</h2>
            <p className="uppercase size14">{skinType}</p>

            <p className="size17 mt15 mb1">{HTMLReactParser(description)}</p>
          </div>
        </Link>

        <div className="d-flex justify-content-between align-items-center pr2 pb2 pl2">
          <span className="size17 pt-serif bold">
            Rp. {parseNumFormat(price)}
          </span>

          <Button type="button" onClick={addToCart}>
            Beli
          </Button>
        </div>
      </div>
    </div>
  );
}

export function CardProductSm({
  title,
  description,
  skinType,
  price,
  imgUrl,
  productId,
  addToCart,
}) {
  return (
    <div className="clear-button card-product w100">
      <div className="card card-myskin">
        <div>
          <Link
            to={`/product/detail/${productId}`}
            className="d-flex align-items-center"
          >
            <div className="flex4">
              <ImageContainer
                src={imgUrl}
                thumb={imgUrl}
                height={100}
                width={100}
                alt="results"
                onIsVisible={() => {}}
              />
            </div>

            <div className="flex7 ml2">
              <h2 className="size20 pt-serif bold u-mb05">Smaller Product</h2>
              <h2 className="size20 pt-serif bold mb1">{title}</h2>
              <span className="uppercase size14">{skinType}</span>
            </div>
          </Link>

          <div className="pb2 pt2 pl2 pr2">
            <p className="size17 mb1">{HTMLReactParser(description)}</p>

            <div className="d-flex justify-content-between align-items-center">
              <span className="size17 pt-serif bold">
                Rp. {parseNumFormat(price)}
              </span>

              <Button type="button" onClick={addToCart}>
                Beli
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

CardProduct.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  skinType: PropTypes.string,
  price: PropTypes.string,
  productId: PropTypes.string,
  addToCart: PropTypes.func,
};

CardProductSm.propTypes = {
  imgUrl: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  skinType: PropTypes.string,
  price: PropTypes.string,
  productId: PropTypes.string,
  addToCart: PropTypes.func,
};
