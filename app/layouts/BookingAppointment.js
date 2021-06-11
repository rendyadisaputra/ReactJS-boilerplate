import React, { useState } from 'react';

import PropTypes from 'prop-types';

// * Date
import { getMonth, getYear, format } from 'date-fns';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// * Components
import { Col, Row } from 'reactstrap';
import HTMLReactParser from 'html-react-parser';
import { useToasts } from 'react-toast-notifications';

// * Assets
import ArrowSvg from '../components/common/assets/icons/arrowDown.svg';
import Button from '../components/Button/Button';
import SelectInput from '../components/Form/SelectInput';
import ImageContainer from '../components/ImageContainer/ImageContainer';

export default function BookingAppointment({
  onConfirm,
  loading,
  dermatologist,
  handleChangeDate,
  handleChangeTime,
}) {
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [doctor, setDoctor] = useState({
    label: 'Select your dermatologist',
    value: undefined,
  });

  const { addToast } = useToasts();

  const isValid = date && time && doctor.value;

  const handleConfirm = () => {
    if (!isValid) {
      if (!date) {
        window.scrollTo(0, 200);
        return addToast('Please select the date', {
          appearance: 'error',
          autoDismiss: true,
        });
      }

      if (!time) {
        window.scrollTo(0, 600);
        return addToast('Please select the time', {
          appearance: 'error',
          autoDismiss: true,
        });
      }

      if (!doctor.value) {
        return addToast('Please select the dermatologist', {
          appearance: 'error',
          autoDismiss: true,
        });
      }
    }

    return onConfirm(date, time, doctor.value.user_id);
  };

  const options = () => {
    if (dermatologist.length > 0) {
      const data = dermatologist.map((item) => ({
        label: item.user_fullname,
        value: item,
      }));

      return data;
    }

    return [];
  };

  return (
    <div>
      <div className="container-myskin pt5 pb5">
        <CardDate
          title="Select the date"
          handleChange={(value) => {
            setDate(value);
            handleChangeDate(value);
            setDoctor({ label: 'Select your dermatologist', value: undefined });
          }}
        />
        <CardDate
          onlyTime
          title="Select the time"
          handleChange={(value) => {
            setTime(value);
            handleChangeTime(value);
            setDoctor({ label: 'Select your dermatologist', value: undefined });
          }}
        />
        <div className="pb2">
          <SelectInput
            required
            spacing
            placeholder="Select your dermatologist"
            value={doctor}
            onChange={(e) => {
              setDoctor(e);
            }}
            options={options()}
            className="u-margin-bottom-small"
          />
        </div>

        {doctor.value && (
          <div className="card card-myskin card-form mb5 pl2 pr2 pt1 pb2">
            <h2 className="pt-serif size225 bold mb15">Your Dermatologist</h2>
            <Row className="align-items-center mb1">
              <Col xs="3">
                <ImageContainer
                  src={doctor.value?.user_photo_profile}
                  thumb={doctor.value?.user_photo_profile}
                  height={100}
                  width={100}
                  alt="Dermatologist"
                  onIsVisible={() => {}}
                  className="circle"
                />
              </Col>
              <Col style={{ paddingLeft: 0 }}>
                <p className="size18 clear-space">
                  Dr. {doctor.value.user_fullname}
                </p>
              </Col>
            </Row>
            <div className="clear-space size18">
              {HTMLReactParser(doctor.value.user_biography)}
            </div>
          </div>
        )}
      </div>

      <div className="bg-green pl5 pr5 pt5 pb5 section-up-radius mb3">
        <h1 className="text-white title mb2">Your Appointment</h1>

        <Row className="d-flex align-items-center">
          <Col xs="7">
            <p className="text-white size20" style={{ margin: 0 }}>
              {date ? format(date, 'MMMM dd, yyyy') : '-'}
            </p>
            <p className="text-white size20">
              {time ? format(time, 'H:mma') : '-'}
            </p>
          </Col>
          <Col xs="5">
            <Button
              className="btn-white text-black"
              onClick={handleConfirm}
              isLoading={loading}
            >
              Confirm
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
}

const CardDate = ({ onlyTime, title, handleChange }) => {
  const [startDate, setStartDate] = useState();
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  return (
    <div className="card card-myskin card-form pt1 pb2 u-margin-top-small u-margin-bottom-medium">
      <div className="pl2 pr2">
        <h2 className="pt-serif bold size22 mb1">{title}</h2>
      </div>
      {onlyTime ? (
        <DatePicker
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            handleChange(date);
          }}
          showTimeSelect
          showTimeSelectOnly
          inline
          timeCaption=""
          timeIntervals={30}
          dateFormat="h:mm aa"
        />
      ) : (
        <DatePicker
          inline
          selected={startDate}
          onChange={(date) => {
            setStartDate(date);
            handleChange(date);
          }}
          minDate={new Date()}
          renderCustomHeader={({
            date,
            decreaseMonth,
            increaseMonth,
            prevMonthButtonDisabled,
            nextMonthButtonDisabled,
          }) => (
            <div className="d-flex justify-content-center align-items-center">
              <button
                type="button"
                onClick={decreaseMonth}
                disabled={prevMonthButtonDisabled}
                className="arrow arrow--left"
              >
                <ArrowSvg />
              </button>

              <span className="size20 bold pl4 pr4">
                {months[getMonth(date)]} {getYear(date)}
              </span>

              <button
                type="button"
                onClick={increaseMonth}
                disabled={nextMonthButtonDisabled}
                className="arrow arrow--right"
              >
                <ArrowSvg />
              </button>
            </div>
          )}
        />
      )}
    </div>
  );
};

CardDate.propTypes = {
  onlyTime: PropTypes.bool,
  title: PropTypes.string,
  handleChange: PropTypes.func,
};

BookingAppointment.propTypes = {
  onConfirm: PropTypes.func,
  handleChangeDate: PropTypes.func,
  handleChangeTime: PropTypes.func,
  loading: PropTypes.bool,
  dermatologist: PropTypes.array,
};
