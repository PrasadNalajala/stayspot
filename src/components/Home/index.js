import './index.css'
import familyImg from '../../assets/familylmg.png'
import profileMale from '../../assets/profileMale.png'
import profileWomen from '../../assets/ProfileWomen.png'
import apkPreview from '../../assets/apkPreview.png'
import { FaArrowRight, FaSearch, FaFilter, FaMobileAlt, FaChartLine, FaUsers, FaBell, FaQuoteLeft, FaQuoteRight } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { useEffect } from 'react'

const Home = () => {
    useEffect(() => {
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
            <div className='home'>
                <div className="welcome-section">
                    <h1 className="welcome-heading animate-on-scroll">
                        Welcome to <br />
                        <span>StaySpot👋</span>
                    </h1>
                    <p className="welcome-subtitle animate-on-scroll">
                        Your Perfect Home Awaits
                    </p>
                    <div className="product-hunt-badge" style={{width:'100%',display:'flex',justifyContent:'center',marginTop:'20px',marginBottom:'10px'}}>
                      <a href="https://www.producthunt.com/products/stayspot?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-stayspot" target="_blank" rel="noopener noreferrer">
                        <img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=990642&theme=light&t=1752079099862" alt="Stayspot - Your spot, your rules – Discover rentals your way. | Product Hunt" style={{width: '250px', height: '54px'}} width="250" height="54" />
                      </a>
                    </div>
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

                <div className="testimonials-section animate-on-scroll" style={{padding: '60px 0 40px 0', background: 'rgba(32,199,85,0.04)'}}>
                    <h1 style={{fontSize:'2.2rem', color:'#20c755', textAlign:'center', fontWeight:700, marginBottom:'2.5rem'}}>What Our Users Say</h1>
                    <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center', gap:'2rem', maxWidth:'900px', margin:'0 auto'}}>
                        <div style={{background:'#181c1a', borderRadius:'18px', boxShadow:'0 4px 24px rgba(32,199,85,0.10)', border:'1.5px solid #20c75522', padding:'2rem 1.5rem', maxWidth:'320px', minWidth:'260px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', position:'relative'}}>
                            <FaQuoteLeft style={{color:'#20c755', fontSize:'1.5rem', marginBottom:'8px'}} />
                            <p style={{color:'#fff', fontSize:'1.1rem', marginBottom:'1rem', lineHeight:1.6}}>
                                "Finding a rental was so easy with <span style={{color:'#20c755'}}>StaySpot</span>. The listings were accurate and the process was smooth!"
                            </p>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem'}}>
                                <img src={profileWomen} className='profile-img' alt='Happy customer' style={{width:'60px', height:'60px', borderRadius:'50%', border:'2.5px solid #20c755', objectFit:'cover'}} />
                                <span className='customer-name' style={{color:'#20c755', fontWeight:600}}>- Koushik K</span>
                            </div>
                            <FaQuoteRight style={{color:'#20c755', fontSize:'1.2rem', position:'absolute', right:'18px', bottom:'18px'}} />
                        </div>
                        <div style={{background:'#181c1a', borderRadius:'18px', boxShadow:'0 4px 24px rgba(32,199,85,0.10)', border:'1.5px solid #20c75522', padding:'2rem 1.5rem', maxWidth:'320px', minWidth:'260px', display:'flex', flexDirection:'column', alignItems:'center', textAlign:'center', position:'relative'}}>
                            <FaQuoteLeft style={{color:'#20c755', fontSize:'1.5rem', marginBottom:'8px'}} />
                            <p style={{color:'#fff', fontSize:'1.1rem', marginBottom:'1rem', lineHeight:1.6}}>
                                "I rented out my property within a week of posting it here. Super convenient!"
                            </p>
                            <div style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'0.5rem'}}>
                                <img src={profileMale} className='profile-img' alt='Satisfied property owner' style={{width:'60px', height:'60px', borderRadius:'50%', border:'2.5px solid #20c755', objectFit:'cover'}} />
                                <span className='customer-name' style={{color:'#20c755', fontWeight:600}}>- Boyapati Chandra</span>
                            </div>
                            <FaQuoteRight style={{color:'#20c755', fontSize:'1.2rem', position:'absolute', right:'18px', bottom:'18px'}} />
                        </div>
                    </div>
                </div>

                <div className="app-download-section animate-on-scroll" style={{background:'rgba(32,199,85,0.07)', borderRadius:'30px', margin:'2rem auto', maxWidth:'1100px', boxShadow:'0 8px 32px rgba(32,199,85,0.10)', display:'flex', flexWrap:'wrap', alignItems:'center', justifyContent:'center', padding:'3rem 2rem', gap:'2.5rem'}}>
                    <div className="text-content" style={{flex:'1 1 320px', minWidth:'260px', display:'flex', flexDirection:'column', gap:'1.5rem', alignItems:'flex-start'}}>
                        <h1 className="download-heading" style={{fontSize:'2.2rem', fontWeight:700, color:'#fff', marginBottom:'0.5rem'}}>
                            Download the <span style={{color:'#20c755'}}>StaySpot</span> App <span role="img" aria-label="mobile">📲</span>
                        </h1>
                        <p className="download-description" style={{fontSize:'1.1rem', color:'#a0a0a0', lineHeight:1.6, marginBottom:'1.5rem'}}>
                            Get instant access to new listings, manage your property, and stay connected with potential renters - all from your mobile device.
                        </p>
                        <div style={{width:'100%', display:'flex', justifyContent:'center'}}>
                          <a
                              href="https://drive.google.com/file/d/1ZYmrV4nPTdDA3iOkOXRshdRtlAgAbfVN/view?usp=drive_link"
                              target="_blank"
                              rel="noopener noreferrer"
                              className="download-btn"
                              style={{fontSize:'1.15rem', padding:'1rem 2.5rem', borderRadius:'50px', background:'linear-gradient(135deg, #20c755 0%, #1a9f45 100%)', color:'#fff', fontWeight:600, boxShadow:'0 4px 15px rgba(32,199,85,0.18)', marginTop:'0.5rem', transition:'all 0.3s'}}>
                              Download APK
                          </a>
                        </div>
                    </div>
                    <div className="image-content" style={{flex:'1 1 260px', display:'flex', justifyContent:'center', alignItems:'center'}}>
                        <img src={apkPreview} alt="StaySpot App Preview" className="app-mockup" style={{maxWidth:'260px', borderRadius:'20px', boxShadow:'0 20px 40px rgba(0,0,0,0.18)', transition:'transform 0.3s'}} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home