const express = require("express");
const multer = require("multer");
const pdfParseModule = require("pdf-parse");

const protect = require("../middleware/authMiddleware");
const Resume = require("../models/Resume");
const { analyzeResume } = require("../services/aiService");

const router = express.Router();

// Helper function to handle text extraction across different pdf-parse module exports (v1.x vs v2.x)
async function extractPdfText(buffer) {
  if (typeof pdfParseModule === "function") {
    const pdfData = await pdfParseModule(buffer);
    return pdfData.text;
  } else if (pdfParseModule && typeof pdfParseModule.PDFParse === "function") {
    const parser = new pdfParseModule.PDFParse({ data: buffer });
    const pdfData = await parser.getText();
    if (typeof parser.destroy === "function") {
      await parser.destroy();
    }
    return pdfData.text;
  } else if (pdfParseModule && typeof pdfParseModule.default === "function") {
    const pdfData = await pdfParseModule.default(buffer);
    return pdfData.text;
  } else {
    throw new Error("PDF parser module is not recognized as a function or class");
  }
}

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

      const resumeText = await extractPdfText(req.file.buffer);

      if (!resumeText || !resumeText.trim()) {
        return res.status(400).json({
          success: false,
          message: "Could not extract text from resume",
        });
      }

      const role = req.body?.role || "Full Stack Developer";
      const analysis = await analyzeResume(resumeText, role);

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
