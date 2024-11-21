import React, { useState } from "react";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";
import "./index.css";
import { useNavigate } from "react-router-dom";

const LoginModalContent = ({ onClose }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = async () => {
    const data = {
      name: `${firstName} ${lastName}`,
      email,
      password,
    };
    try {
      const response = await axios.post("https://stayspot.onrender.com/register", data);
      if (response.status === 201) {
        localStorage.setItem("token", response.data.token);
        toast.success("Registration Successful");
        onClose(); // Close modal on success
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error || "An error occurred. Please try again."
      );
    }
  };

  const handleLogin = async () => {
    const credentials = { email, password };
    try {
      const response = await axios.post(
        "https://stayspot.onrender.com/login",
        credentials
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful");
        onClose(); // Close modal on success
      }
    } catch (error) {
      toast.error(
        error.response?.data?.error ||
          "Network error. Please check your connection."
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isSignup) {
      if (firstName && lastName && email && password.length > 7) {
        handleSignup();
      } else {
        toast.warning(
          "Please fill all fields and ensure password is at least 8 characters."
        );
      }
    } else {
      if (email && password) {
        setIsLoading(true);
        handleLogin().finally(() => setIsLoading(false));
      } else {
        toast.warning("Enter all fields.");
      }
    }
  };
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1);
  };

  return (
    <div className="stayspot-modal-content">
      <h3 className="login-header">Almost there Login to Post 🚀</h3>
      {/* <h3 className="stayspot-modal-header">StaySpot</h3> */}
      <h3>{isSignup ? "Sign Up" : "Login"}</h3>
      <div className="stayspot-input-select">
        <button
          onClick={() => setIsSignup(false)}
          className={!isSignup ? "selected" : ""}
        >
          Login
        </button>
        <button
          onClick={() => setIsSignup(true)}
          className={isSignup ? "selected" : ""}
        >
          Sign Up
        </button>
      </div>
      <form
        className="stayspot-form"
        onSubmit={handleSubmit}
        style={{ flexWrap: "wrap" }}
      >
        {isSignup && (
          <div style={{ display: isSignup ? "flex" : "", gap: "1px" }}>
            <input
              type="text"
              placeholder="First Name"
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              type="text"
              placeholder="Last Name"
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
        )}
        <input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="stayspot-submit-btn">
          {isLoading ? (
            <DotLoader color="#ffffff" size={10} />
          ) : isSignup ? (
            "Sign Up"
          ) : (
            "Login"
          )}
        </button>
      </form>
      <button onClick={goBack} className="stayspot-close-btn">
        Close
      </button>
    </div>
  );
};

export default LoginModalContent;
