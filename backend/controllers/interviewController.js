const {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
} = require("../services/aiService");
const Interview = require("../models/Interview");
const mongoose = require("mongoose");

// Helper to check DB connection status
function isDBConnected() {
  return mongoose.connection.readyState === 1;
}

async function createInterview(req, res) {
  try {
    const { role, difficulty, questionCount } = req.body;

    if (!role || !difficulty || !questionCount) {
      return res.status(400).json({
        success: false,
        message: "Role, difficulty, and questionCount are required.",
      });
    }

    const questions = await generateInterviewQuestions({
      role,
      difficulty,
      questionCount: Number(questionCount),
    });

    let interview;

    if (isDBConnected()) {
      interview = await Interview.create({
        role,
        difficulty,
        questions: questions.map((q) => ({
          questionId: q.id,
          question: q.question,
        })),
      });
    } else {
      // In-memory fallback if MongoDB is not running locally
      interview = {
        _id: Date.now().toString(),
        id: Date.now().toString(),
        role,
        difficulty,
        questionCount: questions.length,
        questions: questions.map((q) => ({
          questionId: q.id,
          question: q.question,
        })),
        createdAt: new Date().toISOString(),
      };
    }

    return res.status(201).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error("Controller Interview Creation Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to create interview session.",
      error: error.message,
    });
  }
}

async function evaluateInterview(req, res) {
  try {
    const { interviewId, role, answers } = req.body;

    if (!role || !answers || !Array.isArray(answers) || answers.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Role and non-empty answers array are required.",
      });
    }

    let existingInterview = null;

    if (interviewId && isDBConnected() && mongoose.Types.ObjectId.isValid(interviewId)) {
      existingInterview = await Interview.findById(interviewId);
    }

    const difficulty = existingInterview ? existingInterview.difficulty : req.body.difficulty || "Medium";

    const evaluation = await evaluateInterviewAnswers({
      role,
      difficulty,
      answers,
    });

    const score = evaluation.score || evaluation.overallScore || 80;
    const overallFeedback = evaluation.overallFeedback || "";
    const strengths = evaluation.strengths || [];
    const weaknesses = evaluation.weaknesses || [];
    const improvements = evaluation.improvements || [];
    const qFeedback = evaluation.questionFeedback || evaluation.answers || [];

    if (existingInterview) {
      existingInterview.overallScore = score;
      existingInterview.overallFeedback = overallFeedback;
      existingInterview.strengths = strengths;
      existingInterview.weaknesses = weaknesses;
      existingInterview.improvements = improvements;

      // Update question answers & feedback
      answers.forEach((ans) => {
        const qDoc = existingInterview.questions.find(
          (q) => q.questionId === ans.questionId || q._id?.toString() === ans.questionId
        );
        if (qDoc) {
          qDoc.answer = ans.answer;
          const fb = qFeedback.find(
            (f) => f.questionId === ans.questionId || f.question === ans.question
          );
          if (fb) {
            qDoc.score = fb.score || score;
            qDoc.feedback = fb.feedback || "";
          }
        }
      });

      await existingInterview.save();
    }

    return res.status(200).json({
      success: true,
      evaluation: {
        score,
        overallScore: score,
        overallFeedback,
        strengths,
        weaknesses,
        improvements,
        questionFeedback: qFeedback,
        answers: qFeedback,
      },
      interview: existingInterview || null,
    });
  } catch (error) {
    console.error("Controller Interview Evaluation Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to evaluate interview answers.",
      error: error.message,
    });
  }
}

async function getInterviews(req, res) {
  try {
    if (!isDBConnected()) {
      return res.status(200).json({
        success: true,
        interviews: [],
        message: "MongoDB not connected. Operating in memory mode.",
      });
    }

    const interviews = await Interview.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      interviews,
    });
  } catch (error) {
    console.error("Get Interviews Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch interviews",
    });
  }
}

async function getInterviewById(req, res) {
  try {
    const { id } = req.params;

    if (!isDBConnected() || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    const interview = await Interview.findById(id);

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    return res.status(200).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.error("Get Interview By Id Error:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch interview details",
    });
  }
}

module.exports = {
  createInterview,
  evaluateInterview,
  getInterviews,
  getInterviewById,
};
