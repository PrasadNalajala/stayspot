import React from 'react';
import { FaFacebookF, FaInstagram, FaLinkedin } from 'react-icons/fa';
import {FaXTwitter} from 'react-icons/fa6'
import './index.css';

const Footer = () => {
  return (
    <>
      <footer className="footer">
        <div className="footer-section about">
          <h2>About StaySpot</h2>
          <p>StaySpot is your go-to platform for discovering and posting rental properties, connecting owners and renters with ease. Our mission is to make the rental experience hassle-free and enjoyable for everyone involved.</p>
        </div>
        <div className="footer-section quick-links">
          <h2>Quick Links</h2>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/post-rental">Post Rental</a></li>
            <li><a href="/browse-rentals">Browse Rentals</a></li>
            <li><a href="/contact">Contact Us</a></li>
            <li><a href="/about-us">About Us</a></li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h2>Contact Us</h2>
          <p>Email: <a  style={{color:'#bbbbbb',textDecoration:'none'}}href={`mailto:support@stayspot.com}`}>support@stayspot.com</a></p>
          <p>Phone: <a style={{color:'#bbbbbb',textDecoration:'none'}} href={`tel:8374240950`}>+91 8374240950</a></p>
          <p>Address: Seena Shop, Polepalli, Anantapur, India</p>
        </div>
        <div className="footer-section social-media">
          <h2>Follow Us</h2>
          <div className="social-icons">
            <a href="https://www.facebook.com/nalajala.prasadchowdary" target='_blank'><FaFacebookF className="social-icon fb-icon" /></a>
            <a href="https://www.x.com/prasadNalajala/" target='_blank'><FaXTwitter className="social-icon twitter-icon" /></a>
            <a href="https://www.instagram.com/prasad.chowwdary/" target='_blank'><FaInstagram className="social-icon insta-icon" /></a>
            <a href="https://www.linkedin.com/in/prasad-nallajala/" target='_blank'><FaLinkedin className="social-icon linkedin-icon" /></a>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
