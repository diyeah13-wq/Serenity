import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("../public")); // serves your frontend

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;


// CHAT ROUTE
app.post("/chat", async (req, res) => {

  try {

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openrouter/free",
        messages: [
          { role: "user", content: req.body.message }
        ]
      },
      {
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });

  } catch (error) {

    console.log(error.response?.data || error.message);

    res.status(500).json({
      reply: "AI service error"
    });

  }

});


app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
