import React from "react";
import "./contact.css";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import Navbar from "../Navbar";

const ContactUs = () => {
  return (
    <div className="contact-page">
      <Navbar />
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>
          We're here to help you with any questions or inquiries you may have.
          Reach out to us via phone, email, or visit our office.
        </p>
      </div>
      <div className="contact-content">
        <div className="contact-info">
          <div className="contact-item">
            <FaPhoneAlt className="contact-icon" />
            <span>+91 9876543210</span>
          </div>
          <div className="contact-item">
            <FaEnvelope className="contact-icon" />
            <span>contact@stayspot.com</span>
          </div>
          <div className="contact-item">
            <FaMapMarkerAlt className="contact-icon" />
            <span>123 StaySpot St, Bangalore, India</span>
          </div>
        </div>
        <div className="contact-form-container">
          <form className="contact-form">
            <input
              type="text"
              className="contact-input-field"
              placeholder="Your Name"
            />
            <input
              type="email"
              className="contact-input-field"
              placeholder="Your Email"
            />
            <textarea
              className="contact-input-field"
              rows="5"
              placeholder="Your Message"
            ></textarea>
            <button type="submit" className="submit-btn">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
