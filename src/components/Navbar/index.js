import { useEffect, useState } from "react";
import "./index.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
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
  FaHeart,
  FaEnvelope,
} from "react-icons/fa";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [profileDropdownActive, setProfileDropdownActive] = useState(false);
  const jwtToken = localStorage.getItem("token");
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [userImageUrl, setProfileImageUrl] = useState("");
  const fecthUserDetails = async () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log(token);
      const response = await axios.get("https://stayspot.onrender.com/api/user", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data[0];
      setProfileImageUrl(data?.profile_url);
      setUserName(data?.name);
    }
  };

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

  const loginIcon = isLoggedIn ? <FaSignOutAlt /> : <FaSignInAlt />;
  const profileIcon = userImageUrl ? (
    <img src={userImageUrl} alt="Profile" className="profile-image-navbar" />
  ) : (
    <div className="profile-placeholder">
      {isLoggedIn && userName && userName.trim().length > 0 ? <span>{userName.charAt(0).toUpperCase()}</span> : <FaUserCircle size={40} />}
    </div>
  );

  useEffect(() => {
    fecthUserDetails();
  },[]);

  return (
    <div className="nav-container">
      <Link
        className="logo-container"
        to="/"
        style={{ textDecoration: "none", outline: "none" }}
      >
        <p>StaySpot</p>
      </Link>
      <div className="nav-items-container">
        <FaBars className="menu-icon"  style={{outline:'none'}} onClick={toggleMenu} />
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
                  <>
                    <Link to="/profile" className="dropdown-item">
                      Profile
                    </Link>
                    <Link to="/your-listings" className="dropdown-item">
                      Your Listings
                    </Link>
                    <Link to="/favorites" className="dropdown-item">
                      Favorites
                    </Link>
                    <Link to="/messages" className="dropdown-item">
                      Messages
                    </Link>
                  </>
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
