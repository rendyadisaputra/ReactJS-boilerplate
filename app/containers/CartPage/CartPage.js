import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { Col, Row } from 'reactstrap';

// * Redux Saga
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from 'utils/injectReducer';
import { useInjectSaga } from 'utils/injectSaga';
import { makeSelectLoading, makeSelectCart } from './selectors';
import {
  getTransactionRequest,
  getShoppingCartRequest,
  getCountShoppingCartRequest,
  createPaymentRequest,
  changeAmountRequest,
} from './actions';
import saga, { getCountShoppingCart } from './saga';
import reducer from './reducer';
import { useHistory } from 'react-router-dom';


// * Components
import HeaderTitle from '../../components/Header/HeaderTitle';
import Button from '../../components/Button/Button';
import CardCart from '../../components/Card/CardCart';
import LoaderModal from '../../components/Loader/LoaderModal';

import { parseNumFormat } from '../../helpers/GlobalHelper';

const key = 'cart';

function CartPage({
  loading,
  cart,
  changeAmount,
  getProductCart,
  createPayment,
}) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  useEffect(() => {
    getProductCart();
    getCountShoppingCart();
  }, []);
  const history = useHistory();

  // * Services
  const checkout = () => {
    if(typeof cart.total == 'undefined'){
      return false;
    }

    const orderAmount = {};
    const payload = {
      // transaction_id: cart[0].transaction_id,
      // order_amount: orderAmount,
      // total_price: cart.total,
    };

    // if (cart[0]?.care.length > 0 && cart[0]?.product.length > 0) {
    //   cart[0].product.map((item) =>
    //     Object.assign(orderAmount, { [item.order_id]: item.amount }),
    //   );

    //   cart[0].care.map((item) =>
    //     Object.assign(orderAmount, { [item.order_id]: item.amount }),
    //   );
    // }

    // if (cart[0]?.care.length > 0 && cart[0]?.product.length === 0) {
    //   cart[0].care.map((item) =>
    //     Object.assign(orderAmount, { [item.order_id]: item.amount }),
    //   );
    // }

    // if (cart[0]?.product.length > 0 && cart[0]?.care.length === 0) {
    //   cart[0].product.map((item) =>
    //     Object.assign(orderAmount, { [item.order_id]: item.amount }),
    //   );
    // }
    history.push("/checkout")
    // createPayment(payload);
  };

  const countTotalPrice = () => {
    if (cart[0]?.care?.length > 0 && cart[0]?.product.length === 0) {
      return cart[0].total_price;
    }

    if (cart[0]?.care?.length > 0 && cart[0]?.product.length > 0) {
      const productPrice = cart[0].product.reduce(
        (prev, curr) => prev + curr.amount * curr.product_price,
        0,
      );

      const careprice = cart[0].care.reduce(
        (prev, curr) => prev + curr.amount * curr.care_price,
        0,
      );

      return Number(productPrice) + Number(careprice);
    }

    return cart[0].product.reduce(
      (prev, curr) => prev + curr.amount * curr.product_price,
      0,
    );
  };

  return (
    <article>
      <Helmet>
        <title>Cart</title>
        <meta name="Cart" content="Cart Page mySkin.com" />
      </Helmet>

      <div className="content">
        <HeaderTitle
          title={`Shopping Cart (${
            cart? cart.count : 0
          } item)`}
        />

        <section className="container-myskin pt2 pb5"> 
          {
            (()=>{
              console.log("Cart here", cart)
              return <></>
            })()
          }
          {(typeof cart.products != 'undefined')? (
            <>
              {
               cart.products.map(item=> {
                //  console.log(key)
                //  let item = cart.products[key];
                //  console.log("item ", item)
                 return  <CardCart
                 key={item.key + Math.random()}
                 imgUrl={item.image_url}
                 name={item.product_name}
                 price={item.line_subtotal.toString()}
                 orderId={item.order_id}
                 amount={item.quantity}
                 handleChangeAmount={(val) => changeAmount(Number(val), index)}
               />
               })
              }
            </>
          ) : (
            <h2>You havent have an order to pay</h2>
          )}

          {(typeof cart.products != 'undefined') && (
            <>
              <Row className="justify-content-between align-items-center mt5 mb5">
                <Col xs="3">
                  <span className="size225 bold pt-serif">Total</span>
                </Col>
                <Col className="text-right">
                  <span className="size225 bold pt-serif">
                    Rp. {cart.total}
                  </span>
                </Col>
              </Row>

              <Row className="mb3">
                <Button className="w100" onClick={checkout}>
                  checkout
                </Button>
              </Row>
            </>
          )}
        </section>

        <LoaderModal loading={loading} />
      </div>
    </article>
  );
}

CartPage.propTypes = {
  loading: PropTypes.bool,
  cart: PropTypes.any,
  getProductCart: PropTypes.func,
  createPayment: PropTypes.func,
  changeAmount: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  loading: makeSelectLoading(),
  cart: makeSelectCart(),
});

function mapDispatchToProps(dispatch) {
  return {
    getProductCart: () => dispatch(getShoppingCartRequest()),
    getCountShoppingCart: () => dispatch(getCountShoppingCartRequest()),
    
    createPayment: (payload) => dispatch(createPaymentRequest(payload)),
    changeAmount: (amount, productId) =>
      dispatch(changeAmountRequest(amount, productId)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(CartPage);
