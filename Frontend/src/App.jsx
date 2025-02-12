import React, { useEffect, useState } from "react";
import "./App.css";
import ClipLoader from "react-spinners/ClipLoader";
import Navbar from "./Navbar";
import Footer from "./Footer.jsx"; // ✅ Footer is added here
import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes.jsx";

function App() {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setLoading(true);
    const verifyAuth = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_MAIN_SERVER_URL}/user/verify`,
          { withCredentials: true }
        );
        console.log("RESPONSE", response.data.success);
        if (response.data.success) {
          console.log("User is authenticated");
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error during verification:", error);
        setIsAuthenticated(false);
      }
    };

    verifyAuth();
  }, []);

  return (
    <>
      {loading ? (
        <div className="loader-wrapper">
          <ClipLoader color={"#216d5e"} loading={loading} size={90} />
        </div>
      ) : (
        <BrowserRouter>
          <div className="main-container">
            <Navbar
              isAuthenticated={isAuthenticated}
              setIsAuthenticated={setIsAuthenticated}
            />
            <div className="content">
              <AppRoutes setIsAuthenticated={setIsAuthenticated} />
            </div>
            <Footer /> {/* ✅ Footer is added ONLY ONCE here */}
          </div>
        </BrowserRouter>
      )}
    </>
  );
}

export default App;
