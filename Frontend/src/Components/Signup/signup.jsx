import React, { useState,useEffect} from 'react';
import './Signup.css'; 
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

const Signup = ({setIsAuthenticated}) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username:'',
    email: '',
    password: '',
  });
  const [toastShown, setToastShown] = useState(false);


  useEffect(() => {
    // Check if a JWT token exists in cookies
    const token = Cookies.get("token");

    if (token) {
      // If token exists, redirect the user to home or dashboard
      navigate("/");  // Or redirect to another page like /dashboard
    }
  }, [navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData); 
    
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/user/register`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );
      console.log("Response:", response.data);

      if (response.data.success) {
        setIsAuthenticated(true);
        if (!toastShown) {
          toast.success(`${formData.username} welcome to !HerbCure`, {
            position: "bottom-right",
            autoClose: 2000,
            hideProgressBar: true,
            theme: "dark",
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setToastShown(true);
        }
        setTimeout(() => {
          navigate("/");
          toast.dismiss();
        }, 2000);
        console.log("User registered successfully");
      } else {
        toast.error(`User with same email already exists`, {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "dark",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
        console.log("Registration failed: " + response.data.message);
      }
    } catch (e) {
      console.log("Error while registrating through frontend:", e);
      toast.error("An error occurred. Please try again later.", {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: true,
        theme: "dark",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          className="input-field"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          className="input-field"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          className="input-field"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit" className="signup-btn">Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Signup;
