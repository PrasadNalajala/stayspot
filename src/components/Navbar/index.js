import { useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaHome,
  FaSearch,
  FaPlus,
  FaInfoCircle,
  FaPhone,
  FaSignOutAlt,
  FaSignInAlt,
  FaUserCircle,
} from "react-icons/fa";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [profileDropdownActive, setProfileDropdownActive] = useState(false);
  const jwtToken = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownActive(!profileDropdownActive);
  };

  const isLoggedIn = jwtToken !== null;
  const userName = localStorage.getItem("userName") || "P";
  const userImageUrl = localStorage.getItem("userImageUrl");
  const loginIcon = isLoggedIn ? <FaSignOutAlt /> : <FaSignInAlt />;
  const profileIcon = userImageUrl ? (
    <img src={userImageUrl} alt="Profile" className="profile-image" />
  ) : (
    <div className="profile-placeholder">
      {isLoggedIn ? userName.charAt(0).toUpperCase() : <FaUserCircle />}
    </div>
  );

  return (
    <div className="nav-container">
      <Link
        className="logo-container"
        to="/"
        style={{ textDecoration: "none" ,outline:'none'}}
      >
        <p>StaySpot</p>
      </Link>
      <div className="nav-items-container">
        <FaBars className="menu-icon" onClick={toggleMenu} />
        <ul className={`menu ${menuActive ? "active" : ""}`}>
          <Link to="/" className="nav-link">
            <FaHome className="icon-only" />{" "}
            <span className="link-text">Home</span>
          </Link>
          <Link to="/browse-rentals" className="nav-link">
            <FaSearch className="icon-only" />{" "}
            <span className="link-text">Browse</span>
          </Link>
          <Link to="/post-rental" className="nav-link">
            <FaPlus className="icon-only" />{" "}
            <span className="link-text">Post</span>
          </Link>
          <Link to="/about-us" className="nav-link">
            <FaInfoCircle className="icon-only" />{" "}
            <span className="link-text">About</span>
          </Link>
          <li
            className="nav-link profile"
            onMouseEnter={() => setProfileDropdownActive(true)}
            onMouseLeave={() => setProfileDropdownActive(false)}
            onClick={toggleProfileDropdown} // For mobile support
          >
            {profileIcon}
            {profileDropdownActive && (
              <div className="profile-dropdown">
                {isLoggedIn ? (
                  <Link to="/profile" className="dropdown-item">
                    Profile 
                  </Link>
                ) : (
                  " "
                )}
                <div className="dropdown-item" onClick={handleLogout}>
                  {isLoggedIn ? "Logout" : "Login"}
                </div>
              </div>
            )}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
