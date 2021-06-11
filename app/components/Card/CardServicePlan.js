import React, { memo } from 'react';

import PropTypes from 'prop-types';

// * Components
import Skeleton from 'react-loading-skeleton';
import Button from '../Button/Button';

function CardServicePlan({
  recommended,
  serviceType,
  title,
  description,
  price,
  onPurchaseClick,
  loading,
}) {
  return (
    <div
      className={`card card-myskin card-service ${
        recommended ? 'card-service--recommended' : 'card-service--default'
      } u-margin-top-medium u-margin-bottom-medium`}
    >
      <div className="pl3 pr3">
        {recommended && (
          <div className="recommended">
            <p className="size16">Recommended</p>
          </div>
        )}

        <div className="card-service__content pt1 pb1">
          {loading ? (
            <>
              <Skeleton width={50} />
              <Skeleton style={{ height: '2rem' }} count={2} className="mt1" />
              <div className="mt2" />
              <Skeleton style={{ height: '1rem' }} count={3} className="mt1" />
            </>
          ) : (
            <>
              <p className="pt-serif">{serviceType}</p>
              <h2 className="pt-serif bold size23 mb1">{title}</h2>
              <p className="size20">{description}</p>
            </>
          )}
        </div>
      </div>
      <div className="hr-thin" />
      <div className="pl3 pr3">
        <div className="card-service__footer pt1 pb3">
          {loading ? (
            <div className="d-flex flex-column">
              <Skeleton style={{ height: '2rem', width: '10rem' }} />
              <Skeleton
                style={{ height: '3rem', width: '15rem' }}
                className="mt1"
              />
            </div>
          ) : (
            <>
              <p className="pt-serif bold size23">Rp. {price}</p>
              <Button onClick={onPurchaseClick}>Purchase Now</Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

CardServicePlan.propTypes = {
  recommended: PropTypes.bool,
  loading: PropTypes.bool,
  price: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  serviceType: PropTypes.string,
  onPurchaseClick: PropTypes.func,
};

CardServicePlan.defaultProps = {
  serviceType: 'Lightweight Care',
  title: 'Dermatologist Consult + Prescription Skincare',
  description:
    'Description lorem ipsum dolor sit amet ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor',
};

export default memo(CardServicePlan);
