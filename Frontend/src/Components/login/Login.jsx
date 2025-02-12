import React, { useState } from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './Login.css';

const Login = ({ setIsAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [toastShown, setToastShown] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login Data:", formData);

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_MAIN_SERVER_URL}/user/login`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Response:", response.data);

      if (response.data.success) {
        setIsAuthenticated(true);
        if (!toastShown) {
          toast.success(`Welcome back to Herbcure!`, {
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
        console.log("User logged successfully");
      } else {
        toast.error("Please check your credentials.", {
          position: "bottom-right",
          autoClose: 3000,
          hideProgressBar: true,
          theme: "dark",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (e) {
      console.log("Error while login through frontend:", e);
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
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" className="login-btn">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
