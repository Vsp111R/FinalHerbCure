const express = require("express");
const app = express()
const cors = require("cors")
const cookieParser = require("cookie-parser")
const connectDB = require("./config/db")
const userRouter = require("./routes/userRoutes");
require("dotenv").config()

connectDB()
const PORT = process.env.VITE_BASIC_SERVER_PORT;

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: "http://localhost:5174", // Allow requests from your frontend
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // Allow cookies if needed
}));


//Basic configuration
app.listen(PORT, () => {
    console.group(`Server running on port ${PORT}`)
})

//User login/signup endpoints
app.use("/user", userRouter);


const ayurvedicIngredients = [
  "Ashwagandha", "Brahmi", "Shatavari", "Neem",
  "Haritaki", "Amla", "Guggulu", "Giloy", "Triphala",
  "Pippali", "Maricha", "Musta", "Shunthi", "Shathi"
];

// API to check extracted text for Ayurvedic ingredients
app.post("/check-ingredients", (req, res) => {
  const { extractedText } = req.body;

  if (!extractedText) {
    return res.status(400).json({ error: "No text provided" });
  }

  const foundIngredients = ayurvedicIngredients.filter((ingredient) =>
    new RegExp(`\\b${ingredient}\\b`, "i").test(extractedText)
  );

  res.json({ ingredients: foundIngredients });
});