import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import HomePage from "./Components/Home/home";
import AboutPage from "./Components/About/about";
import SignupPage from "./Components/Signup/signup";
import ContactPage from "./Components/Contact/contact";
import PrivacyPolicy from "./Components/privacy-policy/PrivacyPolicy";
import TermsAndConditions from "./Components/TermsAndConditions/TermsAndConditions";
import AboutUs from "./Components/AboutUs/AboutUs";
import Login from "./Components/login/Login";
import Account from "./Components/Account/Account";
import AI from "./Components/AI/ai";
import Home from "./Components/Home/home";
import OurMission from "./Components/OurMission/OurMission";
import OurTeam from "./Components/OurTeam/OurTeam";
import PlantGallery from "./Components/PlantGallery/plant"
import CheckMedicine from "./Components/CheckMedicine/check"
import Doctor from "./Components/Doctor/doctor"

const AppRoutes = ({setIsAuthenticated}) => {
  const [loading, setLoading] = useState(false);

  return (
    <div>
      {loading ? (
        <div className="loader-wrapper">
          <ClipLoader
            color={"#216d5e"}
            loading={loading}
            size={90}
            className="loader"
          />
        </div>
      ) : (
        <>
          <Routes>
            {/* Home Page */}
            <Route path="/" element={<HomePage />} />
            <Route path="/Home" element={<HomePage />} />

            {/* Shop - Redirects to Home */}
            <Route path="/Shop" element={<HomePage />} />

            {/* Other Routes */}
            <Route path="/about" element={<AboutPage />} />
            <Route path="/signup" element={<SignupPage setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/contactus" element={<ContactPage />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route
              path="/TermsAndConditions"
              element={<TermsAndConditions />}
            />
            <Route path="/AboutUs" element={<AboutUs />} />
            <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
            <Route path="/account" element={<Account />} />
            <Route path="/" element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="/ai" element={<AI />} />
            <Route path="/team" element={<OurTeam />} />
            <Route path="/mission" element={<OurMission />} />
            {/* <Route path="/plant/gallery" element={<PlantGallery />} /> */}
            <Route path="/check-medicine" element={<CheckMedicine />} />
            <Route path="/ai/doctor" element={<Doctor />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default AppRoutes;
