/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { NavLink } from 'react-router-dom';

import PropTypes from 'prop-types';
import { getCookie, removeCookie } from '../../utils/cookie';

export default function Sidenav(props) {
  const data = getCookie('secret');
  const isLogin = data ? JSON.parse(data).token : null;

  return (
    <>
      <div
        className="overlay"
        onClick={props.handleClose}
        style={{
          visibility: props.open ? 'hidden' : 'visible',
          opacity: props.open ? 0 : 1,
        }}
      />
      <div
        className="sidenav d-flex flex-column"
        style={{
          width: props.open ? '0px' : '30rem',
        }}
      >
        <div className="flex1">
          <NavLink
            to={isLogin ? '/account' : '/login'}
            onClick={props.handleClose}
          >
            <p>{isLogin ? 'Account' : 'Login'}</p>
          </NavLink>
        </div>
        {isLogin && (
          <div>
            <NavLink
              to="/"
              onClick={() => {
                removeCookie('secret');
                props.handleClose();
                window.location.reload();
              }}
            >
              <p className="logout">Logout</p>
            </NavLink>
          </div>
        )}
      </div>
    </>
  );
}

Sidenav.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
};
