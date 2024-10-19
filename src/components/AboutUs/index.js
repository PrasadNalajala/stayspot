import React from 'react';
import Navbar from '../Navbar';  // Assuming you have a Navbar component
import prasad from '.././../assets/prasad.png'
import hari from '.././../assets/Hari.jpg'
import chandra from '.././../assets/Chandra.jpg'
import { FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';  // Icons for contact
import './index.css';
import Footer from '../Footer';

const AboutUs = () => {
  return (
    <div>
      <Navbar />
    <div className="about-us-page">
      <div className="about-header">
        <h1>About Us</h1>
        <p>We are a passionate team working to transform the rental experience with innovative solutions. Our mission is to connect people with their dream homes effortlessly.</p>
      </div>

      
      <div className="about-section mission-section">
        <h2>Our Mission</h2>
        <p>We strive to create a seamless and trustworthy platform where house owners and renters can meet and interact with confidence. Our goal is to offer more than just a marketplace — we aim to be a bridge that enhances living experiences.</p>
      </div>

      
      <div className="about-section team-section">
        <h2>Meet Our Team</h2>
        <div className="team-container">
          <div className="team-card">
            <img src={chandra} alt="Team Member 1" className="team-img" />
            <div className="team-info">
              <p className="team-name" style={{color:'#20c755'}}>Chandra Boyapati</p>
              <p className="team-role">Founder & CEO</p>
            </div>
          </div>
          <div className="team-card">
            <img src={hari} alt="Team Member 2" className="team-img" />
            <div className="team-info">
              <p className="team-name" style={{color:'#20c755'}}>Hari Peddireddy</p>
              <p className="team-role">Chief Marketing Officer</p>
            </div>
          </div>
          <div className="team-card">
            <img src={prasad} alt="Team Member 3" className="team-img" />
            <div className="team-info">
              <p className="team-name" style={{color:'#20c755'}}>Prasad Chowdary</p>
              <p className="team-role">Lead Developer</p>
            </div>
          </div>
        </div>
      </div>

      
      {/* <div className="about-section contact-section">
        <h2>Contact Us</h2>
        <div className="contact-info">
          <FaEnvelope className="contact-icon" />
          <p>Email: support@stayspot.com</p>
        </div>
        <div className="contact-info">
          <FaPhoneAlt className="contact-icon" />
          <p>Phone: +91 8374240950</p>
        </div>
        <div className="contact-info">
          <FaMapMarkerAlt className="contact-icon" />
          <p>Address: Seena Shop, Polepalli, Anantapur, India</p>
        </div>
      </div> */}
     
    </div>
     <Footer/>
    </div>
  );
};

export default AboutUs;
