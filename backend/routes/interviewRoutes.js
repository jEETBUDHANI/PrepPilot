const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createInterview,
  evaluateInterview,
  getInterviews,
  getInterviewById,
} = require("../controllers/interviewController");

// Protected interview routes
router.get("/", protect, getInterviews);
router.get("/:id", protect, getInterviewById);
router.post("/", protect, createInterview);
router.post("/evaluate", protect, evaluateInterview);

module.exports = router;
