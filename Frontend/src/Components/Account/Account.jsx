import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Account.css";

const Account = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Simulating login (In real app, fetch user details from backend)
  const handleLogin = () => {
    setUserDetails({
      name: "Vrajkumar Parekh",
      email: "vraj@example.com",
      phone: "+91 9876543210",
    });
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserDetails({
      name: "",
      email: "",
      phone: "",
    });
  };

  return (
    <div className="account-container">
      {isLoggedIn ? (
        <>
          <div className="account-header">
            <h2>My Account</h2>
            <p>Manage your account details</p>
          </div>

          <div className="account-info">
            <div className="info-item">
              <label>Name:</label>
              <input
                type="text"
                value={userDetails.name}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, name: e.target.value })
                }
              />
            </div>
            <div className="info-item">
              <label>Email:</label>
              <input
                type="email"
                value={userDetails.email}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, email: e.target.value })
                }
              />
            </div>
            <div className="info-item">
              <label>Phone:</label>
              <input
                type="tel"
                value={userDetails.phone}
                onChange={(e) =>
                  setUserDetails({ ...userDetails, phone: e.target.value })
                }
              />
            </div>
          </div>

          <button className="update-btn">Update Profile</button>
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </>
      ) : (
        <div className="guest-user">
          <h2>Welcome, Guest!</h2>
          <p>Please log in or sign up to access your account.</p>
          <div className="auth-buttons">
          <Link to="/Login">

              <button className="login-btn">Login</button>
            </Link>
            <Link to="/signup">
              <button className="signup-btn">Sign Up</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Account;
