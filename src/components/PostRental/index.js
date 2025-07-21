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
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { TbRulerMeasure } from "react-icons/tb";
import Navbar from "../Navbar";
import { toast } from "react-toastify";
import Modal from "react-modal";
import { useNavigate } from "react-router-dom";
import "./postrental.css";

const PostRental = () => {
  const navigate = useNavigate();
  const [images, setImages] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [uploading, setUploading] = useState(false);
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
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => 
      file.type.startsWith('image/') && file.size <= 5 * 1024 * 1024 // 5MB limit
    );

    if (validFiles.length === 0) {
      toast.error("Please select valid image files (max 5MB each)");
      return;
    }

    if (images.length + validFiles.length > 10) {
      toast.error("Maximum 10 images allowed");
      return;
    }

    setUploading(true);
    
    // Create preview URLs
    const newImages = validFiles.map(file => ({
      file,
      preview: URL.createObjectURL(file),
      uploading: true
    }));
    
    setImages(prev => [...prev, ...newImages]);

    // Upload each image
    validFiles.forEach((file, index) => {
      uploadImageToCloud(file, newImages[index]);
    });
  };

  const uploadImageToCloud = (file, imageObj) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "imageUrl");

    axios
      .post(`https://api.cloudinary.com/v1_1/dnd03w7us/image/upload`, formData)
      .then((response) => {
        setImageUrls(prev => [...prev, response.data.secure_url]);
        setImages(prev => 
          prev.map(img => 
            img.file === file 
              ? { ...img, uploading: false, url: response.data.secure_url }
              : img
          )
        );
        setUploading(false);
      })
      .catch((error) => {
        toast.error(`Failed to upload ${file.name}`);
        setImages(prev => prev.filter(img => img.file !== file));
        setUploading(false);
      });
  };

  const removeImage = (index) => {
    setImages(prev => prev.filter((_, i) => i !== index));
    setImageUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (imageUrls.length === 0) {
      toast.error("Please upload at least one image.");
      return;
    }

    if (uploading) {
      toast.error("Please wait for all images to finish uploading.");
      return;
    }

    const updatedFormData = {
      ...formData,
      imageUrl: imageUrls[0], // Primary image
      imageUrls: imageUrls, // All images array
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
      setImages([]);
      setImageUrls([]);
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
              <div className="image-upload-section">
                <div className="image-upload-header">
                  <FaImage className="input-icon" />
                  <span>Property Images (Max 10 images, 5MB each)</span>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  disabled={uploading || images.length >= 10}
                  className="image-input"
                />
                <div className="image-preview-grid">
                  {images.map((image, index) => (
                    <div key={index} className="image-preview-item">
                      <img src={image.preview} alt={`Property ${index + 1}`} />
                      {image.uploading && (
                        <div className="upload-overlay">
                          <div className="upload-spinner"></div>
                          <span>Uploading...</span>
                        </div>
                      )}
                      <button
                        type="button"
                        className="remove-image-btn"
                        onClick={() => removeImage(index)}
                        disabled={image.uploading}
                      >
                        <FaTimes />
                      </button>
                      {index === 0 && (
                        <div className="primary-badge">Primary</div>
                      )}
                    </div>
                  ))}
                  {images.length < 10 && (
                    <div className="add-image-placeholder">
                      <FaPlus />
                      <span>Add More</span>
                    </div>
                  )}
                </div>
                {uploading && (
                  <div className="upload-progress">
                    <div className="upload-spinner"></div>
                    <span>Uploading images...</span>
                  </div>
                )}
              </div>
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
