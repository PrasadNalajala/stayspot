import React, { useEffect, useState } from "react";
import Navbar from "../Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi"; // Import edit icon
import "./index.css"; // Import the CSS file

const Profile = () => {
  const [image, setImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [email, setEmail] = useState("john.doe@example.com");
  const [Occupation,setOccupation]=useState("Software engineer");
  const [phone, setPhone] = useState("123-456-7890");
  const [bio, setBio] = useState("Hi! I'm John, a passionate traveler and real estate enthusiast.");
  const [location, setLocation] = useState("New York, USA");
  const [name, setName] = useState("John Doe");

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Local preview of the image
      uploadImageToCloud(file); // Upload to cloud storage
    }
  };

  const uploadImageToCloud = (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "YOUR_UPLOAD_PRESET"); // Replace with your actual upload preset

    axios
      .post(`https://api.cloudinary.com/v1_1/YOUR_CLOUD_NAME/image/upload`, formData)
      .then((response) => {
        setImageUrl(response.data.secure_url);
        toast.success("Image uploaded successfully");
      })
      .catch((error) => {
        toast.error("Failed to upload image");
      });
  };

  const handleSave = () => {
    // You can add logic to save these changes to your backend here
    toast.success("Profile updated successfully!");
  };

  useEffect(() => {
    console.log("Profile Component Loaded");
  }, []);

  // If no image, display first letter of the name
  const renderProfileImage = () => {
    if (!imageUrl && !image) {
      return (
        <div className="profile-image-placeholder">
          {name[0].toUpperCase()}
        </div>
      );
    }
    return <img src={imageUrl || image} alt="Profile" className="profile-image" />;
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
          <p className="info-label">Joined On: May 10, 2023</p>
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
                value={Occupation}
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
      </div>
    </>
  );
};

export default Profile;
