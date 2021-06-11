import React from 'react';

import PropTypes from 'prop-types';

import DotLoader from 'react-spinners/DotLoader';

export default function LoaderModal({ loading }) {
  return (
    <div className={`loader-modal ${!loading ? 'zoom-out' : 'zoom-in'}`}>
      <DotLoader color="#10777e" size={30} loading={loading} />
    </div>
  );
}

LoaderModal.propTypes = {
  loading: PropTypes.bool,
};
