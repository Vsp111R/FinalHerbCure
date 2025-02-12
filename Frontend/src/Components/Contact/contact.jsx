import React from "react";
import { Mail, Phone } from "lucide-react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-wrapper">
      <div className="contact-container">
        <h2 className="contact-title">For any assistance</h2>
        <div className="contact-grid">
          <div className="contact-card">
            <h3>Commercial Vehicles</h3>
            <p><Mail className="icon" /> <a href="mailto:cac@herbcure.com">cac@herbcure.com</a></p>
            <p><Phone className="icon" /> 1800 209 7979</p>
          </div>
          <div className="contact-card">
            <h3>Medicinal Plants</h3>
            <p><Mail className="icon" /> <a href="mailto:support@herbcure.com">support@herbcure.com</a></p>
            <p><Phone className="icon" /> 1800 209 8282</p>
          </div>
          <div className="contact-card">
            <h3>Herbal Solutions</h3>
            <p><Mail className="icon" /> <a href="mailto:info@herbcure.com">info@herbcure.com</a></p>
            <p><Phone className="icon" /> 1800 209 8282</p>
          </div>
          <div className="contact-card">
            <h3>Investor Relations</h3>
            <p><Mail className="icon" /> <a href="mailto:ir@herbcure.com">ir@herbcure.com</a></p>
            <p><Phone className="icon" /> +91-22-6665 8282</p>
          </div>
          <div className="contact-card">
            <h3>Company Secretary</h3>
            <p><Mail className="icon" /> <a href="mailto:cs@herbcure.com">cs@herbcure.com</a></p>
            <p><Phone className="icon" /> +91-22-6665 7824</p>
          </div>
          <div className="contact-card">
            <h3>Corporate Communications</h3>
            <p><Mail className="icon" /> <a href="mailto:corpcom@herbcure.com">corpcom@herbcure.com</a></p>
            <p><Phone className="icon" /> +91-22-6665 7613</p>
          </div>
        </div>
      </div>

      <div className="contact-footer">
        <div className="contact-address">
          <h3>Registered Office</h3>
          <p>HerbCure Ltd.<br/>123 Green Valley, Mumbai - 400001<br/>Phone: +91-22-6665 8282</p>
        </div>
        <div className="contact-address">
          <h3>International Business</h3>
          <p>HerbCure Global<br/>A Block, Green Estate, Mumbai - 400018<br/>Phone: +91-22-6757 7200</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;