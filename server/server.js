const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Message = require("./models/message");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    message: "Backend is running successfully!",
  });
});

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error.message);
  });


  
app.post("/api/messages", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string" ||
      !name.trim() ||
      !email.trim() ||
      !message.trim()
    ) {
      return res.status(400).json({
        message: "Please provide name, email and message.",
      });
    }

    const newMessage = await Message.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
    });

    res.status(201).json({
      message: "Message saved successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error("Save error:", error.message);

    res.status(500).json({
      message: "Failed to save message.",
    });
  }
});





app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
