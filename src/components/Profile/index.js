import React, { useEffect, useState } from "react";
import { formatDistanceToNow } from "date-fns";
import Navbar from "../Navbar";
import axios from "axios";
import { toast } from "react-toastify";
import { FiEdit2 } from "react-icons/fi";
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
      </div>
    </>
  );
};

export default Profile;
