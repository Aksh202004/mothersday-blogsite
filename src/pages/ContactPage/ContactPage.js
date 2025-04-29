import React from 'react';
import './ContactPage.css';

const ContactPage = () => {
  const placeholderText = "Donec accumsan purus nec ligula volutpat posuere. Integer lectus lorem, mollis eget varius condimentum, vehicula eu arcu. Duis viverra orci vel pretium eleifend. Phasellus sit amet pellentesque risus. Nulla ut ex sit amet nisl malesuada semper.";

  const handleSubmit = (event) => {
    event.preventDefault();
    alert('Form submitted (placeholder - no actual sending)');
  };

  return (
    <div className="contact-page container">
      <h1 className="contact-page-title">Contact</h1>

      <div className="contact-content-area">
        <div className="contact-left-column">
          <img
            src="/images/placeholder.png"
            alt="Contact illustration"
            className="contact-image"
          />
          <p className="contact-text">{placeholderText}</p>
        </div>

        <div className="contact-right-column">
          <form className="contact-form" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="form-group form-group-half">
                <label htmlFor="name">Your Name</label>
                <input type="text" id="name" name="name" required />
              </div>
              <div className="form-group form-group-half">
                <label htmlFor="email">Your Email</label>
                <input type="email" id="email" name="email" required />
              </div>
            </div>
            <div className="form-group">
              <label htmlFor="subject">Subject</label>
              <input type="text" id="subject" name="subject" required />
            </div>
            <div className="form-group">
              <label htmlFor="message">Your message</label>
              <textarea id="message" name="message" rows="6" required></textarea>
            </div>
            <button type="submit" className="contact-submit-button">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
