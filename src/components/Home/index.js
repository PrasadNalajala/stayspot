import './index.css'
import familyImg from '../../assets/familylmg.png'
import house1 from '../../assets/house1.png'
import profileMale from '../../assets/profileMale.png'
import profileWomen from '../../assets/ProfileWomen.png'
import { FaArrowRight } from "react-icons/fa";
import Navbar from '../Navbar'
import { Link } from 'react-router-dom'
const Home=(props)=>{

    
    return(
        <div>
            <Navbar/>
        <div className='home'>
            <div className="welcome-section">
                <h1 className="welcome-heading">Welcome to <br/><span>StaySpot</span></h1>
            </div>
           
            <div className='browse-rentals-section'> 
                
                <h1>Browse Rentals</h1>
                <p>Explore a wide range of homes available for rent in your city. Whether you're looking for an apartment, house, or shared accommodation, we've got options to suit your needs.</p>
                <div className='browse-rental-items-container'>
                <ul>
                    <li>Search by Location🔍</li>
                    <p>Use our advanced search to filter properties by city, neighborhood, or even street.</p>
                    <li>Filter by Price, Size & More ⏳</li>
                    <p>Narrow down your choices by price, number of rooms, amenities, and more.</p>
                    <li>Quick Preview📱</li>
                    <p>See essential details like rent, property size, and location at a glance.</p>
                </ul>            
                
                
                <div>
                    <img src={familyImg} className='browse-img' alt=''/>
                </div>
                </div>
                <Link class="browse-btn" to='/browse-rentals'>View All Rentals <FaArrowRight/></Link>
           </div>
           <div className='post-rentals browse-rentals-section'>
                        <h1>Post Rentals</h1>
                        <div className='post-rentals-section'>
                            <div>
                            <img src={house1} className='browse-img' alt='house'/>
                            </div>
                            <div className='post-rental-des'>
                                <p>
                                List your rental property quickly and easily on <span>StaySpot</span>. Add your property details, upload photos, and set your rental price in just a few steps. Your listing will be seen by thousands of renters actively looking for their next home.

                                    With StaySpot, managing your property is hassle-free. You can update your listing, track inquiries, and connect with potential tenants all from your dashboard.

                                    Start listing today and find your perfect renter
                                    
                                </p>
                                <p>
                                Once your listing is live, it will be visible to thousands of potential renters actively searching for homes. Our platform is designed to attract the right audience, helping you find your ideal tenant quickly and efficiently.
                                </p>
                            </div>
                        </div>
                        <Link class="browse-btn" to="/post-rental">Post Your Rental <FaArrowRight/></Link>
           </div>
           <div className='testimonials-section'>
            <h1>Testimonials</h1>
            <div className='testimonial-container'>
            <div>
                <p>"Finding a rental was so easy with <span>StaySpot</span>. The listings were accurate and the process was smooth!"
            </p>
            <p className='customer-name'>- Sarah T</p>
            </div>
            <div>
                <img src={profileWomen} className='profile-img'alt='profile'/>
            </div>
            </div>
            <div className='testimonial-container'>
            <div>
                <p>"I rented out my property within a week of posting it here. Super convenient!"
            </p>
            <p className='customer-name'>- Boyapati Chandra</p>
            </div>
            <div className='profile-img-container'>
                <img src={profileMale} className='profile-img' alt='profile'/>
            </div>
            </div>
           </div>
        </div>
        </div>
    )
}

export default Home