import React, { useState, useRef, useEffect } from "react"; 
import { Send, X } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // ✅ For navigation
import "./ai.css";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const AI = () => {
  const navigate = useNavigate(); // ✅ Initialize navigation
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you today?", sender: "bot" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [medicineSuggestions, setMedicineSuggestions] = useState([]);

  const chatContainerRef = useRef(null);

  useEffect(() => {
    chatContainerRef.current?.scrollTo({
      top: chatContainerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages, medicineSuggestions]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    setMessages((prev) => [...prev, { text: input, sender: "user" }]);
    setInput("");
    setLoading(true);

    try {
      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ contents: [{ parts: [{ text: input }] }] }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      const reply =
        data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join(" ") ||
        "Sorry, I couldn't process that.";

      setMessages((prev) => [...prev, { text: formatGeminiResponse(reply), sender: "bot" }]);

      fetchMedicineSuggestions(input);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        { text: "Error fetching response. Please try again.", sender: "bot" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMedicineSuggestions = async (query) => {
    try {
      const medicineUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`;

      const response = await fetch(medicineUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Suggest 3-4 medicines in JSON format: { "name": "", "description": "", "imageUrl": "" } for: ${query}`,
                },
              ],
            },
          ],
        }),
      });

      const data = await response.json();
      console.log("Medicine Suggestions:", data);

      const rawText = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join(" ");
      const formattedMedicines = extractMedicineData(rawText);

      setMedicineSuggestions(formattedMedicines);
    } catch (error) {
      console.error("Medicine API Error:", error);
    }
  };

  const extractMedicineData = (text) => {
    try {
      const jsonStart = text.indexOf("{");
      const jsonEnd = text.lastIndexOf("}") + 1;
      const jsonString = text.substring(jsonStart, jsonEnd);

      const medicines = JSON.parse(`[${jsonString.replace(/}\s*{/g, "},{")}]`);
      return medicines;
    } catch (error) {
      console.error("JSON Parse Error:", error);
      return [];
    }
  };

  // ✅ Formats Gemini response with bold titles and proper spacing
  const formatGeminiResponse = (text) => {
    return text
      .replace(/\*(.*?)\*/g, "<b>$1</b>") // Bold titles
      .replace(/\n/g, "<br>") // New lines for better readability
      .replace(/\* /g, "• "); // Bullet points
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !loading) {
      sendMessage();
    }
  };

  return (
    <div className="chat-overlay">
      <div className="chat-container">
        <div className="chat-header">
          Your Chemist AI
          <button className="close-button" onClick={() => navigate("/")}> <X size={24} /> </button>
        </div>

        <div className="chat-box" ref={chatContainerRef}>
          {messages.map((msg, index) => (
            <motion.div
              key={index}
              className={`chat-message ${msg.sender}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              dangerouslySetInnerHTML={{ __html: msg.text }}
            />
          ))}
          {loading && (
            <motion.div className="chat-message bot" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}>
              Typing...
            </motion.div>
          )}
        </div>

        {medicineSuggestions.length > 0 && (
          <div className="medicine-suggestions">
            <h4>💊 Suggested Medicines</h4>
            <div className="medicine-list">
              {medicineSuggestions.map((med, index) => (
                <div key={index} className="medicine-item">
                  <img src={med.imageUrl} alt={med.name} className="medicine-image" />
                  <h5 className="medicine-title">{med.name}</h5>
                  <p className="medicine-description">{med.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="chat-input"
            disabled={loading}
          />
          <button onClick={sendMessage} className="send-button" disabled={loading}> <Send size={20} /> </button>
        </div>
      </div>
    </div>
  );
};

export default AI;
