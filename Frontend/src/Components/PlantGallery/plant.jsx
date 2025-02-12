import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { styled } from '@mui/material/styles';
import { Link } from "react-router-dom";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Canvas } from "@react-three/fiber";
import Tooltip from "@mui/material/Tooltip";
import { OrbitControls, Environment, useGLTF } from "@react-three/drei";
import "./plant.css";

const plants = [
  {
    name: "Aloe Vera",
    image: "/aloevera.glb",
    scientificName: "Aloe barbadensis miller",
    medicinalUses: [
      "Treats burns and wounds",
      "Improves skin health",
      "Aids digestion",
    ],
    benefits:
      "Aloe vera gel has anti-inflammatory and antibacterial properties.",
  },
  {
    name: "Snake Plant",
    image: "/snakeplant.glb",
    scientificName: "Sansevieria trifasciata",
    medicinalUses: ["Air purifier", "Improves sleep quality"],
    benefits: "It helps remove toxins from the air and is easy to maintain.",
  },
  {
    name: "Dandelion",
    image: "/Dandelion.glb",
    scientificName: "Taraxacum officinale",
    medicinalUses: ["Detoxifies liver", "Improves digestion"],
    benefits: "Rich in antioxidants and supports immune function.",
  },
  {
    name: "Giloy",
    image: "/Giloy.glb",
    scientificName: "Tinospora cordifolia",
    medicinalUses: ["Boosts immunity", "Helps with fever"],
    benefits: "Known for its anti-inflammatory and antipyretic properties.",
  },
  {
    name: "Oregano",
    image: "/Oregano.glb",
    scientificName: "Origanum vulgare",
    medicinalUses: ["Supports digestion", "Has antibacterial properties"],
    benefits: "Rich in antioxidants and helps boost immunity.",
  },
  {
    name: "Thyme",
    image: "/Thyme.glb",
    scientificName: "Thymus vulgaris",
    medicinalUses: ["Relieves cough", "Supports respiratory health"],
    benefits: "Has antimicrobial properties and boosts digestion.",
  },
  {
    name: "Wheat Grass",
    image: "/wheatgrass.glb",
    scientificName: "Triticum aestivum",
    medicinalUses: ["Boosts metabolism", "Detoxifies body"],
    benefits: "Rich in vitamins, minerals, and antioxidants.",
  },
  {
    name: "Mint",
    image: "/mint.glb",
    scientificName: "Triticum aestivum",
    medicinalUses: ["Boosts metabolism", "Detoxifies body"],
    benefits: "Rich in vitamins, minerals, and antioxidants.",
  },
  {
    name: "Lemon Grass",
    image: "/lemongrass.glb",
    scientificName: "Triticum aestivum",
    medicinalUses: ["Boosts metabolism", "Detoxifies body"],
    benefits: "Rich in vitamins, minerals, and antioxidants.",
  },
  {
    name: "Bryophyllum",
    image: "/Bryo.glb",
    scientificName: "Triticum aestivum",
    medicinalUses: ["Boosts metabolism", "Detoxifies body"],
    benefits: "Rich in vitamins, minerals, and antioxidants.",
  },
  ,
  {
    name: "Mint",
    image: "/mint.glb",
    scientificName: "Triticum aestivum",
    medicinalUses: ["Boosts metabolism", "Detoxifies body"],
    benefits: "Rich in vitamins, minerals, and antioxidants.",
  },
  ,
  {
    name: "Chervil",
    image: "/chervil.glb",
    scientificName: "Triticum aestivum",
    medicinalUses: ["Boosts metabolism", "Detoxifies body"],
    benefits: "Rich in vitamins, minerals, and antioxidants.",
  },
  ,
  {
    name: "Ashwagandha",
    image: "/ashvagandha.glb",
    scientificName: "Triticum aestivum",
    medicinalUses: ["Boosts metabolism", "Detoxifies body"],
    benefits: "Rich in vitamins, minerals, and antioxidants.",
  },
  ,
  {
    name: "Hibiscus",
    image: "/hibiscus.glb",
    scientificName: "Triticum aestivum",
    medicinalUses: ["Boosts metabolism", "Detoxifies body"],
    benefits: "Rich in vitamins, minerals, and antioxidants.",
  },
];

const PlantModel = ({ modelUrl, onClick }) => {
  const { scene } = useGLTF(modelUrl);
  return (
    <div onClick={onClick} style={{ cursor: "pointer" }}>
      <Canvas style={{ height: "400px", width: "100%" }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Environment preset="sunset" />
        <primitive object={scene} scale={3.0} />
        <OrbitControls />
      </Canvas>
    </div>
  );
};

const Plant = () => {
  const [zoomedPlant, setZoomedPlant] = useState(null);

  const CustomTooltip = styled(Tooltip)({
    "& .MuiTooltip-tooltip": {
      fontSize: "1rem", // Increase font size
      backgroundColor: "green", // Change background color
      color: "white", // Ensure text is readable
      padding: "8px 12px", // Add some padding
    },
    "& .MuiTooltip-arrow": {
      color: "green", // Match arrow color with the background
    },
  });

  return (
    <div
      style={{
        backgroundColor: "#000",
        padding: "20px",
        color: "#fff",
        height: "100vh",
      }}
    >
      <Swiper
        modules={[Navigation, Pagination]}
        spaceBetween={30}
        slidesPerView={1}
        navigation
      >
        {plants.map((plant, index) => (
          <SwiperSlide
            key={index}
            style={{
              display: "flex",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <div
              style={{
                flex: 1,
                padding: "30px",
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderRadius: "8px",
                margin: "50px",
              }}
            >
              <h2
                style={{
                  marginBottom: "20px",
                  fontSize: "28px",
                  color: "white",
                }}
              >
                {plant.name}
              </h2>
              <p
                style={{
                  fontSize: "21px",
                  marginBottom: "10px",
                  color: "white",
                }}
              >
                <strong style={{color:"white"}}>Scientific Name:</strong> {plant.scientificName}
              </p>
              <p
                style={{
                  fontSize: "21px",
                  marginBottom: "10px",
                  color: "white",
                }}
              >
                <strong style={{color:"white"}}>Medicinal Uses:</strong>
              </p>
              <ul style={{ marginBottom: "10px", color: "white" }}>
                {plant.medicinalUses.map((use, idx) => (
                  <li
                    key={idx}
                    style={{
                      fontSize: "21px",
                      marginLeft: "1rem",
                      color: "white",
                    }}
                  >
                    {use}
                  </li>
                ))}
              </ul>
              <p style={{ fontSize: "21px", color: "white" }}>
                <strong style={{color:"white"}}>Benefits:</strong> {plant.benefits}
              </p>
            </div>
            <div style={{ flex: 1 }}>
              <CustomTooltip title="Click to Zoom" arrow>
                <div>
                  <PlantModel
                    modelUrl={plant.image}
                    onClick={() => setZoomedPlant(plant.image)}
                  />
                </div>
              </CustomTooltip>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Fullscreen Zoomed Model */}
      {zoomedPlant && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.9)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <button
            onClick={() => setZoomedPlant(null)}
            style={{
              position: "absolute",
              top: "20px",
              right: "20px",
              fontSize: "18px",
              padding: "10px",
              backgroundColor: "red",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <Canvas style={{ height: "80vh", width: "80vw" }}>
            <ambientLight intensity={0.7} />
            <pointLight position={[10, 10, 10]} />
            <Environment preset="sunset" />
            <primitive object={useGLTF(zoomedPlant).scene} scale={5.0} />
            <OrbitControls />
          </Canvas>
        </div>
      )}
    </div>
  );
};

export default Plant;
