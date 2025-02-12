import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to HerbCure</h1>
          <p>Your trusted partner for authentic medicines and herbal solutions.</p>
          <button className="explore-btn">Learn More</button>
        </div>
      </section>

      {/* AI Integration Section */}
      <section className="ai-integration section">
        <div className="content">
          <h2>AI-Powered Medicine Authentication</h2>
          <p>Verify medicine authenticity with our cutting-edge AI technology.</p>
          <button onClick={() => navigate("/ai")}>Learn More</button>
        </div>
        <img src="/ai-verification1.png" alt="AI Verification" className="section-img" />
      </section>

      {/* Herbal Garden Section */}
      <section className="herbal-garden section">
        <img src="/assets/virtual-garden.jpg" alt="Virtual Herbal Garden" className="section-img" />
        <div className="content">
          <h2>Explore Our Virtual Herbal Garden</h2>
          <p>Learn about medicinal plants and their health benefits.</p>
          <button className="explore-btn">Explore Now</button>
        </div>
      </section>

      {/* Our Key Features Swiper */}
      <section className="features-section section">
        <h2>Our Key Features</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            768: { slidesPerView: 2 }, // 2 slides on tablets
            1024: { slidesPerView: 3 }, // 3 slides on desktops
          }}
          className="features-swiper"
        >
          {[
            { img: "/authentication.jpg", title: "Medicine Authentication", desc: "Verify the authenticity of your medicines instantly." },
            { img: "/scanning.jpg", title: "Real-Time Scanning", desc: "Scan barcodes and QR codes to check product authenticity." },
            { img: "/alternatives.jpg", title: "Alternative Solutions", desc: "Find trusted herbal alternatives for your health." }
          ].map((feature, index) => (
            <SwiperSlide key={index}>
              <div className="feature-card">
                <img src={feature.img} alt={feature.title} />
                <h3>{feature.title}</h3>
                <p>{feature.desc}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>

      {/* How HerbCure Works Swiper */}
      <section className="how-it-works section">
        <h2>How HerbCure Works</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation={true}
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          slidesPerView={1}
          className="steps-swiper"
        >
          {[
            { video: "/step1.mp4", title: "Step 1", desc: "Enter medicine details or scan the barcode." },
            { video: "/step2.mp4", title: "Step 2", desc: "Our AI checks against a verified database." },
            { img: "/step3.jpg", title: "Step 3", desc: "Receive instant authentication results." }
          ].map((step, index) => (
            <SwiperSlide key={index}>
              <div className="step-card">
                {step.video ? (
                  <video src={step.video} autoPlay loop muted playsInline className="step-media"></video>
                ) : (
                  <img src={step.img} alt={step.title} className="step-media" />
                )}
                <div className="overlay">
                  <h3>{step.title}</h3>
                  <p>{step.desc}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </section>
    </div>
  );
};

export default Home;
