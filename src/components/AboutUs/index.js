import React from 'react';
import Navbar from '../Navbar'; // Assuming you have a Navbar component
import prasad from '.././../assets/prasad.png';
import hari from '.././../assets/Hari.jpg';
import chandra from '.././../assets/Chandra.jpg';
import { FaRocket, FaCheckCircle, FaHandsHelping, FaShieldAlt ,FaLightbulb,FaHandshake,FaStar,FaHeart} from 'react-icons/fa'; // Icons for values
import './index.css';
import Footer from '../Footer';


const AboutUs = () => {
  return (
    <div>
      <Navbar />
      <div className="about-us-page">
  <div className="about-header">
    <h1>About Us</h1>
    <div className="about-content">
      <div className="about-point">
        <FaLightbulb className="icon" />
        <h3>Our Vision</h3>
        <p>We envision a world where finding the perfect rental home is as effortless as a few clicks. Our focus is on innovation, convenience, and transparency in the rental process.</p>
      </div>
      <hr className="divider" />

      <div className="about-point">
        <FaHandshake className="icon" />
        <h3>Our Commitment</h3>
        <p>Driven by passion and integrity, we are committed to creating a reliable and friendly platform for connecting owners with potential renters.</p>
      </div>
      <hr className="divider" />

      <div className="about-point">
        <FaStar className="icon" />
        <h3>What Sets Us Apart</h3>
        <p>With a dedicated team and unique approach, we provide a streamlined experience designed to make the rental journey smooth and stress-free.</p>
      </div>
    </div>
  </div>

  <div className="about-section mission-section">
    <h2>Our Mission</h2>
    <div className="mission-content">
      <div className="mission-point">
        <FaShieldAlt className="icon" />
        <h3>Building Trust</h3>
        <p>We aim to establish trust and credibility in the rental market, allowing users to interact with confidence and ease.</p>
      </div>
      <hr className="divider" />

      <div className="mission-point">
        <FaHeart className="icon" />
        <h3>Enhancing Experience</h3>
        <p>Beyond just connecting people, our goal is to enhance the quality of their living experience by facilitating seamless interactions.</p>
      </div>
      <hr className="divider" />

      <div className="mission-point">
        <FaRocket className="icon" />
        <h3>Innovating Constantly</h3>
        <p>We continuously improve our platform to meet evolving needs, ensuring our users have access to the latest tools and resources for a successful rental journey.</p>
      </div>
    </div>
  </div>



        {/* Our Values Section */}
        <div className="about-section values-section">
          <h2>Our Values</h2>
          <div className="values-container">
            <div className="value-card">
              <FaRocket className="value-icon" />
              <h3>Fast</h3>
              <p>Quick and efficient service that saves you time at every step.</p>
            </div>
            <div className="value-card">
              <FaCheckCircle className="value-icon" />
              <h3>Easy</h3>
              <p>User-friendly interface to make the rental process hassle-free.</p>
            </div>
            <div className="value-card">
              <FaHandsHelping className="value-icon" />
              <h3>Supportive</h3>
              <p>We’re here to help you, providing support and resources whenever needed.</p>
            </div>
            <div className="value-card">
              <FaShieldAlt className="value-icon" />
              <h3>Trustworthy</h3>
              <p>Reliable and transparent service to ensure your peace of mind.</p>
            </div>
          </div>
        </div>

        {/* Meet Our Team Section */}
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
              <div className="team-info third-about">
                <p className="team-name" style={{color:'#20c755'}}>Prasad Chowdary</p>
                <p className="team-role">Lead Developer</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutUs;
