/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { NavLink } from 'react-router-dom';
import Button from '../../components/Button/Button';

import NotFoundImage from '../../components/common/assets/images/notfound.jpg';

export default function NotFound() {
  return (
    <article>
      <Helmet>
        <title>Not Found</title>
        <meta title="Not Found" content="Maaf, saya pikir anda tersesat" />
      </Helmet>

      <div className="content bg-white">
        <section className="notfound-page">
          <div className="notfound">
            <img src={NotFoundImage} alt="Not Found" className="notfound-img" />

            <NavLink to="/">
              <Button className="u-margin-top-medium">Kembali ke Home</Button>
            </NavLink>
          </div>
        </section>
      </div>
    </article>
  );
}
