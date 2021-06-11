import React from 'react';

import PropTypes from 'prop-types';

export default function HeaderTitle(props) {
  return (
    <div className="bg-gradient-primary">
      <div className="container-myskin header-title">
        <h1 className="title text-white">{props.title}</h1>
      </div>
    </div>
  );
}

HeaderTitle.propTypes = {
  title: PropTypes.string,
};
