import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router';

import { Helmet } from 'react-helmet-async';

import HTMLReactParser from 'html-react-parser';
import Skeleton from 'react-loading-skeleton';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import { getProductDetailRequest } from './actions';
import { makeSelectLoading, makeSelectDetailProduct } from './selectors';

import CarouselProduct from '../../components/Carousel/CarouselProduct';

const key = 'detailProduct';

function ProductDetailPage({ loading, detailProduct, getDetailProduct }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const params = useParams();

  useEffect(() => {
    getDetailProduct(params.id);
  }, []);

  // * Services

  return (
    <article>
      <Helmet>
        <title>Product Detail</title>
        <meta
          title="Product Detail"
          content="Product Detail Page of mySkin.com"
        />
      </Helmet>

      <div className="content pt4 product-detail">
        <section>
          <CarouselProduct imgUrl={detailProduct?.product_image ?? ''} />
        </section>

        <section className="container-myskin">
          <h2 className="size225 pt-serif bold u-mb05">
            {detailProduct && !loading ? (
              detailProduct.product_name
            ) : (
              <Skeleton style={{ width: '5rem', height: '2rem' }} />
            )}
          </h2>
          <p className="uppercase size14 mb1">
            {detailProduct?.product_skin_type ?? '-'}
          </p>

          <div className="size17 mb2">
            {detailProduct && !loading ? (
              HTMLReactParser(detailProduct?.product_description ?? '')
            ) : (
              <Skeleton style={{ width: '100%', height: '2rem' }} count={3} />
            )}
          </div>

          <p className="uppercase size14 u-mb05">Ingredients</p>
          <p className="size17 mb2">
            {detailProduct && !loading ? (
              HTMLReactParser(detailProduct?.product_ingredient ?? '')
            ) : (
              <Skeleton style={{ width: '100%', height: '2rem' }} count={2} />
            )}
          </p>
        </section>

        <section className="button-footer">
          <button type="submit" className="btn-cart" disabled={loading}>
            Beli
          </button>
        </section>
      </div>
    </article>
  );
}

ProductDetailPage.propTypes = {
  loading: PropTypes.bool,
  detailProduct: PropTypes.any,
  getDetailProduct: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  detailProduct: makeSelectDetailProduct(),
});

function mapDispatchToProps(dispatch) {
  return {
    getDetailProduct: (id) => dispatch(getProductDetailRequest(id)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ProductDetailPage);
