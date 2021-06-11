import React from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from 'lodash-es';

// * Components
import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import ListWithIcon from '../List/ListWithIcon';
import DiagnoseIcon from '../common/assets/icons/diagnose.svg';
import SkinTypeIcon from '../common/assets/icons/skinType.svg';

export default function CardTreatment({ data }) {
  const history = useHistory();

  const renderContent = () => {
    if (!isEmpty(data)) {
      return (
        <>
          <div className="pl25 pr25 pt2 pb3">
            <ListWithIcon
              icon={<DiagnoseIcon />}
              title="Diagnosis"
              description={
                data.diagnosis ? data.diagnosis : 'Diagnosis tidak ditemukan'
              }
            />
            <div className="mt2" />
            <ListWithIcon
              icon={<SkinTypeIcon />}
              title="skin type"
              description={
                data.tipe_kulit ? data.tipe_kulit : 'Tipe kulit tidak ditemukan'
              }
            />
          </div>

          {data.diagnosis && (
            <div className="pl25 pr25 pb4">
              <Button
                onClick={() =>
                  history.push('/treatment-plan', {
                    diagnoseId: data.diagnose_id,
                  })
                }
              >
                Learn More
              </Button>
            </div>
          )}
        </>
      );
    }

    return (
      <div className="pl25 pr25 pt2 pb1">
        <h2>Data not found</h2>
      </div>
    );
  };

  return (
    <div className="card card-myskin card-form u-margin-top-medium u-margin-bottom-medium">
      {renderContent()}
    </div>
  );
}

CardTreatment.propTypes = {
  data: PropTypes.object,
};
