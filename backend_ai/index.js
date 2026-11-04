require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./conn");

const app = express();

// Core middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection middleware
app.use(async (req, res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    res
      .status(500)
      .json({ error: "Database connection failed", details: error.message });
  }
});

// Health check route
app.get("/", (req, res) => {
  res.json({ status: "ok", message: "ImproveCV Backend is running" });
});

// Import and mount your routes here
// const resumeRoutes = require("./Routes/resume");
// const userRoutes = require("./Routes/user");
// app.use("/api/resume", resumeRoutes);
// app.use("/api/user", userRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
