require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require('./db');
const mongoose = require("mongoose");

// Middleware
app.use(express.json());
app.use(cors());

// DB Connection
connection();

// Import the model
require("./models/userDetails");

const User = mongoose.model("Userinfo");

// Register Route
app.post("/register", async (req, res) => {
  console.log("Received a POST request on /register");
  const { name, email, companyName, password, confirmPassword, userId } = req.body;
  try {
    if (password !== confirmPassword) {
      return res.status(400).send({ status: "error", message: "Passwords do not match" });
    }

    await User.create({
      name,
      email,
      companyName,
      password,
      confirmPassword,
      userId
    });

    res.send({ status: "registration details stored ok" });
  } catch (error) {
    console.error(error); // Log the error for debugging
    res.status(500).send({ status: "error", message: error.message });
  }
});

// Routes (Uncomment if needed)
// app.use("/api/users", userRoutes); // Uncomment and use correct paths
// app.use("/api/auth", authRoutes);  // Uncomment and use correct paths

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}...`)); // Fixed console log

// Debug Log: Server Listening Confirmation
console.log(`Server listening on port ${port}`);
