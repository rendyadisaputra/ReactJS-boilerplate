import React, { memo } from 'react';
import propTypes from 'prop-types';

import CardServicePlan from '../components/Card/CardServicePlan';

import { parseNumFormat } from '../helpers/GlobalHelper';

function SelectCareOption({
  data,
  loading,
  onPurchaseClick,
  onVideoCallClick,
}) {
  const renderCareOption = () => {
    if (data.length > 0) {
      if (!loading) {
        return data.map((item) => (
          <CardServicePlan
            key={item.care_id}
            serviceType={
              item.care_type === 1 ? 'Lightweight Care' : 'Full Care'
            }
            title={item.care_name}
            description={item.care_desc}
            recommended={item.care_recomended === 1}
            price={parseNumFormat(item.care_price)}
            onPurchaseClick={
              item.care_type === 1
                ? () => onPurchaseClick(item)
                : () => onVideoCallClick(item)
            }
          />
        ));
      }

      return <CardServicePlan loading={loading} />;
    }

    return <h2>Care Option Not Found</h2>;
  };

  return (
    <div className="container-myskin pt5 pb5">
      <h2 className="pt-serif bold size26 mb3">Select your care option</h2>

      {renderCareOption()}
    </div>
  );
}

SelectCareOption.propTypes = {
  data: propTypes.any,
  loading: propTypes.bool,
  onPurchaseClick: propTypes.func,
  onVideoCallClick: propTypes.func,
};

export default memo(SelectCareOption);
