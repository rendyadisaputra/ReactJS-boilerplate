/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { hot } from 'react-hot-loader/root';

import HomePage from 'containers/HomePage/Loadable';
import LoggedInPage from 'containers/LoggedInPage/Loadable';
import LoginPage from 'containers/LoginPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import CreateAccountPage from 'containers/CreateAccountPage/Loadable';
import QuestionarePage from 'containers/QuestionarePage/Loadable';
import AccountPage from 'containers/AccountPage/Loadable';
import CheckoutPage from 'containers/CheckoutPage/Loadable';
import PaymentPage from 'containers/PaymentPage/Loadable';
import TreatmentPlanPage from 'containers/TreatmentPlanPage/Loadable';
import AboutUsPage from 'containers/AboutUsPage/Loadable';
import FaqPage from 'containers/FaqPage/Loadable';
import ReferralPage from 'containers/ReferralPage/Loadable';
import AppointmentHistoryPage from 'containers/AppointmentHistoryPage/Loadable';
import ProductPage from 'containers/ProductPage/Loadable';
import ProductDetailPage from 'containers/ProductDetailPage/Loadable';
import CartPage from 'containers/CartPage/Loadable';
import ForgetPasswordPage from 'containers/ForgetPasswordPage/Loadable';
import ResetPasswordPage from 'containers/ResetPasswordPage/Loadable';

// Header and Footer
import Header from 'components/Header';
import Footer from 'components/Footer';
import { getCookie } from '../../utils/cookie';

function App() {
  const data = getCookie('secret');
  const isLogin = data ? JSON.parse(data).token : null;

  return (
    <div className="page-app">
      <Helmet titleTemplate="%s - mySkin.com" defaultTitle="Welcome to mySKin">
        <meta name="description" content="A mySkin application" />
      </Helmet>
      <Header />
      {isLogin ? (
        <Switch>
          <Route exact path="/" component={LoggedInPage} />
          <Route exact path="/questionnaire" component={QuestionarePage} />
          <Route exact path="/account" component={AccountPage} />
          <Route exact path="/checkout" component={CheckoutPage} />
          <Route exact path="/checkout/payment" component={PaymentPage} />
          <Route exact path="/treatment-plan" component={TreatmentPlanPage} />
          <Route exact path="/service-plan" component={CreateAccountPage} />
          <Route exact path="/about-us" component={AboutUsPage} />
          <Route exact path="/faq" component={FaqPage} />
          <Route exact path="/referral" component={ReferralPage} />
          <Route
            exact
            path="/appointment-history"
            component={AppointmentHistoryPage}
          />
          <Route exact path="/product" component={ProductPage} />
          <Route
            exact
            path="/product/detail/:id"
            component={ProductDetailPage}
          />
          <Route exact path="/cart" component={CartPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/" component={LoginPage} />
          <Route exact path="/create-account" component={CreateAccountPage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/about-us" component={AboutUsPage} />
          <Route exact path="/forget-password" component={ForgetPasswordPage} />
          <Route exact path="/reset-password" component={ResetPasswordPage} />
          <Route exact path="/faq" component={FaqPage} />
          <Route path="" component={NotFoundPage} />
        </Switch>
      )}
      <Footer />
    </div>
  );
}
export default hot(App);
