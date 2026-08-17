const express = require("express");
const protect = require("../middleware/authMiddleware");
const Interview = require("../models/Interview");

const router = express.Router();

router.get("/", protect, async (req, res) => {
  try {
    const interviews = await Interview.find({
      user: req.user.userId,
    }).sort({
      createdAt: -1,
    });

    if (!interviews || interviews.length === 0) {
      return res.json({
        success: true,
        performance: {
          totalInterviews: 0,
          averageScore: 0,
          bestScore: 0,
          totalPracticeTime: 0,
          skills: [],
          weeklyPerformance: [],
        },
      });
    }

    const scores = interviews.map((interview) => interview.overallScore || 0);
    const totalInterviews = interviews.length;
    const averageScore = Math.round(
      scores.reduce((sum, score) => sum + score, 0) / totalInterviews
    );
    const bestScore = Math.max(...scores);

    const weeklyPerformance = interviews
      .slice(0, 7)
      .reverse()
      .map((interview) => ({
        date: interview.createdAt,
        score: interview.overallScore || 0,
      }));

    return res.json({
      success: true,
      performance: {
        totalInterviews,
        averageScore,
        bestScore,
        totalPracticeTime: totalInterviews * 20,
        weeklyPerformance,
      },
    });
  } catch (error) {
    console.error("Performance Route Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to load performance",
    });
  }
});

module.exports = router;
