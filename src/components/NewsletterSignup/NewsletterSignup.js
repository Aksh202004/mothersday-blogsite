import React from 'react';
import './NewsletterSignup.css';

const NewsletterSignup = () => {

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Newsletter subscribed (placeholder - no actual sending)');
  };

  return (
    <div className="newsletter-box">
      <h3 className="newsletter-title">Newsletter</h3>
      <p className="newsletter-description">
        Subscribe to receive exclusive content updates, travel & photo tips!
      </p>
      <form className="newsletter-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="newsletter-email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            id="newsletter-email"
            placeholder="example@|"
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="subscribe-button">
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
