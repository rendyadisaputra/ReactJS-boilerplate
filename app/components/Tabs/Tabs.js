import React from 'react';

import PropTypes from 'prop-types';

export function Tabs({ children }) {
  return <div className="tabs">{children}</div>;
}

export function TabItem({ active, title, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`tabs__head ${active && 'tabs__head--active'}`}
    >
      <span className="size18">{title}</span>
    </button>
  );
}

Tabs.propTypes = {
  children: PropTypes.node,
};

TabItem.propTypes = {
  title: PropTypes.string,
  active: PropTypes.bool,
  onClick: PropTypes.func,
};
