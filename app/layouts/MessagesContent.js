import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import HTMLReactParser from 'html-react-parser';

import Button from '../components/Button/Button';

export default function MessagesContent({
  name,
  profileImg,
  dateTime,
  title,
  message,
}) {
  return (
    <div className="message">
      <div className="message__head">
        <img
          src={profileImg}
          alt="dermatologist 1"
          className="message__head--profile"
        />
        <div className="d-flex flex-column">
          <span className="size20 fw700">{name}</span>
          <span className="size20">
            {moment(dateTime).format('DD MMM YYYY')} |{' '}
            {moment(dateTime).format('HH:MMA')}
          </span>
        </div>
      </div>

      <div className="message__body">
        <div className="size18">
          <strong>{HTMLReactParser(title)}</strong>
        </div>
        <div className="size18">{HTMLReactParser(message)}</div>

        <Button className="mt3">Reply</Button>
      </div>
    </div>
  );
}

MessagesContent.propTypes = {
  name: PropTypes.string,
  profileImg: PropTypes.string,
  title: PropTypes.string,
  dateTime: PropTypes.string,
  message: PropTypes.string,
};
