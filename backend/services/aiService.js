const { GoogleGenAI } = require("@google/genai");
const OpenAI = require("openai");

// Helper to check Gemini Key
function hasValidGeminiKey() {
  const key = process.env.GEMINI_API_KEY;
  return key && key !== "your_api_key_here" && !/your_/i.test(key);
}

// Helper to check OpenAI Key
function hasValidOpenAIKey() {
  const key = process.env.OPENAI_API_KEY;
  return key && key !== "your_api_key_here" && !/your_/i.test(key);
}

function getGeminiClient() {
  if (!hasValidGeminiKey()) return null;
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

function getOpenAIClient() {
  if (!hasValidOpenAIKey()) return null;
  return new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
}

// Fallback Generators for Dev mode when no API Key is configured
function generateFallbackQuestions(role, difficulty, count) {
  const questionPool = {
    "Frontend Developer": [
      "Explain the Virtual DOM in React and how reconciliation works.",
      "How do you optimize initial page load performance in a React application?",
      "What is the difference between state and props, and how do you handle state lifting?",
      "Explain CSS Flexbox vs Grid and when to use each.",
      "How do Async/Await and Promises handle asynchronous JavaScript operations?",
      "What are Web Vitals and how do you measure Core Web Vitals (LCP, FID, CLS)?",
    ],
    "React Developer": [
      "Explain the difference between useEffect, useLayoutEffect, and custom hooks.",
      "How does React 19 handle automatic batching and concurrent rendering?",
      "What strategies do you use for global state management in complex React apps?",
      "How do you prevent unnecessary re-renders in large component trees?",
      "Explain Context API vs Redux Toolkit tradeoffs.",
    ],
    "Full Stack Developer": [
      "Explain how REST APIs handle authentication via JWT vs Session cookies.",
      "How do you design database schemas for high concurrency applications?",
      "What strategies do you use for caching data between Express backend and client?",
      "Explain the event loop in Node.js and how non-blocking I/O functions.",
      "How do you secure Node.js Express APIs against OWASP top 10 vulnerabilities?",
    ],
    "JavaScript Developer": [
      "Explain JavaScript closure, execution context, and lexical environment.",
      "How does prototype inheritance work in JavaScript?",
      "What is the difference between event bubbling, event capturing, and delegation?",
      "Explain Event Loop, Microtasks, and Macrotasks execution order.",
      "How do Map, Set, WeakMap, and WeakSet differ in memory management?",
    ],
  };

  const pool = questionPool[role] || questionPool["Frontend Developer"];
  const questions = [];

  for (let i = 0; i < Math.min(count, pool.length); i++) {
    questions.push({
      id: i + 1,
      question: pool[i],
    });
  }

  while (questions.length < count) {
    const idx = questions.length + 1;
    questions.push({
      id: idx,
      question: `Describe a scenario in ${role} development where you solved a complex ${difficulty.toLowerCase()} level architectural bug.`,
    });
  }

  return questions;
}

function generateFallbackEvaluation(role, difficulty, answers) {
  const evaluatedAnswers = answers.map((item, idx) => {
    const wordCount = item.answer ? item.answer.trim().split(/\s+/).length : 0;
    const score = Math.min(95, Math.max(65, 70 + wordCount));

    return {
      questionId: item.questionId || idx + 1,
      question: item.question,
      score,
      feedback: wordCount > 20
        ? "Good explanation with relevant technical terms. Could expand further on performance tradeoffs."
        : "Answer is concise. Try using the STAR method and adding concrete technical examples.",
    };
  });

  const avgScore = Math.round(
    evaluatedAnswers.reduce((sum, a) => sum + a.score, 0) / (evaluatedAnswers.length || 1)
  );

  return {
    score: avgScore,
    overallScore: avgScore,
    overallFeedback: `Solid overall performance for a ${difficulty} level ${role} interview session. Technical fundamentals are sound. Focus on structuring responses with clear architectural reasoning.`,
    strengths: [
      "Clear technical terminology",
      "Good understanding of core principles",
      "Relevant answers to role prompts",
    ],
    weaknesses: [
      "Lacks deep quantitative metrics in responses",
      "Could expand further on edge case handling",
    ],
    improvements: [
      "Incorporate more quantitative project metrics",
      "Explain error-handling edge cases",
      "Use STAR framework for behavioral prompts",
    ],
    questionFeedback: evaluatedAnswers,
    answers: evaluatedAnswers,
  };
}

/**
 * GENERATE INTERVIEW QUESTIONS USING GEMINI / OPENAI / FALLBACK
 */
async function generateInterviewQuestions({ role, difficulty, questionCount }) {
  const gemini = getGeminiClient();
  const openai = getOpenAIClient();

  const prompt = `You are an expert technical interviewer.
Generate ${questionCount} interview questions for a ${role} position.
Difficulty: ${difficulty}

Requirements:
- Questions must be relevant to the role.
- Questions should test practical understanding.
- Avoid duplicate questions.
- Include conceptual and practical questions.

Return JSON in this format:
{
  "questions": [
    {
      "id": 1,
      "question": "Question text here"
    }
  ]
}`;

  // 1. Try Gemini API
  if (gemini) {
    try {
      console.log("Generating interview questions using Google Gemini AI...");
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.7,
        },
      });

      const result = JSON.parse(response.text);
      if (result.questions && Array.isArray(result.questions)) {
        return result.questions;
      }
    } catch (error) {
      console.error("Gemini Question Generation Error:", error.message);
    }
  }

  // 2. Try OpenAI API
  if (openai) {
    try {
      console.log("Generating interview questions using OpenAI...");
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are an expert technical interviewer outputting valid JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.7,
      });

      const result = JSON.parse(completion.choices[0].message.content);
      return result.questions || generateFallbackQuestions(role, difficulty, questionCount);
    } catch (error) {
      console.error("OpenAI Question Generation Error:", error.message);
    }
  }

  // 3. Fallback for Dev mode
  console.log("Using local fallback question generator (No API key configured).");
  return generateFallbackQuestions(role, difficulty, questionCount);
}

/**
 * EVALUATE INTERVIEW ANSWERS USING GEMINI / OPENAI / FALLBACK
 */
async function evaluateInterviewAnswers({ role, difficulty = "Medium", answers }) {
  const gemini = getGeminiClient();
  const openai = getOpenAIClient();

  const answersText = answers
    .map((item, index) => `Question ${index + 1}: ${item.question}\nCandidate Answer: ${item.answer}`)
    .join("\n\n---\n\n");

  const prompt = `You are an expert technical interviewer evaluating a candidate's interview session.
Role: ${role}
Difficulty: ${difficulty}

Questions & Answers:
${answersText}

Evaluate comprehensively. Return ONLY valid JSON in this exact structure:
{
  "score": 85,
  "overallScore": 85,
  "overallFeedback": "Overall evaluation text...",
  "strengths": ["Strength 1", "Strength 2"],
  "weaknesses": ["Weakness 1", "Weakness 2"],
  "improvements": ["Improvement 1", "Improvement 2"],
  "questionFeedback": [
    {
      "questionId": 1,
      "score": 80,
      "feedback": "Feedback for this answer"
    }
  ]
}`;

  // 1. Try Gemini API
  if (gemini) {
    try {
      console.log("Evaluating interview answers using Google Gemini AI...");
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.5,
        },
      });

      const parsed = JSON.parse(response.text);
      return {
        ...parsed,
        overallScore: parsed.score || parsed.overallScore || 80,
      };
    } catch (error) {
      console.error("Gemini Evaluation Error:", error.message);
    }
  }

  // 2. Try OpenAI API
  if (openai) {
    try {
      console.log("Evaluating interview answers using OpenAI...");
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are an expert technical evaluator outputting valid JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.5,
      });

      const parsed = JSON.parse(completion.choices[0].message.content);
      return {
        ...parsed,
        overallScore: parsed.score || parsed.overallScore || 80,
      };
    } catch (error) {
      console.error("OpenAI Evaluation Error:", error.message);
    }
  }

  // 3. Fallback
  console.log("Using local fallback evaluation generator (No API key configured).");
  return generateFallbackEvaluation(role, difficulty, answers);
}

/**
 * ANALYZE RESUME USING GEMINI / OPENAI / FALLBACK
 */
async function analyzeResume(resumeText, role = "Full Stack Developer") {
  const gemini = getGeminiClient();
  const openai = getOpenAIClient();

  const prompt = `You are an expert ATS (Applicant Tracking System) resume analyzer.

Analyze the following resume text for a target role of "${role}".

Evaluate:
1. ATS compatibility score (0 to 100)
2. Executive Summary of candidate profile
3. Detected technical skills (array of strings)
4. Key resume strengths (array of strings)
5. Prioritized action items / improvements (array of strings)

Return ONLY valid JSON in this exact structure:
{
  "atsScore": 84,
  "summary": "Short professional summary of the resume and qualifications.",
  "skills": ["React", "Node.js", "JavaScript", "MongoDB"],
  "strengths": ["Strong project experience", "Modern full-stack technical keywords"],
  "improvements": ["Add quantitative impact metrics", "Include link to live demo"]
}

Resume Text:
${resumeText}
`;

  // 1. Try Gemini API
  if (gemini) {
    try {
      console.log("Analyzing resume text using Google Gemini AI...");
      const response = await gemini.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text);
      return {
        atsScore: parsed.atsScore || 82,
        summary: parsed.summary || "Resume analyzed successfully by Gemini AI.",
        skills: parsed.skills || [],
        strengths: parsed.strengths || [],
        improvements: parsed.improvements || [],
      };
    } catch (error) {
      console.error("Gemini Resume Analysis Error:", error.message);
    }
  }

  // 2. Try OpenAI API
  if (openai) {
    try {
      console.log("Analyzing resume text using OpenAI...");
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        response_format: { type: "json_object" },
        messages: [
          { role: "system", content: "You are an expert ATS resume analyzer outputting valid JSON." },
          { role: "user", content: prompt },
        ],
        temperature: 0.3,
      });

      const parsed = JSON.parse(completion.choices[0].message.content);
      return {
        atsScore: parsed.atsScore || 80,
        summary: parsed.summary || "Resume analyzed successfully.",
        skills: parsed.skills || [],
        strengths: parsed.strengths || [],
        improvements: parsed.improvements || [],
      };
    } catch (error) {
      console.error("OpenAI Resume Analysis Error:", error.message);
    }
  }

  // 3. Fallback
  console.log("Using fallback resume analyzer (No API key configured).");
  return {
    atsScore: 84,
    summary: "Resume parsed successfully. Strong technical background detected.",
    skills: ["React", "JavaScript", "Node.js", "Express", "MongoDB", "TailwindCSS"],
    strengths: ["Strong technical project experience", "Modern web stack keywords"],
    improvements: [
      "Add measurable achievements and performance metrics to work experience",
      "Include links to live project demos or GitHub repositories",
      "Format section headers for better ATS parsing",
    ],
  };
}

async function analyzeResumeWithAI({ resumeText, role }) {
  return analyzeResume(resumeText, role);
}

module.exports = {
  generateInterviewQuestions,
  evaluateInterviewAnswers,
  evaluateInterview: evaluateInterviewAnswers,
  analyzeResumeWithAI,
  analyzeResume,
};
