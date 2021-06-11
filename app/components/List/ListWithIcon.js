import React from 'react';

import PropTypes from 'prop-types';

export default function ListWithIcon({ icon, description, title }) {
  return (
    <div noGutters className="list">
      <div className="list__icon">{icon && icon}</div>
      <div className="list__title">
        <span className="size18 fw700 uppercase">{title}</span>
        <span className="size18">{description}</span>
      </div>
    </div>
  );
}

ListWithIcon.propTypes = {
  icon: PropTypes.element,
  title: PropTypes.string,
  description: PropTypes.string,
};
