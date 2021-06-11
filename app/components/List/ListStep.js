import React from 'react';
import propTypes from 'prop-types';

export default function ListStep({ icon, title, children, iconSm }) {
  return (
    <div className="list-step">
      <div className="d-flex flex-row align-items-center">
        {icon && <div className={iconSm ? 'icon-sm' : ''}>{icon}</div>}
        <div>
          <h1 className="pt-serif fw700 size22">{title}</h1>
        </div>
      </div>

      <ol>{children}</ol>
    </div>
  );
}

ListStep.propTypes = {
  icon: propTypes.element,
  title: propTypes.string,
  children: propTypes.node,
  iconSm: propTypes.bool,
};
