const { analyzeResumeWithAI } = require("../services/aiService");

async function analyzeResume(req, res) {
  try {
    const { resumeText, role } = req.body;

    const result = await analyzeResumeWithAI({
      resumeText: resumeText || "",
      role: role || "Frontend Developer",
    });

    return res.status(200).json({
      success: true,
      analysis: result,
    });
  } catch (error) {
    console.error("Resume Analysis Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to analyze resume.",
      error: error.message,
    });
  }
}

module.exports = {
  analyzeResume,
};
