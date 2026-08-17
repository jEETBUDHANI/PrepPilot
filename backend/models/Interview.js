const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  questionId: Number,
  question: String,
  answer: {
    type: String,
    default: "",
  },
  score: {
    type: Number,
    default: 0,
  },
  feedback: {
    type: String,
    default: "",
  },
});

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    role: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      required: true,
    },
    questions: {
      type: [questionSchema],
      default: [],
    },
    overallScore: {
      type: Number,
      default: 0,
    },
    overallFeedback: {
      type: String,
      default: "",
    },
    strengths: {
      type: [String],
      default: [],
    },
    weaknesses: {
      type: [String],
      default: [],
    },
    improvements: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Interview", interviewSchema);
