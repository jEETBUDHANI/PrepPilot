const express = require("express");
const router = express.Router();
const {
  createInterview,
  evaluateInterview,
  getInterviews,
  getInterviewById,
} = require("../controllers/interviewController");

// GET /api/interviews - List all interviews from DB
router.get("/", getInterviews);

// GET /api/interviews/:id - Get single interview by ID
router.get("/:id", getInterviewById);

// POST /api/interviews - Generate & save new interview
router.post("/", createInterview);

// POST /api/interviews/evaluate - AI Evaluation & update interview
router.post("/evaluate", evaluateInterview);

module.exports = router;
