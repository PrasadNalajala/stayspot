import React, { useState } from "react";
import { FaHome, FaPhoneAlt, FaMapMarkerAlt, FaImage ,FaRupeeSign,FaBed,FaBath,FaRegUser} from "react-icons/fa"; // Icons
import { TbRulerMeasure } from "react-icons/tb";
import Navbar from "../Navbar"; // Your existing Navbar component
import "./index.css"; // Assuming your styles are here

const PostRental = () => {
  const [image, setImage] = useState(null); // State to hold image file

  // Handle file change (Image Upload)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Preview the image
    }
  };

  return (
    <div>
      <Navbar /> {/* Your Navbar */}

      {/* Welcome Section with Animation */}
      <div className="post-rentals-section">
        <div className="post-rental-des">
          <h2 className="section-title">Post Your Rental Property</h2>
          <p className="section-subtitle">
            Help potential renters discover the perfect space! Fill in the details below.
          </p>

          {/* Input Form */}
          <form className="rental-form">
            {/* Property Title & Location (Two in a row) */}
            <div className="input-group">
              <div className="input-field">
                <FaHome className="input-icon" />
                <input type="text" placeholder="Property Title" />
              </div>
              <div className="input-field">
                <FaMapMarkerAlt className="input-icon" />
                <input type="text" placeholder="Location" />
              </div>
            </div>

            {/* Price & Size (Two in a row) */}
            <div className="input-group">
              <div className="input-field">
              <FaRupeeSign className="input-icon" />
                <input type="number" placeholder="Price (₹)" />
              </div>
              <div className="input-field">
              <TbRulerMeasure className="input-icon" />
                <input type="text" placeholder="Size (sq.ft)" />
              </div>
            </div>

            {/* Bedrooms & Bathrooms (Two in a row) */}
            <div className="input-group">
              <div className="input-field">
              <FaBed className="input-icon" />
                <input type="number" placeholder="Bedrooms" />
              </div>
              <div className="input-field">
              <FaBath className="input-icon" />
                <input type="number" placeholder="Bathrooms" />
              </div>
            </div>

            {/* Contact Info */}
            <div className="input-group">
              <div className="input-field">
              <FaRegUser className="input-icon" />
                <input type="text" placeholder="Contact Name" />
              </div>
              <div className="input-field">
                <FaPhoneAlt className="input-icon" />
                <input type="tel" placeholder="Contact Number" />
              </div>
            </div>

            {/* Image Upload */}
            <div className="input-group">
              <div className="input-field">
                <FaImage className="input-icon" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  placeholder="Upload Property Image"
                />
              </div>
              {image && (
                <div className="image-preview">
                  <img src={image} alt="Property" className="image-thumb" />
                </div>
              )}
            </div>

            {/* Description */}
            <div className="input-group">
              <div className="input-field">
                <textarea placeholder="Property Description"></textarea>
              </div>
            </div>

            {/* Submit Button */}
            <div className="form-submit">
              <button type="submit">Submit Listing</button>
            </div>
          </form>
        </div>

        {/* Animated Content for a Modern Touch */}

      </div>
    </div>
  );
};

export default PostRental;
