import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./doctor.css";

const DoctorModel = ({ isSpeaking, language }) => {
  const { scene } = useGLTF(
    language === "hi-IN" ? "/female.glb" : "/doctor.glb"
  );
  const lipsRef = useRef();
  const modelRef = useRef();

  useEffect(() => {
    scene.traverse((child) => {
      if (child.morphTargetDictionary && child.morphTargetInfluences) {
        lipsRef.current = child;
      }
    });
  }, [scene]);

  useFrame(({ clock }) => {
    if (lipsRef.current) {
      const time = performance.now() / 100;
      lipsRef.current.morphTargetInfluences[0] = isSpeaking
        ? Math.sin(time) * 0.5 + 0.5
        : 0;
    }

    if (modelRef.current) {
      modelRef.current.position.x = isSpeaking
        ? Math.sin(clock.getElapsedTime() * 3) * 0.05
        : 0;
      // Slower, very slight movement (speed 3x, amplitude 0.05)
    }
  });

  return <primitive ref={modelRef} object={scene} scale={2} />;
};

const Doctor = () => {
  const [conversation, setConversation] = useState([]);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [language, setLanguage] = useState("en-US");
  const recognitionRef = useRef(null);
  const isListeningRef = useRef(false);
  const synth = window.speechSynthesis;

  const translations = {
    "en-US": {
      intro:
        "Hello, Myself doctor Rajesh currently I can assist you with these diseases: Fever, Headache, Cold, Cough, Stomach Pain, Sore Throat, Acidity, Diarrhea, Diabetes, Blood Pressure Issues, Dizziness, and Insomnia. How can I help you today?",
      goodbye: "Goodbye! Take care.",
      error: "I couldn't hear you. Can you please repeat?",
    },
    "hi-IN": {
      intro:
        "नमस्ते, मैं डॉक्टर प्रिया आपकी मदद कर सक्ती हूँ इन बीमारियों में: बुखार, सिरदर्द, सर्दी, खांसी, पेट दर्द, गले में खराश, एसिडिटी, डायरिया, डायबिटीज, ब्लड प्रेशर की समस्या, चक्कर आना और नींद न आना। मैं आपकी कैसे मदद कर सक्ती हूँ?",
      goodbye: "अलविदा! अपना ख्याल रखना।",
      error: "मैं आपको सुन नहीं सका। क्या आप कृपया दोहरा सकते हैं?",
    },
  };

  const speak = (text, callback) => {
    setIsSpeaking(true);
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = language;

    // Select a proper voice
    let voices = synth.getVoices();
    utterance.voice =
      voices.find((v) => v.lang.startsWith(language)) || voices[0];

    utterance.onend = () => {
      setIsSpeaking(false);
      if (callback) callback();
    };

    synth.speak(utterance);
  };

  const handleTalkClick = () => {
    const introMessage = translations[language].intro;
    addMessage(introMessage, "doctor");
    speak(introMessage, listen);
  };

  const listen = () => {
    if (
      !("webkitSpeechRecognition" in window || "SpeechRecognition" in window)
    ) {
      alert("Speech Recognition is not supported in this browser. Try Chrome!");
      return;
    }

    if (isListeningRef.current) return;
    isListeningRef.current = true;

    const recognition = new (window.SpeechRecognition ||
      window.webkitSpeechRecognition)();
    recognition.lang = language;
    recognition.continuous = false;
    recognition.interimResults = false;
    recognitionRef.current = recognition;

    recognition.onresult = (event) => {
      const userSpeech = event.results[0][0].transcript.toLowerCase().trim();
      handleUserQuery(userSpeech);
    };

    recognition.onerror = () => {
      addMessage(translations[language].error, "doctor");
      speak(translations[language].error, listen);
    };

    recognition.onend = () => {
      isListeningRef.current = false;
    };

    recognition.start();
  };

  const handleUserQuery = (query) => {
    addMessage(`You said: ${query}`, "user");

    // Stop command in both languages
    if (
      query.includes("stop") ||
      query.includes("रुक जाओ") ||
      query.includes("बंद करो") ||
      query.includes("रुको")
    ) {
      const stopMessage =
        language === "hi-IN"
          ? "ठीक है, मैं रुक रही हूँ। अगर आपको फिर से मेरी जरूरत हो तो बताइए।"
          : "Alright, I will stop. Let me know if you need me again.";

      addMessage(stopMessage, "doctor");
      speak(stopMessage, stopListening); // Stop recognition after speaking
      return;
    }

    if (
      query.includes("bye") ||
      query.includes("thank you") ||
      query.includes("धन्यवाद") ||
      query.includes("अलविदा")
    ) {
      addMessage(translations[language].goodbye, "doctor");
      speak(translations[language].goodbye, stopListening);
      return;
    }

    const reply = getDoctorResponse(query);
    addMessage(reply, "doctor");
    speak(reply, listen);
  };

  const getDoctorResponse = (query) => {
    if (language === "hi-IN") {
      if (query.includes("बुखार"))
        return "गर्म पानी पिएं, आराम करें, और जरूरत हो तो अमृतारिष्ट लें। तुलसी की चाय पिएं और माथे पर चंदन का लेप लगाएं।";
      if (query.includes("सिरदर्द"))
        return "ध्यान करें, खूब पानी पिएं, और जरूरत हो तो हल्की दर्द निवारक दवा लें। पेपरमिंट या ब्राह्मी तेल सिर पर लगाएं।";
      if (query.includes("सर्दी"))
        return "गर्म रहें, अदरक की चाय पिएं, और अच्छी तरह आराम करें। नीलगिरी के तेल की भाप लें और इम्युनिटी बढ़ाने के लिए च्यवनप्राश खाएं।";
      if (query.includes("खांसी"))
        return "गर्म पानी में शहद मिलाकर पिएं और ठंडे पेय से बचें। तुलसी, मुलेठी और अदरक की चाय पीने से राहत मिलेगी।";
      if (query.includes("पेट दर्द"))
        return "गुनगुना पानी पिएं, हल्का भोजन करें, और अगर दर्द जारी रहे तो डॉक्टर से परामर्श लें। अजवाइन पानी या त्रिफला चूर्ण लेने से राहत मिलेगी।";
      if (query.includes("एसिडिटी"))
        return "ठंडा दूध पिएं, मसालेदार भोजन से बचें, और छोटी-छोटी मात्रा में भोजन करें। सौंफ चबाएं या जीरा पानी पिएं।";
      if (query.includes("डायबिटीज"))
        return "चीनी और कार्बोहाइड्रेट कम करें, नियमित व्यायाम करें, और समय-समय पर शुगर लेवल चेक करें। करेला जूस और मेथी दाने का सेवन करें।";
      if (query.includes("ब्लड प्रेशर"))
        return "कम नमक खाएं, तनाव कम करें, और नियमित रूप से ब्लड प्रेशर की जांच करें। लहसुन, अश्वगंधा और चुकंदर का रस लाभकारी हो सक्ती है।";
      if (query.includes("चक्कर"))
        return "थोड़ा आराम करें, पानी पिएं, और अगर लगातार चक्कर आ रहे हैं तो डॉक्टर से परामर्श लें। ब्राह्मी या तुलसी की चाय पिएं और गहरी सांस लेने का अभ्यास करें।";
      if (query.includes("नींद नहीं आ रही"))
        return "रात को हल्का भोजन करें, मोबाइल स्क्रीन से बचें, और सोने से पहले रिलैक्स करें। जायफल मिला हुआ गर्म दूध या अश्वगंधा चाय पीने से अच्छी नींद आएगी।";
      return "मुझे यकीन नहीं है, लेकिन अपने स्वास्थ्य का ख्याल रखना महत्वपूर्ण है! यदि लक्षण बने रहते हैं, तो किसी असली डॉक्टर से परामर्श लें।";
    } else {
      if (query.includes("fever"))
        return "Drink warm water, rest well, and take Amritharishtam if needed. You can also drink kadha and apply a cool sandalwood paste on the forehead.";
      if (query.includes("headache"))
        return "Try some meditation, drink plenty of water, and if needed, take a mild painkiller. Applying peppermint oil or Brahmi oil to the temples can help.";
      if (query.includes("cold"))
        return "Stay warm, drink ginger tea, and rest well. You can also inhale steam with eucalyptus oil and take Chyawanprash to boost immunity.";
      if (query.includes("cough"))
        return "Try honey with warm water and avoid cold drinks. Mulethi (licorice), and ginger tea can help soothe the throat.";
      if (query.includes("stomach pain"))
        return "Drink warm water, eat light food, and consult a doctor if pain persists. Drinking ajwain (carom seeds) water or taking Triphala powder can aid digestion.";
      if (query.includes("acidity"))
        return "Drink cold milk, avoid spicy food, and eat smaller meals. Consuming soaked fennel seeds or drinking cumin (jeera) water can provide relief.";
      if (query.includes("diabetes"))
        return "Reduce sugar and carbohydrates, exercise regularly, and monitor your blood sugar levels. Drinking bitter gourd (karela) juice and consuming fenugreek (methi) seeds can help manage blood sugar levels.";
      if (query.includes("blood pressure"))
        return "Eat less salt, reduce stress, and check your BP regularly. Consuming garlic, Ashwagandha, and drinking beetroot juice can naturally regulate blood pressure.";
      if (query.includes("dizziness"))
        return "Take some rest, drink water, and consult a doctor if dizziness persists. Drinking Brahmi tea or Tulsi tea and performing deep breathing exercises can help.";
      if (query.includes("insomnia") || query.includes("can't sleep"))
        return "Eat a light dinner, avoid screens before bed, and try to relax before sleeping. Drinking warm milk with nutmeg or Ashwagandha tea can promote deep sleep.";
      return "I'm not sure, but taking care of your health is important! If symptoms persist, consult a real doctor.";
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    isListeningRef.current = false;
  };

  const addMessage = (text, sender) => {
    setConversation((prev) => [...prev, { text, sender }]);
  };

  return (
    <div className="doctor-container">
      <Canvas camera={{ position: [0, 1, 3] }} style={{ height: "42rem" }}>
        <OrbitControls />
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 2, 2]} intensity={1} />
        <DoctorModel isSpeaking={isSpeaking} language={language} />
      </Canvas>

      <div className="doctor-info">
        <select
          className="language-select"
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
        >
          <option value="en-US">English</option>
          <option value="hi-IN">हिंदी</option>
        </select>
        <button className="talk-button" onClick={handleTalkClick}>
          🎤 Talk to Doctor
        </button>
        <div className="chat-box">
          {conversation.map((msg, index) => (
            <p key={index} className={msg.sender}>
              {msg.text}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Doctor;
