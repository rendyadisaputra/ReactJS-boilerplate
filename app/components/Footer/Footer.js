import React, { useEffect, useState } from 'react';

import { NavLink } from 'react-router-dom';

import axios from 'axios';

function Footer() {
  const [sosmed, setSosmed] = useState([]);

  useEffect(() => {
    getInitialize();
  }, []);

  const getInitialize = () => {
    const url = process.env.BASE_URL;
    return axios
      .get(`${url}/api/v1/content/social`)
      .then((res) => setSosmed(res.data.data))
      .catch((err) => Promise.reject(err));
  };

  return (
    <footer className="footer container-myskin">
      <div className="d-flex flex-column footer__menu">
        <div className="d-flex justify-content-between align-items-center">
          <NavLink to="/about-us">
            <p className="clear-space">About Us</p>
          </NavLink>
          <div className="d-flex footer__icon-sosmed">
            {sosmed.length > 0 &&
              sosmed.map((item) => (
                <a key={item.com_id} href={item.com_link} target="_blank">
                  <i className={item.com_icon}></i>
                </a>
              ))}
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb15">
          <p className="clear-space">Guides</p>
          <p className="clear-space">hello@www.myskin.id</p>
        </div>

        <div className="d-flex justify-content-between align-items-center">
          <NavLink to="/faq">
            <p className="clear-space">FAQ</p>
          </NavLink>
          <p className="clear-space">© mySkin</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
