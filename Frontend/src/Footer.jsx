import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiMail } from "react-icons/fi"; // Import mail icon
import "./Footer.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with ${email}`);
      setEmail(""); // Clear input after subscribing
    }
  };

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>HERBCURE</h4>
          <ul>
            <li><Link to="/ai">AI Integration</Link></li>
            <li><Link to="/verify">Verify Medicine</Link></li>
            <li><Link to="/herbal-garden">Virtual Herbal Garden</Link></li>
            <li><Link to="/research">Research & Testing</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>ORGANIZATION</h4>
          <ul>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/history">Our History</Link></li>
            <li><Link to="/leadership">Our Leadership</Link></li>
            <li><Link to="/global-presence">Global Presence</Link></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>CONTACT & SOCIAL</h4>
          <ul className="social-icons">
            <li><a href="https://facebook.com">Facebook</a></li>
            <li><a href="https://linkedin.com">LinkedIn</a></li>
            <li><a href="https://youtube.com">YouTube</a></li>
          </ul>
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="subscribe-container">
        <h4>SUBSCRIBE</h4>
        <form onSubmit={handleSubscribe} className="subscribe-box">
          <div className="input-wrapper">
            <FiMail className="mail-icon" />
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Subscribe</button>
        </form>
      </div>

      <div className="footer-bottom">
        <p>© 2025 HerbCure. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
