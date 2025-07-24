import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import { DotLoader } from "react-spinners";

const Signup = ({ setisSignUpSelected }) => {
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const fetchSignUp = async () => {
    try {
      const res = await axios.post("https://stayspot.onrender.com/register", {
        name: firstName + " " + lastName,
        email,
        password,
      });
      if (res.status === 201) {
        localStorage.setItem("token", res.data.token);
        toast.success("Registration successful");
        navigate("/");
      }
    } catch (err) {
      toast.error(err?.response?.data?.error || "Signup failed");
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (firstName && lastName && email && password.length >= 8) {
      fetchSignUp();
    } else {
      toast.warning("All fields required. Password must be at least 8 characters.");
    }
  };

  return (
    <div className="text-white">
      <h3 className="text-lg font-semibold mb-4">Sign Up</h3>
      <button className="w-full flex items-center justify-center gap-2 border border-gray-700 rounded-lg py-2 mb-3 bg-[#1f1f1f] hover:bg-[#2a2a2a]">
        <FaFacebook className="text-blue-600" /> Sign up with Facebook
      </button>
      <button className="w-full flex items-center justify-center gap-2 border border-gray-700 rounded-lg py-2 mb-4 bg-[#1f1f1f] hover:bg-[#2a2a2a]">
        <FaGoogle className="text-red-500" /> Sign up with Google
      </button>
      <div className="flex items-center my-4 text-gray-400">
        <div className="flex-grow h-px bg-gray-600" />
        <span className="px-3">OR</span>
        <div className="flex-grow h-px bg-gray-600" />
      </div>
      <form onSubmit={onSubmit}>
        <div className="flex gap-2 mb-3">
          <input
            type="text"
            placeholder="First Name"
            className="w-1/2 p-2 bg-[#1f1f1f] border border-gray-700 text-white rounded-md"
            value={firstName}
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            type="text"
            placeholder="Last Name"
            className="w-1/2 p-2 bg-[#1f1f1f] border border-gray-700 text-white rounded-md"
            value={lastName}
            onChange={(e) => setLastname(e.target.value)}
          />
        </div>
        <input
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-3 bg-[#1f1f1f] border border-gray-700 text-white rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 bg-[#1f1f1f] border border-gray-700 text-white rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-[#20c755] text-black font-semibold py-2 rounded-md hover:bg-green-500"
        >
          Sign Up
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-400">
        Already have an account?{" "}
        <span
          className="text-[#20c755] cursor-pointer"
          onClick={() => setisSignUpSelected(false)}
        >
          Login
        </span>
      </p>
    </div>
  );
};

const LoginFields = ({ setisSignUpSelected }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const emailInputRef = useRef(null);

  useEffect(() => {
    emailInputRef.current?.focus();
  }, []);

  const fetchLogin = async () => {
    try {
      const res = await axios.post("https://stayspot.onrender.com/login", {
        email,
        password,
      });
      const { token } = res.data;
      localStorage.setItem("token", token);

      const profileRes = await axios.get("https://stayspot.onrender.com/api/user", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const userId = profileRes.data?.id || profileRes.data?.[0]?.id;
      if (userId) localStorage.setItem("userId", userId);

      toast.success("Login Successful");
      navigate("/");
    } catch (error) {
      toast.error(error?.response?.data?.error || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      setIsLoading(true);
      fetchLogin();
    } else {
      toast.warning("Enter all fields");
    }
  };

  return (
    <div className="text-white">
      <h3 className="text-lg font-semibold mb-4">Login</h3>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          placeholder="Email"
          ref={emailInputRef}
          className="w-full p-2 mb-3 bg-[#1f1f1f] border border-gray-700 text-white rounded-md"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-3 bg-[#1f1f1f] border border-gray-700 text-white rounded-md"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-[#20c755] text-black font-semibold py-2 rounded-md hover:bg-green-500"
        >
          {isLoading ? <DotLoader size={20} color="#000" /> : "Login"}
        </button>
      </form>
      <p className="mt-4 text-sm text-gray-400">
        New here?{" "}
        <span
          className="text-[#20c755] cursor-pointer"
          onClick={() => setisSignUpSelected(true)}
        >
          Sign up
        </span>
      </p>
    </div>
  );
};

const Login = () => {
  const [isSignupSelected, setisSignUpSelected] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) navigate("/");
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#161515] px-4">
      <div className="bg-[#1c1b1b] rounded-xl shadow-2xl w-full max-w-md p-6">
        <h1 className="text-3xl font-bold text-[#20c755] text-center mb-6">StaySpot</h1>
        <div className="flex mb-6">
          <button
            onClick={() => setisSignUpSelected(true)}
            className={`w-1/2 py-2 rounded-l-md font-semibold ${
              isSignupSelected ? "bg-[#20c755] text-black" : "bg-[#2b2b2b] text-white"
            }`}
          >
            Sign Up
          </button>
          <button
            onClick={() => setisSignUpSelected(false)}
            className={`w-1/2 py-2 rounded-r-md font-semibold ${
              !isSignupSelected ? "bg-[#20c755] text-black" : "bg-[#2b2b2b] text-white"
            }`}
          >
            Login
          </button>
        </div>
        {isSignupSelected ? (
          <Signup setisSignUpSelected={setisSignUpSelected} />
        ) : (
          <LoginFields setisSignUpSelected={setisSignUpSelected} />
        )}
      </div>
    </div>
  );
};

export default Login;
