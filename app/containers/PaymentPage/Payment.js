/* eslint-disable no-unused-vars */
import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

import PropTypes from 'prop-types';
import { useFormik } from 'formik';

// * Redux Saga
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { paymentGatewaysRequest } from './actions';
import saga from './saga';
import reducer from './reducer';
import { useInjectReducer } from '../../utils/injectReducer';
import { useInjectSaga } from '../../utils/injectSaga';
import {
  makeSelectIsSuccess,
  makeSelectLoading,
  makeSelectPgsData,
} from './selector';

// * Components
import TextInput from '../../components/Form/TextInput';
import HeaderTitle from '../../components/Header/HeaderTitle';
import FormPayment from '../../layouts/FormPayment';
import Button from '../../components/Button/Button';

// * Utils
import { removeCookie } from '../../utils/cookie';
import { isInputError } from '../../helpers/GlobalHelper';
import LoaderModal from '../../components/Loader/LoaderModal';
import ArrowIcon from '../../components/common/assets/icons/arrowDown.svg';
import { FormUserpgsSchema } from '../../models/FormSchema';

const key = 'pgsData';

function Payment({
  loading,
  isSuccess,
  pgsData,
  getPaymentGateways,
  updateProfile,
}) {
  const formik = useFormik({
    validationSchema: FormUserpgsSchema,
    initialValues: {
      user_email: '',
      user_phone_number: '',
      user_address: '',
    },
    onSubmit: (values) => {},
  });

  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });

  const [loadingVisible, setLoadingVisible] = useState(false);

  useEffect(() => {
    if (isSuccess) {
      let data = pgsData;
      console.log(" user Data ", pgsData, data)

      formik.setValues(data);
    }
  }, [isSuccess]);

  useEffect(() => {
    getPaymentGateways();
  }, []);

  const handleUpdate = (type) => {
    formik.handleSubmit();

    return new Promise((resolve, reject) => {
      if (formik.isValid) {
        const payload = {
          [type]: formik.values[type],
        };
        updateProfile(payload);
        resolve(true);
      } else {
        setLoadingVisible(false);
        reject(new Error('Form is not valid'));
      }
    });
  };

  return (
    <article>
      <Helmet>
        <title>pgs Settings</title>
        <meta name="description" content="mySkin pgs Page" />
      </Helmet>

      <div className="content payment">
        <HeaderTitle title="Pilih Metode Pembayaran" />
        <section className="pgs-settings">
         
          {
            pgsData.length > 0? (
              <>
              {
              pgsData.map( element => {
                  return <div className="card-pgs pt5 pb5">
                    <button onClick={()=>{
                      console.log("hello ", element.id)
                    }} className="mt1 clear-button">
                      
                      <div className="">
                        <div className="pgs-title">
                           {element.title}
                        </div>
                        <div className="icon" dangerouslySetInnerHTML={{__html: element.icon}}>

                        </div>
                       
                      </div>
                      <span className="icon-arrow">
                            <ArrowIcon />
                          </span> 
                    </button>
                    </div>
                }
                )
              }
              
              </>
            ): <></>
          }
          
          <div className="ctn-click">
            &nbsp;
                {/* <Button onClick={() => {
                    // Go to Payment Gateway
                  }}
                >
                  Lanjutkan Pembayaran
                </Button> */}
              </div>
        </section>

        <LoaderModal loading={loadingVisible} />
      </div>
    </article>
  );
}

Payment.propTypes = {
  pgsData: PropTypes.array,
  loading: PropTypes.bool,
  isSuccess: PropTypes.bool,
  getPaymentGateways: PropTypes.func,
  updateProfile: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  pgsData: makeSelectPgsData(),
  loading: makeSelectLoading(),
  isSuccess: makeSelectIsSuccess(),
});

export function mapDispatchToProps(dispatch) {
  return {
    getPaymentGateways: () => dispatch(paymentGatewaysRequest()),
    updateProfile: (payload) => dispatch(updateProfileRequest(payload)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withConnect, memo)(Payment);
