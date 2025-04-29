import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-bottom">
        <div className="container footer-bottom-content">
          <div className="footer-bottom-left">
            <div className="footer-title">Personal Travel</div>
            <p className="footer-copyright">&copy; {new Date().getFullYear()} All Rights Reserved.</p>
          </div>
          <nav className="footer-bottom-nav">
            <Link to="/">Home</Link>
            <Link to="/about">About me</Link>
            <Link to="/categories">Categories</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
