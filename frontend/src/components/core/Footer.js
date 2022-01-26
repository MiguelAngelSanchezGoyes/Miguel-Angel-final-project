/* eslint-disable arrow-body-style */
import React from 'react';
import './Footer.scss';

const Footer = () => {
  const title = 'Made with 💜 by Miguel';

  return (
    <footer className="footer">
      <h2 className="footer__title">{title}</h2>
    </footer>
  );
};

export default Footer;
