import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HamburgerMenu from "./Components/HamburgerMenu/HamburgerMenu"; // Import new component
import "./Navbar.css";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [hoverMenu, setHoverMenu] = useState(null);
  const navigate = useNavigate();

  const handleAccountClick = () => {
    navigate("/account");
  };

  return (
    <>
      {/* Top Strip */}
      <div className="top-strip">
        <p1>100% Trusted | Data Secured | Trusted by millions</p1>
      </div>

      {/* Navbar */}
      <nav className="navbar">
        <div className="navbar-left">
          <Link to="/" className="logo">
            <img src="/assets/logo.png" alt="HerbCure" className="navbar-logo" />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className={`nav-links-div ${menuOpen ? "show-menu" : ""}`}>
          <div 
            className="nav-item" 
            onMouseEnter={() => setHoverMenu("about")} 
            onMouseLeave={() => setHoverMenu(null)}
          >
            <Link to="/about" className="nav-links">About</Link>
            {hoverMenu === "about" && (
              <div className="dropdown-menu">
                <Link to="/mission">Our Mission</Link>
                <Link to="/Components/OurTeam/OurTeam.jsx">Our Team</Link>
              </div>
            )}
          </div>

          <div 
            className="nav-item" 
            onMouseEnter={() => setHoverMenu("services")} 
            onMouseLeave={() => setHoverMenu(null)}
          >
            <Link to="/services" className="nav-links">Services</Link>
            {hoverMenu === "services" && (
              <div className="dropdown-menu">
                <Link to="/check-medicine">Verify Medicine</Link>
                <Link to="/ai">Your Chemist AI</Link>
              </div>
            )}
          </div>

          <div 
            className="nav-item" 
            onMouseEnter={() => setHoverMenu("resources")} 
            onMouseLeave={() => setHoverMenu(null)}
          >
            <Link to="/resources" className="nav-links">Resources</Link>
            {hoverMenu === "resources" && (
              <div className="dropdown-menu">
                <Link to="/herbal-garden">Virtual Herbal Garden</Link>
                <Link to="/plant/gallery">Research & Testing</Link>
                <Link to="/ai/doctor">AI Doctor</Link>
              </div>
            )}
          </div>

          <Link to="/contactus" className="nav-links">Contact Us</Link>
        </div>

        {/* Hamburger Menu Component */}
        <HamburgerMenu menuOpen={menuOpen} setMenuOpen={setMenuOpen} />

        {/* Account Icon */}
        <div className="navbar-right">
          <span className="account-icon" onClick={handleAccountClick}>👤</span>
        </div>
      </nav>
    </>
  );
};

export default Navbar;