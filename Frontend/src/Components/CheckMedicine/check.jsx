import { useState } from "react";
import { Button } from "@mui/material";
import "./check.css";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Check = () => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setSelectedFile(file);
    }
  };

  const processIngredients = async () => {
    if (!selectedFile) return;

    setIsProcessing(true);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:5000/extract",
        formData,
        {
          responseType: "blob",
        }
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

        // ✅ Show success toast
        toast.success("Processing Completed! PDF has been downloaded.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else {
        toast.error("Error processing image. Please try again.", {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: true,
          theme: "dark",
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (error) {
      console.error("Error processing image:", error);
      toast.error("An error occurred while processing.", {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: true,
        theme: "dark",
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <>
      <div className="image-container">
        <h2 style={{ fontSize: "29px" }}>HerbCure's Ingredient Processor</h2>

        {/* Upload Section */}
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

        {/* Image Preview */}
        {image && (
          <img src={image} alt="Uploaded Preview" className="image-preview" />
        )}

        {/* Process Button */}
        <Button
          variant="contained"
          color="success"
          fullWidth
          className="process-btn"
          onClick={processIngredients}
          disabled={!selectedFile || isProcessing}
        >
          {isProcessing ? "Processing..." : "Generate PDF Report"}
        </Button>
      </div>
      <ToastContainer />
    </>
  );
};

export default Check;
