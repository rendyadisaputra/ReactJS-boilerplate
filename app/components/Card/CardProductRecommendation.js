import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import Button from '../Button/Button';
import CardForYou from './CardForYou';
import CardProduct from './CardProduct';

function CardProductRecommendation({ data, addToCart }) {
  const handleAddToCart = (productId) => {
    const payload = {
      product_ids: [
        {
          product_id: productId,
          amount: 1,
        },
      ],
    };

    addToCart(payload);
  };

  const renderContent = () => {
    if (data.length > 0) {
      return (
        <>
          {data.map((item) => (
            <div className="tomb pl25 pr25 pt2" key={item.id}>
              <CardProduct
                key={item.id}
                title={item.name}
                description={item.short_description}
                skinType="-"
                price={item.price}
                imgUrl={item.image_url}
                productId={parseInt(item.id).toString()}
                addToCart={() => handleAddToCart(item.id)}
              />

              {/* <CardProduct
                imgUrl={item.image_url}
                title={item.name}
                textSize="size20"
                className="card-foryou--sm"
                key={item.id}
              /> */}
            </div>
          ))}
        </>
      );
    }

    return (
      <div className="pl25 pr25 pb2 pt2">
        <h2>Product Recommendations Not Found</h2>
      </div>
    );
  };

  return (
    <div className="card card-myskin card-form u-margin-top-medium mb5">
      {renderContent()}
      <div className="bottom">
        <NavLink to="/product">
          <Button className="btn outline">Lihat Produk Lainnya</Button>
        </NavLink>
      </div>
    </div>
  );
}

CardProductRecommendation.propTypes = {
  data: PropTypes.any,
  addToCart: PropTypes.func,
};

export default CardProductRecommendation;
