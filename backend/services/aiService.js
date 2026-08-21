const { GoogleGenAI } = require("@google/genai");
const OpenAI = require("openai");

// Helper to check Gemini Key
function hasValidGeminiKey() {
  const key = process.env.GEMINI_API_KEY;
  return key && key !== "your_api_key_here" && !/your_/i.test(key);
}

// Helper to check OpenAI Key (supports both OPENAI_API_KEY and OPEN_API_KEY)
function hasValidOpenAIKey() {
  const key = process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY;
  return key && key !== "your_api_key_here" && !/your_/i.test(key);
}

function getGeminiClient() {
  if (!hasValidGeminiKey()) return null;
  return new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
}

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY || process.env.OPEN_API_KEY;
  if (!hasValidOpenAIKey()) return null;
  return new OpenAI({ apiKey });
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

// Role-aware keyword dictionary for realistic technical evaluation
const ROLE_KEYWORDS = {
  "Frontend Developer": ["react", "dom", "component", "state", "props", "hooks", "effect", "render", "flexbox", "grid", "css", "javascript", "async", "await", "promise", "performance", "bundle", "webpack", "vite", "vitals", "redux", "context"],
  "React Developer": ["react", "component", "useeffect", "usestate", "usememo", "usecallback", "usecontext", "custom hook", "virtual dom", "reconciliation", "props", "batching", "concurrent", "redux", "jsx"],
  "Full Stack Developer": ["node", "express", "mongodb", "rest", "api", "jwt", "auth", "database", "sql", "schema", "async", "promise", "middleware", "frontend", "backend", "crud", "http", "json"],
  "JavaScript Developer": ["closure", "prototype", "event loop", "microtask", "macrotask", "bubbling", "delegation", "scope", "lexical", "hoisting", "map", "set", "promise", "async", "await", "es6"]
};

function generateFallbackEvaluation(role, difficulty, answers) {
  const currentRoleKeywords = ROLE_KEYWORDS[role] || ["code", "system", "design", "development", "logic", "function", "api", "data", "test", "process"];

  const evaluatedAnswers = answers.map((item, idx) => {
    const rawAnswer = item.answer ? String(item.answer).trim() : "";
    const words = rawAnswer.split(/\s+/).filter(Boolean);
    const wordCount = rawAnswer ? words.length : 0;
    const lowerAnswer = rawAnswer.toLowerCase();

    // Gibberish, single-word & low quality detection
    const isRepeatedChar = /^(.)\1+$/i.test(rawAnswer);
    const isCommonGibberish = /^(asdf|qwerty|zxcv|1234|idk|no|yes|abc|test|anything|blah|n\/a|none)$/i.test(rawAnswer);
    const isExplicitlyWrongOrIdk = /i don'?t know|no idea|wrong answer|not sure|dont know|wrong|bad answer/i.test(rawAnswer);
    const isSingleWord = wordCount <= 1;

    let score = 0;
    let feedback = "";

    if (!rawAnswer || isRepeatedChar || isCommonGibberish || isExplicitlyWrongOrIdk) {
      score = 0; // Strictly 0 points for wrong/gibberish/blank responses!
      feedback = "Incorrect or invalid response provided (Score: 0/100). In a technical interview, incorrect or blank answers receive 0 points. Ensure you study the underlying concepts and explain your logic.";
    } else if (isSingleWord || wordCount < 5) {
      score = 0;
      feedback = `Your response is far too brief (${wordCount} word${wordCount > 1 ? 's' : ''}) and fails to cover technical requirements (Score: 0/100). A ${difficulty}-level ${role} candidate must explain technical concepts in detail.`;
    } else {
      // Analyze technical keyword density
      let keywordHits = 0;
      currentRoleKeywords.forEach(kw => {
        if (lowerAnswer.includes(kw)) keywordHits++;
      });

      if (keywordHits === 0) {
        score = 0;
        feedback = "Response does not contain relevant technical concepts or keywords for a " + role + " role (Score: 0/100). Please provide specific technical details.";
      } else {
        const keywordScore = Math.min(60, keywordHits * 15);
        const lengthScore = Math.min(40, wordCount * 1.2);
        score = Math.min(95, Math.round(keywordScore + lengthScore));

        if (score >= 80) {
          feedback = "Excellent response! Clear technical terminology, good structure, and relevant architectural considerations.";
        } else if (score >= 60) {
          feedback = "Solid answer. Good understanding of the basic concepts. To improve, discuss quantitative metrics and edge cases.";
        } else {
          feedback = "Reasonable start, but needs more specific technical detail and concrete examples related to " + role + ".";
        }
      }
    }

    return {
      questionId: item.questionId || idx + 1,
      question: item.question,
      score,
      feedback,
    };
  });

  const totalScoreSum = evaluatedAnswers.reduce((sum, a) => sum + a.score, 0);
  const avgScore = Math.round(totalScoreSum / (evaluatedAnswers.length || 1));

  // Determine dynamic strengths, weaknesses, and improvements based on performance
  let overallFeedback = "";
  let strengths = [];
  let weaknesses = [];
  let improvements = [];

  if (avgScore < 30) {
    overallFeedback = `The candidate's responses for this ${difficulty} ${role} interview were largely incomplete, single-word, or non-responsive. Significant preparation is needed across core technical topics.`;
    strengths = ["Attempted the interview session"];
    weaknesses = ["Incomplete or non-responsive answers", "Missing essential technical explanations", "Lacks detailed problem-solving approach"];
    improvements = ["Review core fundamental concepts for " + role, "Practice answering using the STAR method (Situation, Task, Action, Result)", "Write comprehensive responses containing technical terminology and trade-offs"];
  } else if (avgScore < 65) {
    overallFeedback = `Fair attempt for a ${difficulty} ${role} role, but answers were brief or lacked technical depth. Focus on elaborating key concepts and explaining edge cases.`;
    strengths = ["Identified basic concepts", "Understood general question scope"];
    weaknesses = ["Answers lack detailed technical depth", "Limited discussion of trade-offs or performance", "Could expand more on real-world examples"];
    improvements = ["Elaborate on technical implementation details", "Incorporate role-specific keywords and code examples", "Discuss error handling and performance optimization"];
  } else {
    overallFeedback = `Strong performance for a ${difficulty} ${role} interview! Technical fundamentals are sound with clear explanations and structured answers.`;
    strengths = ["Clear use of relevant technical terminology", "Good structural flow and conceptual understanding", "Addressed question requirements effectively"];
    weaknesses = ["Can include more quantitative impact metrics", "Opportunity to cover advance edge case handling"];
    improvements = ["Mention real-world production metrics", "Detail architectural trade-offs in depth", "Practice whiteboard system design scenarios"];
  }

  return {
    score: avgScore,
    overallScore: avgScore,
    overallFeedback,
    strengths,
    weaknesses,
    improvements,
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
        model: "gemini-1.5-flash",
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

  const prompt = `You are an expert, highly strict technical interviewer evaluating a candidate's interview session for a ${role} position (${difficulty} level).

CRITICAL EVALUATION DIRECTIVES:
1. STRICT ACCURACY: If an answer is factually incorrect, wrong, off-topic, blank, gibberish (e.g. "asdf", "qwerty"), or single-word non-answers ("no", "yes", "idk"), YOU MUST AWARD EXACTLY 0 POINTS out of 100 for that question. Do NOT award any participation points for wrong or nonsensical answers.
2. If an answer is extremely brief (< 15 words) or superficial, cap the score at 10 to 30 points out of 100 ONLY if it is directionally correct. If it is factually wrong, award 0 points.
3. Award high scores (80-100) ONLY for well-explained, technically accurate responses containing proper architectural concepts, syntax, or trade-offs.
4. Calculate overallScore as the exact mathematical average of all question scores.

Questions & Answers:
${answersText}

Return ONLY valid JSON in this exact structure:
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
        model: "gemini-1.5-flash",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });

      const parsed = JSON.parse(response.text);
      const computedScore = typeof parsed.score === "number" ? parsed.score : (typeof parsed.overallScore === "number" ? parsed.overallScore : 0);
      return {
        ...parsed,
        score: computedScore,
        overallScore: computedScore,
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
        temperature: 0.3,
      });

      const parsed = JSON.parse(completion.choices[0].message.content);
      const computedScore = typeof parsed.score === "number" ? parsed.score : (typeof parsed.overallScore === "number" ? parsed.overallScore : 0);
      return {
        ...parsed,
        score: computedScore,
        overallScore: computedScore,
      };
    } catch (error) {
      console.error("OpenAI Evaluation Error:", error.message);
    }
  }

  // 3. Fallback
  console.log("Using local fallback evaluation generator (No API key configured).");
  return generateFallbackEvaluation(role, difficulty, answers);
}

function generateFallbackResumeAnalysis(resumeText, role = "Full Stack Developer") {
  const text = resumeText ? String(resumeText).trim() : "";
  const words = text.split(/\s+/).filter(Boolean);
  const wordCount = words.length;
  const lowerText = text.toLowerCase();

  // Tech skills dictionary scan
  const allTechSkills = [
    "React", "Node.js", "JavaScript", "TypeScript", "Express", "MongoDB", "SQL",
    "PostgreSQL", "HTML", "CSS", "TailwindCSS", "Redux", "REST API", "GraphQL",
    "Git", "Docker", "AWS", "Python", "Java", "C++", "Next.js", "Vue", "Angular"
  ];

  const detectedSkills = allTechSkills.filter(skill => 
    lowerText.includes(skill.toLowerCase())
  );

  // Section header detection
  const hasExp = /experience|work|employment|job|history/i.test(lowerText);
  const hasEdu = /education|university|degree|college|bachelor|master/i.test(lowerText);
  const hasProj = /projects|portfolio|built|applications/i.test(lowerText);
  const hasSkills = /skills|technologies|proficiencies|stack/i.test(lowerText);

  let atsScore = 0;
  let summary = "";
  let strengths = [];
  let improvements = [];

  if (wordCount < 30) {
    atsScore = Math.floor(10 + wordCount * 0.5);
    summary = "The uploaded resume contains very little text or details for a professional " + role + " role.";
    strengths = ["Resume file processed successfully"];
    improvements = [
      "Add comprehensive work experience and detailed project descriptions",
      "Include technical skills section relevant to " + role,
      "Expand on key responsibilities and measurable outcomes"
    ];
  } else {
    // Score based on word count, detected sections, and detected skills
    let baseScore = Math.min(50, Math.floor(wordCount / 6));
    let sectionBonus = (hasExp ? 12 : 0) + (hasEdu ? 10 : 0) + (hasProj ? 12 : 0) + (hasSkills ? 10 : 0);
    let skillBonus = Math.min(15, detectedSkills.length * 3);

    atsScore = Math.min(96, Math.max(25, baseScore + sectionBonus + skillBonus));

    summary = `Parsed resume with ${wordCount} words for the target position of ${role}. ${detectedSkills.length > 0 ? 'Detected ' + detectedSkills.length + ' key technical proficiencies.' : 'Few technical keywords detected.'}`;

    if (hasExp) strengths.push("Includes detailed work history section");
    if (hasProj) strengths.push("Highlights practical project implementations");
    if (detectedSkills.length >= 3) strengths.push("Good density of role-relevant technical keywords");
    if (strengths.length === 0) strengths.push("Basic resume layout structure");

    if (!hasExp) improvements.push("Add a dedicated Work Experience section");
    if (!hasProj) improvements.push("Include a Projects section demonstrating real-world applications");
    if (detectedSkills.length < 4) improvements.push("Incorporate more industry-standard technical keywords for " + role);
    improvements.push("Add measurable achievements (e.g., 'Improved load time by 35%')");
  }

  return {
    atsScore,
    summary,
    skills: detectedSkills.length > 0 ? detectedSkills : ["JavaScript", "HTML", "CSS"],
    strengths,
    improvements,
  };
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
  return generateFallbackResumeAnalysis(resumeText, role);
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
