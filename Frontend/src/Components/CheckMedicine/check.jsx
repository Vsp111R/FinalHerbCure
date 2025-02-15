// import { useState, useEffect, useRef } from "react";
// import { Button, CircularProgress } from "@mui/material";
// import CloudUploadIcon from "@mui/icons-material/CloudUpload";
// import CameraAltIcon from "@mui/icons-material/CameraAlt";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import "./check.css";

// const Check = () => {
//   const [image, setImage] = useState(null);
//   const [selectedFile, setSelectedFile] = useState(null);
//   const [isProcessing, setIsProcessing] = useState(false);
//   const [loadingText, setLoadingText] = useState("Processing...");
//   const [cameraOpen, setCameraOpen] = useState(false);
//   const videoRef = useRef(null);
//   const canvasRef = useRef(null);

//   const messages = [
//     "Don't close this window, we're working on it!",
//     "Have faith, Your medicine is under process...",
//     "Hold on tight, good things take time!",
//     "Almost there, just a moment!",
//   ];

//   useEffect(() => {
//     let interval;
//     if (isProcessing) {
//       interval = setInterval(() => {
//         setLoadingText(messages[Math.floor(Math.random() * messages.length)]);
//       }, 2000);
//     } else {
//       setLoadingText("Processing...");
//     }
//     return () => clearInterval(interval);
//   }, [isProcessing]);

//   useEffect(() => {
//     if (cameraOpen) {
//       navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
//         if (videoRef.current) {
//           videoRef.current.srcObject = stream;
//         }
//       });
//     } else {
//       if (videoRef.current && videoRef.current.srcObject) {
//         videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
//       }
//     }
//   }, [cameraOpen]);

//   const handleImageUpload = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       setImage(URL.createObjectURL(file));
//       setSelectedFile(file);
//     }
//   };

//   const capturePhoto = () => {
//     const canvas = canvasRef.current;
//     const video = videoRef.current;
//     if (canvas && video) {
//       const context = canvas.getContext("2d");
//       canvas.width = video.videoWidth;
//       canvas.height = video.videoHeight;
//       context.drawImage(video, 0, 0, canvas.width, canvas.height);
//       canvas.toBlob((blob) => {
//         const file = new File([blob], "captured_image.jpg", {
//           type: "image/jpeg",
//         });
//         setImage(URL.createObjectURL(blob));
//         setSelectedFile(file);
//         setCameraOpen(false);
//       }, "image/jpeg");
//     }
//   };

//   const processIngredients = async () => {
//     if (!selectedFile) return;
//     setIsProcessing(true);
//     const formData = new FormData();
//     formData.append("image", selectedFile);

//     try {
//       const response = await axios.post(
//         "http://localhost:5000/extract",
//         formData,
//         { responseType: "blob" }
//       );

//       if (response.status === 200) {
//         const pdfBlob = new Blob([response.data], { type: "application/pdf" });
//         const pdfUrl = window.URL.createObjectURL(pdfBlob);
//         const a = document.createElement("a");
//         a.href = pdfUrl;
//         a.download = "Extracted_Ingredients_Report.pdf";
//         document.body.appendChild(a);
//         a.click();
//         document.body.removeChild(a);

//         toast.success("Processing Completed! PDF has been downloaded.", {
//           theme: "dark",
//         });
//       } else {
//         toast.error("Error processing image. Please try again.", {
//           theme: "dark",
//         });
//       }
//     } catch (error) {
//       console.error("Error processing image:", error);
//       toast.error("An error occurred while processing.", { theme: "dark" });
//     } finally {
//       setIsProcessing(false);
//     }
//   };

//   return (
//     <>
//       <div className="image-container">
//         <h2>Check's Ingredient Processor</h2>
//         <label htmlFor="upload-input" className="upload-box">
//           <CloudUploadIcon fontSize="large" color="success" />
//           <p>Upload an image</p>
//           <input
//             type="file"
//             id="upload-input"
//             accept="image/*"
//             onChange={handleImageUpload}
//             hidden
//           />
//         </label>
//         <div className="same-capture-camera">
//           <div className="button-container">
//             <Button
//               variant="contained"
//               color="primary"
//               sx={{textTransform: "none"}}
//               className="take-photo"
//               onClick={() => setCameraOpen(!cameraOpen)}
//             >
//               <CameraAltIcon style={{marginRight:"4px"}}/> {cameraOpen ? "Close Camera" : "Take a Picture"}
//             </Button>

//             <Button
//               variant="contained"
//               color="secondary"
//               sx={{textTransform: "none"}}
//               className="capture"
//               onClick={capturePhoto}
//               disabled={!cameraOpen}
//             >
//               Capture Photo
//             </Button>
//           </div>

//           {cameraOpen && (
//             <div className="camera-container">
//               <video
//                 ref={videoRef}
//                 autoPlay
//                 playsInline
//                 className="video-preview"
//               />
//             </div>
//           )}
//         </div>

//         {image && (
//           <div className="image-wrapper">
//             <img src={image} alt="Preview" className="image-preview" />
//             {isProcessing && (
//               <div className="processing-overlay">
//                 <div className="processing-bar"></div>
//               </div>
//             )}
//           </div>
//         )}

//         <Button
//           variant="contained"
//           color="success"
//           fullWidth
//           sx={{textTransform: "none"}}
//           className="process-btn"
//           onClick={processIngredients}
//           disabled={!selectedFile || isProcessing}
//         >
//           {isProcessing ? (
//             <>
//               <CircularProgress
//                 size={24}
//                 style={{ marginRight: "10px", color: "white" }}
//               />
//               {loadingText}
//             </>
//           ) : (
//             "Generate PDF Report"
//           )}
//         </Button>
//       </div>
//       <canvas ref={canvasRef} style={{ display: "none" }} />
//       <div style={{ display: "none" }}>
//         {" "}
//         <ToastContainer />
//       </div>
//     </>
//   );
// };

// export default Check;





import { useState, useEffect, useRef } from "react";
import { Button, CircularProgress, TextField } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./check.css";

const Check = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [disease, setDisease] = useState(""); // New state for disease name
  const [isProcessing, setIsProcessing] = useState(false);
  const [loadingText, setLoadingText] = useState("Processing...");
  const [cameraOpen, setCameraOpen] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  const messages = [
    "Don't close this window, we're working on it!",
    "Have faith, Your medicine is under process...",
    "Hold on tight, good things take time!",
    "Almost there, just a moment!",
  ];

  useEffect(() => {
    let interval;
    if (isProcessing) {
      interval = setInterval(() => {
        setLoadingText(messages[Math.floor(Math.random() * messages.length)]);
      }, 2000);
    } else {
      setLoadingText("Processing...");
    }
    return () => clearInterval(interval);
  }, [isProcessing]);

  useEffect(() => {
    if (cameraOpen) {
      navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      });
    } else {
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    }
  }, [cameraOpen]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (canvas && video) {
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        const file = new File([blob], "captured_image.jpg", {
          type: "image/jpeg",
        });
        setImage(URL.createObjectURL(blob));
        setSelectedFile(file);
        setCameraOpen(false);
      }, "image/jpeg");
    }
  };

const processIngredients = async () => {
  if (!selectedFile || !disease.trim()) {
    toast.error("Please upload an image and enter a disease name.", {
      theme: "dark",
    });
    return;
  }

  console.log("Sending disease:", disease); // Debugging log

  setIsProcessing(true);
  const formData = new FormData();
  formData.append("image", selectedFile);
  formData.append("disease", disease);
    try {
      const response = await axios.post(
        "http://localhost:5000/extract",
        formData,
        { responseType: "blob" }
      );

      if (response.status === 200) {
        const pdfBlob = new Blob([response.data], { type: "application/pdf" });
        const pdfUrl = window.URL.createObjectURL(pdfBlob);
        const a = document.createElement("a");
        a.href = pdfUrl;
        a.download = "Extracted_Ingredients_Report.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);

        toast.success("Processing Completed! PDF has been downloaded.", {
          theme: "dark",
        });
      } else {
        toast.error("Error processing image. Please try again.", {
          theme: "dark",
        });
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("An error occurred while processing.", { theme: "dark" });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="image-container">
        <h2>Check's Ingredient Processor</h2>
        
        <TextField
          label="Enter Disease Name"
          variant="outlined"
          fullWidth
          value={disease}
          onChange={(e) => setDisease(e.target.value)}
          sx={{ marginBottom: "1rem" }}
        />

        <label htmlFor="upload-input" className="upload-box">
          <CloudUploadIcon fontSize="large" color="success" />
          <p>Upload an image</p>
          <input
            type="file"
            id="upload-input"
            accept="image/*"
            onChange={handleImageUpload}
            hidden
          />
        </label>

        <div className="same-capture-camera">
          <div className="button-container">
            <Button
              variant="contained"
              color="primary"
              sx={{ textTransform: "none" }}
              className="take-photo"
              onClick={() => setCameraOpen(!cameraOpen)}
            >
              <CameraAltIcon style={{ marginRight: "4px" }} />
              {cameraOpen ? "Close Camera" : "Take a Picture"}
            </Button>

            <Button
              variant="contained"
              color="secondary"
              sx={{ textTransform: "none" }}
              className="capture"
              onClick={capturePhoto}
              disabled={!cameraOpen}
            >
              Capture Photo
            </Button>
          </div>

          {cameraOpen && (
            <div className="camera-container">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="video-preview"
              />
            </div>
          )}
        </div>

        {image && (
          <div className="image-wrapper">
            <img src={image} alt="Preview" className="image-preview" />
            {isProcessing && (
              <div className="processing-overlay">
                <div className="processing-bar"></div>
              </div>
            )}
          </div>
        )}

        <Button
          variant="contained"
          color="success"
          fullWidth
          sx={{ textTransform: "none" }}
          className="process-btn"
          onClick={processIngredients}
          disabled={!selectedFile || isProcessing}
        >
          {isProcessing ? (
            <>
              <CircularProgress
                size={24}
                style={{ marginRight: "10px", color: "white" }}
              />
              {loadingText}
            </>
          ) : (
            "Generate PDF Report"
          )}
        </Button>
      </div>
      <canvas ref={canvasRef} style={{ display: "none" }} />
      <ToastContainer />
    </>
  );
};

export default Check;

