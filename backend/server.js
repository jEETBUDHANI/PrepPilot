const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");
const interviewRoutes = require("./routes/interviewRoutes");
const authRoutes = require("./routes/authRoutes");
const resumeRoutes = require("./routes/resumeRoutes");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// API Routes
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "PrepPilot AI Interview Platform API Server is running",
  });
});

app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Server is healthy",
    timestamp: new Date().toISOString(),
  });
});

app.use("/api/interviews", interviewRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `API Route ${req.originalUrl} not found`,
  });
});

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("Global Express Error:", err);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal server error",
  });
});

// Connect to MongoDB & Start Server
connectDB();

app.listen(PORT, () => {
  console.log(`PrepPilot API Server running on port ${PORT}`);
});
