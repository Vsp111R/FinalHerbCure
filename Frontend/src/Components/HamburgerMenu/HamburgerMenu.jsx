import React from "react";
import { FiMenu, FiX } from "react-icons/fi"; // Importing menu icons
import "./HamburgerMenu.css"; 

const HamburgerMenu = ({ menuOpen, setMenuOpen }) => {
  return (
    <div className="hamburger-menu" onClick={() => setMenuOpen(!menuOpen)}>
      {menuOpen ? <FiX size={28} /> : <FiMenu size={28} />}
    </div>
  );
};

export default HamburgerMenu;
