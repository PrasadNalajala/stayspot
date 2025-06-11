import './index.css'
import familyImg from '../../assets/familylmg.png'
import profileMale from '../../assets/profileMale.png'
import profileWomen from '../../assets/ProfileWomen.png'
import apkPreview from '../../assets/apkPreview.png'
import { FaArrowRight, FaSearch, FaFilter, FaMobileAlt, FaChartLine, FaUsers, FaBell } from "react-icons/fa";
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'
import Footer from '../Footer'
import { useEffect } from 'react'

const Home = () => {
    useEffect(() => {
        // Add scroll animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, []);

    return (
        <div>
            <Navbar />
            <div className='home'>
                <div className="welcome-section">
                    <h1 className="welcome-heading animate-on-scroll">
                        Welcome to <br />
                        <span>StaySpot👋</span>
                    </h1>
                    <p className="welcome-subtitle animate-on-scroll">
                        Your Perfect Home Awaits
                    </p>
                </div>

                <div className='browse-rentals-section animate-on-scroll'>
                    <h1>Browse Rentals</h1>
                    <p>Explore a wide range of homes available for rent in your city. Whether you're looking for an apartment, house, or shared accommodation, we've got options to suit your needs.</p>
                    <div className='browse-rental-items-container'>
                        <ul>
                            <li>
                                <div className="feature-header">
                                    <FaSearch className="feature-icon" />
                                    <h3>Search by Location</h3>
                                </div>
                                <p>Use our advanced search to filter properties by city, neighborhood, or even street.</p>
                            </li>
                            <li>
                                <div className="feature-header">
                                    <FaFilter className="feature-icon" />
                                    <h3>Filter by Price, Size & More</h3>
                                </div>
                                <p>Narrow down your choices by price, number of rooms, amenities, and more.</p>
                            </li>
                            <li>
                                <div className="feature-header">
                                    <FaMobileAlt className="feature-icon" />
                                    <h3>Quick Preview</h3>
                                </div>
                                <p>See essential details like rent, property size, and location at a glance.</p>
                            </li>
                        </ul>

                        <div className="image-container">
                            <img src={familyImg} className='browse-img' alt='Family enjoying their new home' />
                        </div>
                    </div>
                    <Link className="browse-btn" to='/browse-rentals'>
                        View All Rentals <FaArrowRight />
                    </Link>
                </div>

                <div className='post-rentals browse-rentals-section animate-on-scroll'>
                    <h1>Post Rentals</h1>
                    <div className='post-rentals-section'>
                        <div className='post-rental-des'>
                            <p>
                                List your rental property quickly and easily on <span>StaySpot</span>. Our platform makes it simple to showcase your property to thousands of potential renters.
                            </p>
                            <div className="post-rental-features">
                                <div className="feature-card">
                                    <FaChartLine className="feature-icon" />
                                    <h3>Easy Listing</h3>
                                    <p>Create your listing in minutes with our simple step-by-step process. Add photos, set your price, and start receiving inquiries.</p>
                                </div>
                                <div className="feature-card">
                                    <FaUsers className="feature-icon" />
                                    <h3>Wide Reach</h3>
                                    <p>Your listing will be visible to thousands of potential renters actively searching for their next home in your area.</p>
                                </div>
                                <div className="feature-card">
                                    <FaBell className="feature-icon" />
                                    <h3>Instant Updates</h3>
                                    <p>Get notified immediately when someone shows interest in your property. Manage inquiries and schedule viewings efficiently.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Link className="browse-btn" to="/post-rental">
                        Post Your Rental <FaArrowRight />
                    </Link>
                </div>

                <div className='testimonials-section animate-on-scroll'>
                    <h1>What Our Users Say</h1>
                    <div className='testimonial-container'>
                        <div className="testimonial-content">
                            <p>"Finding a rental was so easy with <span>StaySpot</span>. The listings were accurate and the process was smooth!"</p>
                            <p className='customer-name'>- Koushik K</p>
                        </div>
                        <div className="testimonial-image">
                            <img src={profileWomen} className='profile-img' alt='Happy customer' />
                        </div>
                    </div>
                    <div className='testimonial-container'>
                        <div className="testimonial-content">
                            <p>"I rented out my property within a week of posting it here. Super convenient!"</p>
                            <p className='customer-name'>- Boyapati Chandra</p>
                        </div>
                        <div className="testimonial-image">
                            <img src={profileMale} className='profile-img' alt='Satisfied property owner' />
                        </div>
                    </div>
                </div>

                <div className="app-download-section animate-on-scroll">
                    <div className="download-container">
                        <div className="text-content">
                            <h1 className="download-heading">
                                Download the <span>StaySpot</span> App 📲
                            </h1>
                            <p className="download-description">
                                Get instant access to new listings, manage your property, and stay connected with potential renters - all from your mobile device.
                            </p>
                            <a
                                href="https://drive.google.com/file/d/1ZYmrV4nPTdDA3iOkOXRshdRtlAgAbfVN/view?usp=drive_link"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="download-btn"
                            >
                                Download APK
                            </a>
                        </div>
                        <div className="image-content">
                            <img src={apkPreview} alt="StaySpot App Preview" className="app-mockup" />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Home