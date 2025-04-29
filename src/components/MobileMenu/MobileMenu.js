import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import NewsletterSignup from '../NewsletterSignup/NewsletterSignup';
import './MobileMenu.css';

const MobileMenu = ({ isOpen, onClose }) => {
  const location = useLocation();

  if (!isOpen) {
    return null;
  }

  const handleLinkClick = () => {
    onClose();
  };

  const overlayClassName = `mobile-menu-overlay ${isOpen ? 'open' : ''}`;


  return (
    <div className={overlayClassName} onClick={onClose}>
      <div className="mobile-menu-content two-column" onClick={(e) => e.stopPropagation()}>
        <div className="mobile-menu-left">
          <nav className="mobile-menu-nav">
            <ul>
              <li>
                <Link
                  to="/"
                  className={location.pathname === '/' ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className={location.pathname === '/about' ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  About me
                </Link>
              </li>
              <li>
                <Link
                  to="/categories"
                  className={location.pathname === '/categories' ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Categories
                </Link>
              </li>
              <li>
              <Link
                  to="/contact"
                  className={location.pathname === '/contact' ? 'active' : ''}
                  onClick={handleLinkClick}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mobile-menu-right">
          <NewsletterSignup />
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
