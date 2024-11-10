import React, { useState } from "react";
import axios from "axios";
import { FaHome, FaPhoneAlt, FaMapMarkerAlt, FaImage, FaRupeeSign, FaBed, FaBath, FaRegUser } from "react-icons/fa"; 
import { TbRulerMeasure } from "react-icons/tb";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { toast } from "react-toastify";
import "./postrental.css";

const PostRental = () => {
  const [image, setImage] = useState(null);
  const [contactName, setContactName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    price: '',
    bedrooms: '',
    bathrooms: '',
    size: '',
    imageUrl: '',
    description: '',
    amenities: { Gym: false, WiFi: false, Parking: false },
    status: 'available',
    contact_name: contactName,
    contact_mail: '',
    contact_phone: phoneNumber,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setFormData((prev) => ({
        ...prev,
        imageUrl: file
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedFormData = {
      ...formData,
      contact_name: contactName,
      contact_phone: phoneNumber,
      contact_mail: email,
    };
    const data = new FormData();
    Object.keys(updatedFormData).forEach(key => {
      if (key === "amenities") {
        data.append(key, JSON.stringify(updatedFormData[key])); // For amenities, store JSON string
      } else {
        data.append(key, updatedFormData[key]);
      }
    });
    data.append("image", updatedFormData.imageUrl);
    try {
      const response = await axios.post("http://localhost:3000/rentals", updatedFormData);
      toast.success("Rental property posted successfully!");
    } catch (error) {
      toast.error("Failed to post rental property.");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="post-rentals-section">
        <div className="post-rental-des">
          <h2 className="section-title">Post Your Rental Property</h2>
          <p className="section-subtitle">
            Help potential renters discover the perfect space! Fill in the details below.
          </p>

          <form className="rental-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-field">
                <FaHome className="input-icon" />
                <input type="text" placeholder="Property Title" name="title" value={formData.title} onChange={handleChange} required />
              </div>
              <div className="input-field">
                <FaMapMarkerAlt className="input-icon" />
                <input type="text" placeholder="Location" name="location" value={formData.location} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <FaRupeeSign className="input-icon" />
                <input type="number" placeholder="Price (₹)" name="price" value={formData.price} onChange={handleChange} required />
              </div>
              <div className="input-field">
                <TbRulerMeasure className="input-icon" />
                <input type="text" placeholder="Size (sq.ft)" name="size" value={formData.size} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <FaBed className="input-icon" />
                <input type="number" placeholder="Bedrooms" name="bedrooms" value={formData.bedrooms} onChange={handleChange} required />
              </div>
              <div className="input-field">
                <FaBath className="input-icon" />
                <input type="number" placeholder="Bathrooms" name="bathrooms" value={formData.bathrooms} onChange={handleChange} required />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <FaRegUser className="input-icon" />
                <input type="text" placeholder="Contact Name" name="contactName" value={contactName} onChange={(e) => setContactName(e.target.value)} required />
              </div>
              <div className="input-field">
                <FaPhoneAlt className="input-icon" />
                <input type="tel" placeholder="Contact Number" name="contactPhone" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <FaImage className="input-icon" />
                <input type="file" accept="image/*" onChange={handleImageUpload} required />
              </div>
              {image && (
                <div className="image-preview">
                  <img src={image} alt="Property" className="image-thumb" />
                </div>
              )}
            </div>

            <div className="input-group">
              <div className="input-field">
                <textarea placeholder="Property Description" name="description" value={formData.description} onChange={handleChange} required></textarea>
              </div>
            </div>

            <div className="form-submit">
              <button type="submit">Submit Listing</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PostRental;
