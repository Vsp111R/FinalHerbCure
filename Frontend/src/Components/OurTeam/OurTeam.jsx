import React from "react";
import "./OurTeam.css";

const teamMembers = [
  {
    name: "Vrajkumar Parekh",
    role: "Team Leader & Devloper",
    img: "/images/vraj.jpg", // Update with actual paths
  },
  {
    name: "Yug Trivedi",
    role: "Devloper",
    img: "/images/yug.jpg",
  },
  {
    name: "Vraj Ashokbhai Parekh",
    role: "Devloper",
    img: "/images/vraj-ashok.jpg",
  },
  {
    name: "Yug Satishbhai Patel",
    role: "3d Artist And Devloper",
    img: "/images/yug-patel.jpg",
  },
];

const OurTeam = () => {
  return (
    <div className="team-wrapper">
      {/* Hero Section */}
      <div className="team-hero">
        <h1>Our Team</h1>
        <p>Meet the passionate individuals driving HerbCure forward.</p>
      </div>

      {/* Team Section */}
      <div className="team-container">
        {teamMembers.map((member, index) => (
          <div key={index} className="team-card">
            <img src={member.img} alt={member.name} />
            <h3>{member.name}</h3>
            <p>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurTeam;
