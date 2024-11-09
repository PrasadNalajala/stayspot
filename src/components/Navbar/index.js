import { useState } from 'react';
import './index.css';
import { Link, useNavigate } from 'react-router-dom';
import { FaBars, FaHome, FaSearch, FaPlus, FaInfoCircle, FaPhone, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
    const [menuActive, setMenuActive] = useState(false);
    const jwtToken = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };
    
    const toggleMenu = () => {
        setMenuActive(!menuActive);
    };

    const isLoggedin = jwtToken !== null ? 'Logout' : 'Login';
    const loginIcon = jwtToken !== null ? <FaSignOutAlt /> : <FaSignInAlt />;

    return (
        <div className="nav-container">
            <Link className="logo-container" to="/" style={{ textDecoration: 'none' }}>
                <p>StaySpot</p>
            </Link>
            <div className="nav-items-container">
                <FaBars className="menu-icon" onClick={toggleMenu} />
                <ul className={`menu ${menuActive ? 'active' : ''}`}>
                    <Link to='/' className='nav-link'>
                        <FaHome className="icon-only" /> <span className="link-text">Home</span>
                    </Link>
                    <Link to='/browse-rentals' className='nav-link'>
                        <FaSearch className="icon-only" /> <span className="link-text">Browse</span>
                    </Link>
                    <Link to='/post-rental' className='nav-link'>
                        <FaPlus className="icon-only" /> <span className="link-text">Post</span>
                    </Link>
                    <Link to='/about-us' className='nav-link'>
                        <FaInfoCircle className="icon-only" /> <span className="link-text">About</span>
                    </Link>
                    <Link to='/contact' className='nav-link'>
                        <FaPhone className="icon-only" /> <span className="link-text">Contact</span>
                    </Link>
                    <li className='nav-link logout' onClick={handleLogout}>
                        {loginIcon} <span className="link-text">{isLoggedin}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Navbar;
