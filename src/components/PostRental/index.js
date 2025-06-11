import React, { useState } from "react";
import LoginModalContent from "../LoginModal/index.js";
import axios from "axios";
import {
  FaHome,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaImage,
  FaRupeeSign,
  FaBed,
  FaBath,
  FaRegUser,
  FaCheckCircle,
} from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import Navbar from "../Navbar";
import Footer from "../Footer";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./postrental.css";

const PostRental = () => {
  const navigate = useNavigate();
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const jwtToken = localStorage.getItem("token");
  const isLoggedin = jwtToken !== null;
  const [allAmenities] = useState([
    "Gym",
    "Wi-Fi",
    "Parking",
    "Pool",
    "Garden",
  ]);
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    bedrooms: "",
    bathrooms: "",
    size: "",
    imageUrl: "",
    availble_from: "",
    description: "",
    amenities: {},
    status: "available",
    contact_name: "",
    contact_email: "",
    contact_phone: "",
  });
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageUrl) {
      toast.error("Please upload an image.");
      return;
    }

    const updatedFormData = {
      ...formData,
      imageUrl: imageUrl,
    };

    try {
      const response = await axios.post(
        "https://stayspot.onrender.com/rentals",
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${jwtToken}`,
          },
        }
      );
      setShowSuccess(true);
      setFormData({
        title: "",
        location: "",
        price: "",
        bedrooms: "",
        bathrooms: "",
        size: "",
        description: "",
        availble_from: "",
        imageUrl: "",
        status: "available",
        contact_name: "",
        contact_email: "",
        contact_phone: "",
      });
      setImage(null);
    } catch (error) {
      toast.error("Failed to post rental property.");
    }
  };

  const handleViewListing = () => {
    navigate('/rentals');
  };

  const handlePostAnother = () => {
    setShowSuccess(false);
  };

  const [modalIsOpen, setIsOpen] = useState(!isLoggedin);

  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      padding: "20px",
      borderRadius: "8px",
      maxWidth: "500px",
      width: "90%",
      border: "none",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",

      backgroundColor: "transparent",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.75)",
    },
  };

  return (
    <div>
      <Navbar />
      <div className="post-rentals-section">
        <div className="post-rental-des">
          <h2 className="section-title">Post Your Rental Property</h2>
          <p className="section-subtitle">
            Help potential renters discover the perfect space! Fill in the
            details below.
          </p>

          <form className="rental-form" onSubmit={handleSubmit}>
            <div className="input-group">
              <div className="input-field">
                <FaHome className="input-icon" />
                <input
                  type="text"
                  placeholder="Property Title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <FaMapMarkerAlt className="input-icon" />
                <input
                  type="text"
                  placeholder="Location"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <FaRupeeSign className="input-icon" />
                <input
                  type="number"
                  placeholder="Price (₹)"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <TbRulerMeasure className="input-icon" />
                <input
                  type="text"
                  placeholder="Size (sq.ft)"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <FaBed className="input-icon" />
                <input
                  type="number"
                  placeholder="Bedrooms"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <FaBath className="input-icon" />
                <input
                  type="number"
                  placeholder="Bathrooms"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="input-group">
              <div className="input-field">
                <FaBed className="input-icon" />
                <input
                  type="date"
                  placeholder="Availbe from"
                  name="availble_from"
                  value={formData.availble_from}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <FaRegUser className="input-icon" />
                <input
                  type="text"
                  placeholder="Contact Name"
                  name="contact_name"
                  value={formData.contact_name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="input-field">
                <FaPhoneAlt className="input-icon" />
                <input
                  type="tel"
                  placeholder="Contact Number"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="input-group">
              <div className="input-field">
                <FaImage className="input-icon" />
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  required
                />
              </div>
              {image && (
                <div className="image-preview">
                  <img src={image} alt="Property" className="image-thumb" />
                </div>
              )}
            </div>

            <div className="input-group">
              <div className="input-field">
                <textarea
                  placeholder="Property Description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-submit">
              <button type="submit">Submit Listing</button>
            </div>
          </form>
        </div>
        {
          <Modal
            isOpen={modalIsOpen}
            style={customStyles}
            onRequestClose={closeModal}
            contentLabel="Login to Post"
            shouldCloseOnOverlayClick={false}
            shouldCloseOnEsc={false}
          >
            {/* <div className='modal-header'>
               <h2>Log in to add a post</h2>
               
           </div> */}
            <LoginModalContent onClose={closeModal} />
          </Modal>
        }
      </div>
      <Footer />

      {showSuccess && (
        <>
          <div className="success-overlay" />
          <div className="success-card">
            <div className="success-icon">
              <FaCheckCircle />
            </div>
            <h2 className="success-title">Success!</h2>
            <p className="success-message">
              Your rental property has been successfully posted. It will be visible to potential renters shortly.
            </p>
            <div className="success-actions">
              <button className="success-btn primary" onClick={handleViewListing}>
                View All Listings
              </button>
              <button className="success-btn secondary" onClick={handlePostAnother}>
                Post Another
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default PostRental;
