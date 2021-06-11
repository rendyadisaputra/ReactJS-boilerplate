import React from 'react';
import PropTypes from 'prop-types';

import ErrorImage from '../components/common/assets/images/errorImage.jpg';

export default function ErrorLayout({ error }) {
  return (
    <div className="content bg-white pt5 pb5">
      <section className="container-myskin pb5">
        <h1 className="size50 bold">{error?.response.status}</h1>
        <h1 className="size50 bold">{error?.response.statusText}</h1>
        <p className="size20 mt1">
          Please come back again later, our developers will fixed immediately
        </p>
        <img src={ErrorImage} alt="error page" />
      </section>
    </div>
  );
}

ErrorLayout.propTypes = {
  error: PropTypes.any,
};
