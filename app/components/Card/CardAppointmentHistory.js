import moment from 'moment';
import React from 'react';

import DoctorImg from '../common/assets/images/dermatologist1.png';
import ArrowIcon from '../common/assets/icons/arrowDown.svg';
import ImageContainer from '../ImageContainer/ImageContainer';

export default function CardAppointmentHistory() {
  return (
    <div className="pt4 pb4 pl5 pr5 hr-thin card-appointment">
      <div className="d-flex align-items-center">
        <div className="profile">
          <ImageContainer
            src={DoctorImg}
            thumb={DoctorImg}
            height={100}
            width={100}
            alt="results"
            onIsVisible={() => {}}
          />
        </div>
        <div className="ml2">
          <h4 className="bold size20">Dr. Maria</h4>
        </div>
      </div>

      <button type="button" className="mt1 clear-button">
        <p className="size20">
          Halo Olivia, Nama saya Dr Maria (SpKK). Terima kasih sudah lakukan
          survei mySkin. Mohon ikuti rekomendasi obat ....
        </p>

        <div className="d-flex justify-content-between align-items-center mt15">
          <span className="size20">
            <b>{moment().format('DD MMM YYYY')}</b> |{' '}
            {moment().format('HH.mmA')}
          </span>

          <span className="icon-arrow">
            <ArrowIcon />
          </span>
        </div>
      </button>
    </div>
  );
}
