import React from 'react';
import { Helmet } from 'react-helmet-async';
import Button from '../../components/Button/Button';

import CardAppointmentHistory from '../../components/Card/CardAppointmentHistory';
import HeaderTitle from '../../components/Header/HeaderTitle';

export default function AppointmentHistoryPage() {
  return (
    <article>
      <Helmet>
        <title>Appointment History</title>
        <meta
          title="Appointment History"
          content="Appointment History Page of mySkin.com"
        />
      </Helmet>

      <div className="content">
        <HeaderTitle title="Appointment History" />

        <CardAppointmentHistory />
        <CardAppointmentHistory />
        <CardAppointmentHistory />

        <div className="d-flex justify-content-center mt5 mb5">
          <Button>message your doctor</Button>
        </div>
      </div>
    </article>
  );
}
