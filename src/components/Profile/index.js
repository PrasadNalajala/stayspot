import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Navbar from "../Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
import { FaHome, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import "./index.css";

const Profile = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("");
  const [occupation, setOccupation] = useState("");
  const [phone, setPhone] = useState("");
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [name, setName] = useState("Prasad Nallajala");
  const [userListings, setUserListings] = useState([]);
  const [listingsLoading, setListingsLoading] = useState(false);
  let timeAgo;
  if (userDetails && userDetails.created_at) {
    try {
      const date = new Date(userDetails.created_at);
      if (!isNaN(date.getTime())) {
        timeAgo = formatDistanceToNow(date, { addSuffix: true });
      } else {
        timeAgo = "Recently";
      }
    } catch (error) {
      timeAgo = "Recently";
    }
  } else {
    timeAgo = "Recently";
  }

  const fecthUserDetails = async () => {
    const token = localStorage.getItem("token");
    console.log(token);
    const response = await axios.get("https://stayspot.onrender.com/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = response.data;
    setUserDetails(data);
    setImage(data.profile_url);
    setImageUrl(data.profile_url);
    setEmail(data.email);
    setPhone(data.phone_number);
    setOccupation(data.occupation);
    setBio(data.bio);
    setLocation(data.location);
  };

  const fetchUserListings = async () => {
    try {
      setListingsLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get("https://stayspot.onrender.com/api/user/rentals", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUserListings(response.data);
    } catch (error) {
      console.error("Error fetching user listings:", error);
    } finally {
      setListingsLoading(false);
    }
  };

  const updateUserDetails=async()=>{
    const token = localStorage.getItem("token");
    const data={
      name: name,
      location: location,
      occupation: occupation,
      phone_number: phone,
      bio: bio,
      profile_url: imageUrl,
      
    }
    try {
      const response = await axios.put("https://stayspot.onrender.com/api/user", data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error.response) {
        toast.success(error.response.data);
      } else {
        toast.success(error.message);
      }
    }
    
  }
  
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      uploadImageToCloud(file);
    }
  };

  const uploadImageToCloud = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "imageUrl");
    axios
      .post(`https://api.cloudinary.com/v1_1/dnd03w7us/image/upload`, formData)
      .then((response) => {
        setImageUrl(response.data.secure_url);
      })
      .catch((error) => {
        toast.error("Failed to upload image");
      });
  };

  const handleSave = () => {
    updateUserDetails()
  };

  useEffect(() => {
    fecthUserDetails();
    fetchUserListings();
  }, []);

  const renderProfileImage = () => {
    if (!imageUrl && !image) {
      return (
        <div className="profile-image-placeholder">{name[0].toUpperCase()}</div>
      );
    }
    return (
      <img src={imageUrl || image} alt="Profile" className="profile-image" />
    );
  };

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-section">
            <div className="profile-picture">
              {renderProfileImage()}
              <label htmlFor="upload-button" className="edit-icon">
                <FiEdit2 size={18} />
              </label>
              <input
                id="upload-button"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="upload-input"
              />
            </div>
            <div>
              <h2 className="username">{name}</h2>
              <p className="info-label">Joined {timeAgo}</p>
            </div>
          </div>
          <div className="profile-info">
            <div className="info-row">
              <p className="info-label">Email</p>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="editable-input"
              />
            </div>

            <div className="info-row">
              <p className="info-label">Phone</p>
              <input
                type="tel"
                placeholder="Mobile Number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="editable-input"
              />
            </div>

            <div className="info-row">
              <p className="info-label">Occupation</p>
              <input
                type="text"
                placeholder="Occupation"
                value={occupation}
                onChange={(e) => setOccupation(e.target.value)}
                className="editable-input"
              />
            </div>

            <div className="info-row">
              <p className="info-label">Location</p>
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="editable-input"
              />
            </div>

            <div className="info-row bio-container">
              <p className="info-label">Bio</p>
              <textarea
                value={bio}
                placeholder="Tell us about Yourself"
                rows={4}
                onChange={(e) => setBio(e.target.value)}
                className="editable-textarea"
              />
            </div>

            <button onClick={handleSave} className="save-btn">
              Save Changes
            </button>
          </div>
        </div>

        {/* Your Listings Section */}
        <div className="profile-listings-section">
          <div className="listings-section-header">
            <h3>Your Listings</h3>
            <Link to="/your-listings" className="view-all-listings-btn">
              <FaEye /> View All
            </Link>
          </div>
          
          {listingsLoading ? (
            <div className="listings-loading">Loading your listings...</div>
          ) : userListings.length === 0 ? (
            <div className="no-listings">
              <FaHome className="no-listings-icon" />
              <p>You haven't posted any rentals yet.</p>
              <Link to="/post-rental" className="post-first-listing-btn">
                Post Your First Rental
              </Link>
            </div>
          ) : (
            <div className="profile-listings-grid">
              {userListings.slice(0, 3).map((listing) => (
                <div key={listing.id} className="profile-listing-card">
                  <div className="profile-listing-image">
                    <img src={listing.imageUrl} alt={listing.title} />
                    <div className="listing-status">
                      <span className={`status-badge ${listing.status}`}>
                        {listing.status}
                      </span>
                    </div>
                  </div>
                  <div className="profile-listing-content">
                    <h4>{listing.title}</h4>
                    <p className="listing-location">{listing.location}</p>
                    <p className="listing-price">₹{listing.price}</p>
                    <div className="listing-specs">
                      <span>{listing.bedrooms} Bed</span>
                      <span>{listing.bathrooms} Bath</span>
                      <span>{listing.size}</span>
                    </div>
                    <Link 
                      to={`/rental/details/${listing.id}`} 
                      className="view-listing-btn"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
              {userListings.length > 3 && (
                <div className="more-listings-card">
                  <div className="more-listings-content">
                    <FaHome className="more-listings-icon" />
                    <p>You have {userListings.length - 3} more listings</p>
                    <Link to="/your-listings" className="view-all-btn">
                      View All Listings
                    </Link>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Profile;
