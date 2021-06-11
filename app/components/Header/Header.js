/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { memo, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  Row,
  Col,
} from 'reactstrap';

// Redux
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import { makeSelectProductCount } from '../../containers/CartPage/selectors';
import { getTransactionRequest, getCountShoppingCartRequest } from '../../containers/CartPage/actions';
import saga from '../../containers/CartPage/saga';
import reducer from '../../containers/CartPage/reducer';

// Icons
import CartIcon from '../common/assets/icons/addToBasket.svg';

// Images
import Logo from '../common/assets/images/logo.png';

// * Utils
import { getCookie, removeCookie } from '../../utils/cookie';

const key = 'cart';

function Header({ productCount, getTransaction, getCountShoppingCart }) {
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const history = useHistory();
  const data = getCookie('secret');
  const isLogin = data ? JSON.parse(data).token : null;

  const [collapsed, setCollapsed] = useState(true);

  useEffect(() => {
    if (isLogin) {
      // getTransaction();
      // getShoppingCart();
      
      getCountShoppingCart();
    }
  }, []);

  useEffect(
    () =>
      history.listen(() => {
        if (isLogin) {
          getTransaction();
        }
      }),
    [],
  );

  const toggleNavbar = () => setCollapsed(!collapsed);

  return (
    <div className="navigation">
      <div className="header">
        <Navbar color="faded" light className="header__navbar">
          <NavbarBrand href="/">
            <img src={Logo} alt="mySkin Logo" className="header__logo" />
          </NavbarBrand>
          <Row className="align-items-center">
            {isLogin && (
              <Col
                className="mr4"
                style={{ padding: 0, margin: 0 }}
                onClick={() => history.push('/cart')}
              >
                <div className="cart-icon">
                  <CartIcon />
                  <div className="cart-badge">
                    <div className="cart-badge__content">
                      <span className="cart-badge--count">
                        {productCount > 99 ? 99 : productCount}
                      </span>
                    </div>
                  </div>
                </div>
              </Col>
            )}
            <Col
              onClick={toggleNavbar}
              className={`burger-menu ${!collapsed ? 'is-open' : ''}`}
            >
              <div
                className={`burger-click-region ${
                  !collapsed ? 'active' : 'closing'
                }`}
              >
                <span className="burger-menu-piece"></span>
                <span className="burger-menu-piece"></span>
                <span className="burger-menu-piece"></span>
              </div>
            </Col>
          </Row>

          <Collapse isOpen={!collapsed} navbar>
            <Nav navbar>
              {isLogin && (
                <>
                  <NavItem className="mt2">
                    <div className="d-flex justify-content-end text-right">
                      <Link
                        to="/product"
                        className="size20"
                        onClick={toggleNavbar}
                      >
                        Product
                      </Link>
                    </div>
                  </NavItem>
                  <NavItem>
                    <div className="d-flex justify-content-end text-right">
                      <Link
                        to="/appointment-history"
                        className="size20"
                        onClick={toggleNavbar}
                      >
                        Appointment History
                      </Link>
                    </div>
                  </NavItem>
                  <NavItem>
                    <div className="d-flex justify-content-end text-right">
                      <Link
                        to="/account"
                        className="size20"
                        onClick={toggleNavbar}
                      >
                        Account
                      </Link>
                    </div>
                  </NavItem>
                </>
              )}
              <NavItem>
                <div className="d-flex justify-content-end text-right">
                  {isLogin ? (
                    <Link
                      to="/"
                      onClick={() => {
                        removeCookie('secret');
                        toggleNavbar();
                        window.location.replace('/');
                      }}
                      className="size16 logout"
                    >
                      LOG OUT
                    </Link>
                  ) : (
                    <Link
                      to="/login"
                      className="size16 pt3"
                      onClick={toggleNavbar}
                    >
                      LOG IN
                    </Link>
                  )}
                </div>
              </NavItem>
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    </div>
  );
}

Header.propTypes = {
  productCount: PropTypes.any,
  getTransaction: PropTypes.func,
  getCountShoppingCart: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  productCount: makeSelectProductCount(),
});

function mapDispatchToProps(dispatch) {
  return {
    getTransaction: () => dispatch(getTransactionRequest()),
    getCountShoppingCart: () => dispatch(getCountShoppingCartRequest()),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Header);
