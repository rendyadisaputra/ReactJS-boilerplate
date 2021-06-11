import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useToasts } from 'react-toast-notifications';
import { useHistory } from 'react-router';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import reducer from './reducer';
import saga from './saga';
import {
  getProductRecRequest,
  getProductListRequest,
  addTransactionRequest,
  getJourneyRequest,
} from './actions';
import {
  makeSelectProducts,
  makeSelectSuccessAdd,
  makeSelectLoadingAdd,
  makeSelectJourney,
  makeSelectLoading,
} from './selectors';

// * Components
import CardProduct, { CardProductSm } from '../../components/Card/CardProduct';
import MultipleSelect from '../../components/Form/MultipleSelect';
import LoaderModal from '../../components/Loader/LoaderModal';
import Button from '../../components/Button/Button';
import Loader from '../../components/Loader/Loader';

const productImg =
  'https://user-images.githubusercontent.com/44439185/116328681-c04b8b80-a7f3-11eb-904b-a9ea12a4e5cb.png';

const key = 'products';

function ProductPage({
  loading,
  loadingAdd,
  products,
  successAdd,
  journey,
  getJourney,
  getAllProduct,
  getProductRecommended,
  addToCart,
}) {
  const history = useHistory();

  const { addToast } = useToasts();

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [filterValue, setFilterValue] = useState('all');

  useEffect(() => {
    fetchProduct(filterValue === 'recommended');
    getJourney();
  }, [filterValue]);

  useEffect(() => {
    if (successAdd) {
      addToast('Product added to cart', {
        autoDismiss: true,
        appearance: 'success',
      });
    }
  }, [successAdd]);

  // * Services
  const fetchProduct = (recommended) => {
    if (recommended) {
      return getProductRecommended();
    }

    return getAllProduct();
  };

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
   
    if (products.length > 0) {
      return products.map((item, index) => (
        <div  key={Math.random()}>
          {index < 2 ? (
            
            <CardProduct
              key={Math.random()}
              title={item.name}
              description={item.short_description}
              skinType={item.product_skin_type ?? '-'}
              price={item.price}
              imgUrl={item.image_url}
              productId={parseInt(item.id).toString()}
              addToCart={() => handleAddToCart(item.id)}
            />
          ) : (
            <CardProductSm
              key={Math.random()}
              title={item.name}
              description={item.short_description}
              skinType={item.product_skin_type ?? '-'}
              price={item.price}
              imgUrl={item.image_url}
              productId={parseInt(item.id).toString()}
              addToCart={() => handleAddToCart(item.id)}
            />
          )}
        </div>
      ));
    }

    return <h2>Data product is empty</h2>;
  };

  const checkCompleteStatus = (type) => {
    if (journey) {
      
      for (const i in journey.journeys) {
        if (
          journey.journeys[i].key == type &&
          journey.journeys[i].status == 'complete'
        ) {
          return true;
        }
      }
    }

    return false;
  };

  const renderProduct = () => {
    if (loading) {
      return <Loader />;
    }

    if (!loading && checkCompleteStatus('skin-survey')) {
      return (
        <>
          <section className="about-us__header mb2">
            <img src={productImg} className="about-us__img" alt="About Us" />
            <div className="about-us__card card container-myskin">
              <h1 className="title text-center">Skincare Products</h1>
              <p className="text-center size20 clear-space mt15">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit
              </p>
            </div>
          </section>

          <section className="filter container-myskin pt-serif">
            <p className="text-center size18">Filter by Product Type</p>

            <div className="d-flex align-items-start lato mt2 pb2">
              <div className="flex1">
                <MultipleSelect
                  type="radio"
                  name="yesno"
                  label="Doctor Recommended"
                  value="recommended"
                  pselected={(filterValue === 'recommended' ).toString()}
                 
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="checkmark--green"
                />
              </div>
              <div className="flex1">
                <MultipleSelect
                  type="radio"
                  name="yesno"
                  label="All other products"
                  value="all"
                  pselected={(filterValue === 'all' ).toString()}
                 
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="checkmark--green"
                />
              </div>
            </div>

            <hr />
          </section>

          <section className="product-list container-myskin mt4">
            {renderContent()}
          </section>
        </>
      );
    }

    return (
      <section className="consultation container-myskin pt4">
        <h1 className="pt-serif fw700 size27 lnHeightMd">
          You haven't take a survey
        </h1>

        <div className="card card-myskin card-form u-margin-top-medium u-margin-bottom-medium">
          <div className="pl25 pr25 pt2 pb1">
            <p className="size18">Please take a survey for place an order</p>
          </div>
          <div className="pl25 pr25 pb2">
            <Button onClick={() => history.push('/questionnaire')}>
              Take Survey
            </Button>
          </div>
        </div>
      </section>
    );
  };

  return (
    <article>
      <Helmet>
        <title>Product {filterValue}</title>
        <meta title="Product" content="Product Page of mySkin.com" />
      </Helmet>

      <div className="content about-us pb4">
        {renderProduct()}

        <LoaderModal loading={loadingAdd} />

        {/* <div className="d-flex justify-content-center mt5">
          <Button>Load More</Button>
        </div> */}
      </div>
    </article>
  );
}

ProductPage.propTypes = {
  loading: PropTypes.bool,
  loadingAdd: PropTypes.bool,
  successAdd: PropTypes.bool,
  products: PropTypes.array,
  journey: PropTypes.any,
  getJourney: PropTypes.func,
  getAllProduct: PropTypes.func,
  getProductRecommended: PropTypes.func,
  addToCart: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  loadingAdd: makeSelectLoadingAdd(),
  products: makeSelectProducts(),
  successAdd: makeSelectSuccessAdd(),
  journey: makeSelectJourney(),
});

function mapDispatchToProps(dispatch) {
  return {
    getAllProduct: () => dispatch(getProductListRequest()),
    getProductRecommended: () => dispatch(getProductRecRequest()),
    addToCart: (payload) => dispatch(addTransactionRequest(payload)),
    getJourney: () => dispatch(getJourneyRequest()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(ProductPage);
