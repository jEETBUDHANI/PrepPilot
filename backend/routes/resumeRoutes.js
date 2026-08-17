const express = require("express");
const multer = require("multer");
const pdfParse = require("pdf-parse");

const protect = require("../middleware/authMiddleware");
const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/aiService");

const router = express.Router();

const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },

  fileFilter: (req, file, cb) => {
    if (file.mimetype === "application/pdf") {
      cb(null, true);
    } else {
      cb(new Error("Only PDF files are supported"));
    }
  },
});

router.post(
  "/analyze",
  protect,
  upload.single("resume"),
  async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Resume file is required",
        });
      }

      const pdfData = await pdfParse(req.file.buffer);
      const resumeText = pdfData.text;

      if (!resumeText || !resumeText.trim()) {
        return res.status(400).json({
          success: false,
          message: "Could not extract text from resume",
        });
      }

      const analysis = await analyzeResume(resumeText);

      const resume = await Resume.create({
        user: req.user.userId,
        fileName: req.file.originalname,
        atsScore: analysis.atsScore,
        summary: analysis.summary,
        skills: analysis.skills,
        strengths: analysis.strengths,
        improvements: analysis.improvements,
      });

      return res.status(200).json({
        success: true,
        message: "Resume analysis complete",
        resume,
      });
    } catch (error) {
      console.error("Resume Route Error:", error);
      return res.status(500).json({
        success: false,
        message: error.message || "Resume analysis failed",
      });
    }
  }
);

// GET /api/resume/latest - Fetch latest resume analysis for current user
router.get("/latest", protect, async (req, res) => {
  try {
    const resume = await Resume.findOne({ user: req.user.userId }).sort({
      createdAt: -1,
    });

    return res.status(200).json({
      success: true,
      resume: resume || null,
    });
  } catch (error) {
    console.error("Get Latest Resume Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch resume analysis",
    });
  }
});

module.exports = router;
