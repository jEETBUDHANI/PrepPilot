import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Mic,
  MicOff,
  Send,
  Sparkles,
  Volume2,
} from "lucide-react";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import { evaluateInterview } from "../services/interviewService";

function Interview() {
  const location = useLocation();
  const navigate = useNavigate();

  const interview = location.state?.interview;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answer, setAnswer] = useState("");
  const [answers, setAnswers] = useState([]);
  const [isFinishing, setIsFinishing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [recognitionInstance, setRecognitionInstance] = useState(null);

  if (!interview) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030712] px-6 text-slate-100">
        <Card variant="default" className="p-8 text-center max-w-md">
          <h1 className="text-xl font-bold text-white">Interview Session Not Found</h1>
          <p className="mt-2 text-xs text-slate-400">Please setup a new AI mock interview session.</p>
          <div className="mt-6">
            <Link to="/interview/setup">
              <Button variant="glow" size="md">
                Setup Interview
              </Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  const question = interview.questions[currentQuestion];
  const totalQuestions = interview.questions.length;
  const progress = ((currentQuestion + 1) / totalQuestions) * 100;

  // Text-to-Speech (Read Prompt Aloud)
  function handleReadPrompt() {
    if (!("speechSynthesis" in window)) {
      alert("Text-to-speech is not supported in this browser.");
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel(); // Stop any existing audio
    const utterance = new SpeechSynthesisUtterance(question.question);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.lang = "en-US";

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }

  // Voice Dictation (Speech-to-Text)
  function toggleRecording() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Voice recognition is not supported in this browser. Please type your answer directly.");
      return;
    }

    if (isRecording && recognitionInstance) {
      recognitionInstance.stop();
      setIsRecording(false);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = "en-US";

      const initialText = answer ? answer.trim() + " " : "";

      recognition.onstart = () => {
        setIsRecording(true);
      };

      recognition.onresult = (event) => {
        let finalTranscript = "";
        let interimTranscript = "";

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcriptChunk = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcriptChunk + " ";
          } else {
            interimTranscript += transcriptChunk;
          }
        }

        const combinedText = initialText + finalTranscript + interimTranscript;
        setAnswer(combinedText);
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error:", event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
      setRecognitionInstance(recognition);
    } catch (e) {
      console.error("Speech recognition startup error:", e);
      setIsRecording(false);
    }
  }

  function handleNext() {
    if (!answer.trim()) return;

    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }

    const newAnswer = {
      questionId: question.questionId || question.id || currentQuestion + 1,
      question: question.question,
      answer: answer.trim(),
    };

    setAnswers((previous) => [...previous, newAnswer]);
    setAnswer("");

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  }

  async function handleFinish() {
    if (!answer.trim()) return;

    const newAnswer = {
      questionId: question.questionId || question.id || currentQuestion + 1,
      question: question.question,
      answer: answer.trim(),
    };

    const finalAnswers = [...answers, newAnswer];
    setAnswers(finalAnswers);

    try {
      setIsFinishing(true);

      const result = await evaluateInterview(
        interview._id || interview.id,
        interview.role,
        finalAnswers
      );

      navigate("/interview/result", {
        state: {
          interview,
          answers: finalAnswers,
          evaluation: result.evaluation,
        },
      });
    } catch (error) {
      console.error("AI Evaluation error:", error);
      setIsFinishing(false);
      alert("Failed to evaluate interview. Proceeding to evaluation retry.");
      navigate("/interview/result", {
        state: {
          interview,
          answers: finalAnswers,
        },
      });
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex flex-col justify-between">
      {/* AI STUDIO HEADER */}
      <header className="border-b border-white/[0.08] bg-[#030712]/90 backdrop-blur-xl sticky top-0 z-30">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Exit Studio
          </Link>

          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 font-bold text-white shadow-md shadow-amber-600/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <div>
              <p className="text-sm font-bold text-white leading-tight">AI Studio Mode</p>
              <p className="text-[10px] text-slate-400 font-mono">{interview.role} • {interview.difficulty}</p>
            </div>
          </div>

          <Badge variant="emerald" dot icon={Clock}>
            Live Practice Session
          </Badge>
        </div>
      </header>

      {/* MAIN STUDIO WORKSPACE */}
      <div className="mx-auto max-w-4xl px-6 py-8 flex-1 w-full space-y-6">
        {/* PROGRESS BAR */}
        <div>
          <div className="flex items-center justify-between text-xs font-medium mb-2">
            <span className="text-slate-400">
              Question {currentQuestion + 1} of {totalQuestions}
            </span>
            <span className="text-amber-400 font-semibold">{Math.round(progress)}% Completed</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gradient-to-r from-amber-600 to-cyan-400 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* AI QUESTION PROMPT CARD */}
        <Card variant="gradient" className="p-6 sm:p-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/20 text-amber-400 border border-amber-500/20">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-amber-400">AI Interviewer</p>
                <p className="text-[10px] text-slate-400">Technical Depth Question</p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleReadPrompt}
              className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-xs font-medium transition-all ${
                isSpeaking
                  ? "border-amber-500/60 bg-amber-500/20 text-amber-300 animate-pulse"
                  : "border-white/10 bg-white/5 text-slate-300 hover:text-white hover:border-white/20"
              }`}
            >
              <Volume2 className={`h-3.5 w-3.5 ${isSpeaking ? "text-amber-400 animate-bounce" : ""}`} />
              <span>{isSpeaking ? "Speaking..." : "Read Prompt"}</span>
            </button>
          </div>

          <h1 className="mt-6 text-xl sm:text-2xl font-bold text-white leading-relaxed">
            {question.question}
          </h1>
        </Card>

        {/* ANSWER INPUT SECTION */}
        <Card variant="default" className="p-6">
          <div className="flex items-center justify-between mb-3">
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-400">
              Your Technical Response
            </label>
            <span className="text-xs text-slate-500 font-mono">
              {answer.length} characters
            </span>
          </div>

          <textarea
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Type your structured answer here... Be clear, specific, and mention code architecture principles where applicable."
            rows={8}
            className="w-full resize-none rounded-xl border border-white/10 bg-slate-950/60 p-4 text-sm leading-relaxed text-slate-100 placeholder:text-slate-600 outline-none backdrop-blur-md transition-all focus:border-amber-500/80 focus:ring-4 focus:ring-amber-500/10"
          />

          <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <Button
              type="button"
              variant={isRecording ? "destructive" : "secondary"}
              size="md"
              onClick={toggleRecording}
              className="w-full sm:w-auto"
            >
              {isRecording ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
              {isRecording ? "Recording... (Click to stop)" : "Voice Dictation"}
            </Button>

            {currentQuestion === totalQuestions - 1 ? (
              <Button
                type="button"
                variant="glow"
                size="md"
                onClick={handleFinish}
                disabled={!answer.trim() || isFinishing}
                isLoading={isFinishing}
                className="w-full sm:w-auto"
              >
                <Send className="h-4 w-4" />
                {isFinishing ? "AI is evaluating..." : "Finish Interview"}
              </Button>
            ) : (
              <Button
                type="button"
                variant="glow"
                size="md"
                onClick={handleNext}
                disabled={!answer.trim()}
                className="w-full sm:w-auto"
              >
                Next Question
                <ArrowRight className="h-4 w-4" />
              </Button>
            )}
          </div>
        </Card>

        {/* QUESTION DOT NAVIGATION */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          {interview.questions.map((item, index) => {
            const answered = answers.some(
              (answerItem) => answerItem.questionId === (item.questionId || item.id || index + 1)
            );
            const active = index === currentQuestion;

            return (
              <div
                key={item._id || item.questionId || item.id || index}
                className={`flex h-9 w-9 items-center justify-center rounded-xl text-xs font-semibold transition-all ${
                  active
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-600/30 ring-2 ring-amber-400"
                    : answered
                    ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400"
                    : "bg-white/5 border border-white/10 text-slate-500"
                }`}
              >
                {answered ? <CheckCircle2 className="h-4 w-4" /> : index + 1}
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}

export default Interview;
