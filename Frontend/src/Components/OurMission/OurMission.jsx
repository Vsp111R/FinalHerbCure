import React from "react";
import "./OurMission.css";

const OurMission = () => {
  return (
    <div className="mission-container">
      {/* Hero Section */}
      <section className="mission-hero">
        <h1>Our Mission</h1>
        <p>Ensuring authenticity, fair pricing, and a healthier life for everyone.</p>
      </section>

      {/* Section 1: Authenticity */}
      <section className="mission-section">
        <div className="mission-text">
          <h2>🌱 100% Authentic Products</h2>
          <p>
            In an era of counterfeit herbal products, HerbCure guarantees that every plant and supplement is
            sourced **directly from trusted farms**. We implement **rigorous quality checks** to ensure 
            what you receive is **pure and effective**.
          </p>
        </div>
        <div className="mission-image">
          <img src="/images/authenticity.jpg" alt="Authenticity at HerbCure" />
        </div>
      </section>

      {/* Section 2: Fair Pricing */}
      <section className="mission-section reverse">
        <div className="mission-image">
          <img src="/images/pricing.jpg" alt="Fair Pricing" />
        </div>
        <div className="mission-text">
          <h2>💰 Fair & Transparent Pricing</h2>
          <p>
            No overcharging, no hidden costs—just **fair prices** for premium herbal solutions.  
            We work closely with **farmers and suppliers** to cut out middlemen and provide the 
            best rates possible.
          </p>
        </div>
      </section>

      {/* Section 3: Health & Safety */}
      <section className="mission-section">
        <div className="mission-text">
          <h2>🛡️ Protecting Your Health</h2>
          <p>
            We prioritize **safety, efficacy, and sustainability**.  
            HerbCure’s herbal solutions combine **traditional wisdom with modern research**,  
            ensuring that every product meets **the highest standards**.
          </p>
        </div>
        <div className="mission-image">
          <img src="/images/safety.jpg" alt="Health & Safety" />
        </div>
      </section>

      {/* Call to Action */}
      <section className="mission-cta">
        <h2>Join the Herbal Revolution</h2>
        <p>Experience pure, authentic, and fairly priced herbal solutions. Choose HerbCure.</p>
      </section>
    </div>
  );
};

export default OurMission;
