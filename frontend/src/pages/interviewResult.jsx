import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  MessageSquareText,
  Target,
  TrendingUp,
  Trophy,
  XCircle,
  Loader2,
  Sparkles,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { evaluateInterview, getInterviewById } from "../services/interviewService";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";

function InterviewResult() {
  const location = useLocation();
  const navigate = useNavigate();

  const interview = location.state?.interview;
  const answers = location.state?.answers;
  const initialEvaluation = location.state?.evaluation;

  const [evaluation, setEvaluation] = useState(initialEvaluation || null);
  const [loading, setLoading] = useState(!initialEvaluation);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (evaluation) return;

    if (!interview || !answers) {
      setError("Interview data not found");
      setLoading(false);
      return;
    }

    const fetchEvaluation = async () => {
      try {
        setLoading(true);
        const result = await evaluateInterview(
          interview._id || interview.id,
          interview.role,
          answers
        );
        setEvaluation(result.evaluation);
        setError(null);
      } catch (err) {
        console.error("Evaluation error:", err);
        setError("Failed to evaluate interview. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvaluation();
  }, [interview, answers, evaluation]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030712] text-slate-100">
        <div className="text-center space-y-4">
          <Loader2 className="h-10 w-10 animate-spin text-violet-400 mx-auto" />
          <h2 className="text-xl font-bold text-white">AI Engine Evaluating Session...</h2>
          <p className="text-xs text-slate-400">Analyzing answer structures, key concepts, and technical accuracy.</p>
        </div>
      </main>
    );
  }

  if (error && !evaluation) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#030712] px-6 text-slate-100">
        <Card variant="default" className="p-8 text-center max-w-md">
          <h1 className="text-xl font-bold text-rose-400">{error}</h1>
          <p className="mt-2 text-xs text-slate-400">Please retry or start a new mock interview.</p>
          <div className="mt-6 flex gap-3 justify-center">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Retry
            </Button>
            <Link to="/interview/setup">
              <Button variant="glow">Start New Session</Button>
            </Link>
          </div>
        </Card>
      </main>
    );
  }

  const score = evaluation?.score || evaluation?.overallScore || 0;
  const overallFeedback = evaluation?.overallFeedback || "Great job completing your mock session!";
  const strengths = evaluation?.strengths || [];
  const weaknesses = evaluation?.weaknesses || [];
  const improvements = evaluation?.improvements || [];
  const questionFeedback = evaluation?.questionFeedback || evaluation?.answers || [];

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 pb-20">
      {/* HEADER */}
      <header className="border-b border-white/[0.08] bg-[#030712]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-indigo-600 font-bold text-white shadow-md shadow-violet-600/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">Evaluation Report</span>
          </div>

          <Badge variant="emerald" dot icon={Trophy}>
            Session Completed
          </Badge>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-6 py-12 lg:px-8 space-y-10">
        {/* HERO BANNER */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-400 border border-amber-500/20 mb-4">
            <Trophy className="h-8 w-8" />
          </div>
          <Badge variant="glow" size="md">Performance Evaluation</Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {score >= 80 ? "Outstanding Mock Session!" : "Session Completed!"}
          </h1>
          <p className="mt-2 text-sm text-slate-400 leading-relaxed">
            Here is your AI interviewer feedback report detailing answer scores, key strengths, weaknesses, and response improvements.
          </p>
        </div>

        {/* OVERALL SCORE CARD */}
        <Card variant="gradient" className="p-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Overall Readiness Score</p>
              <div className="mt-2 flex items-baseline gap-2">
                <span className="text-6xl font-extrabold text-white tracking-tight">{score}</span>
                <span className="text-xl text-slate-400">/ 100</span>
              </div>
              <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-400">
                <TrendingUp className="h-4 w-4" />
                <span>
                  {score >= 80
                    ? "Strong hiring bar performance"
                    : score >= 60
                    ? "Good foundation • Minor refinements needed"
                    : "Focus on technical depth & STAR structure"}
                </span>
              </div>
            </div>

            {/* CIRCULAR PROGRESS GAUGE */}
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full border-8 border-violet-500/20 bg-slate-950/60 shadow-xl">
              <div className="text-center">
                <span className="text-3xl font-extrabold text-white">{score}%</span>
                <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Readiness</p>
              </div>
            </div>
          </div>
        </Card>

        {/* STRENGTHS VS WEAKNESSES / IMPROVEMENTS */}
        <div className="grid gap-6 md:grid-cols-2">
          {/* STRENGTHS */}
          <Card variant="default" className="p-6 border-emerald-500/20 bg-emerald-500/[0.02]">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Key Strengths</h3>
                <p className="text-xs text-slate-400">What you articulated effectively</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {strengths.length > 0 ? (
                strengths.map((str) => (
                  <div key={str} className="flex items-start gap-3">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400 mt-0.5 shrink-0" />
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{str}</p>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-500">No major strengths recorded.</p>
              )}
            </div>
          </Card>

          {/* WEAKNESSES & IMPROVEMENTS */}
          <Card variant="default" className="p-6 border-amber-500/20 bg-amber-500/[0.02]">
            <div className="flex items-center gap-3 border-b border-white/10 pb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400 border border-amber-500/20">
                <Lightbulb className="h-5 w-5" />
              </div>
              <div>
                <h3 className="font-bold text-white text-base">Areas to Refine</h3>
                <p className="text-xs text-slate-400">Target these in next practice</p>
              </div>
            </div>
            <div className="mt-6 space-y-3">
              {(weaknesses.length > 0 ? weaknesses : improvements).map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <XCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* AI INTERVIEWER FEEDBACK NARRATIVE */}
        <Card variant="default" className="p-6 border-violet-500/20 bg-violet-500/[0.02]">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/15 text-violet-400 border border-violet-500/20">
              <MessageSquareText className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-white text-base">AI Interviewer Synthesis</h3>
              <p className="text-xs text-slate-400">Comprehensive interview evaluation narrative</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-slate-300 leading-relaxed">
            {overallFeedback}
          </p>
        </Card>

        {/* INDIVIDUAL ANSWER BREAKDOWN */}
        <div className="space-y-4">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/20">
              <Target className="h-4 w-4" />
            </div>
            <h3 className="text-lg font-bold text-white">Question-by-Question Score Breakdown</h3>
          </div>

          <div className="space-y-4">
            {questionFeedback.map((item, index) => (
              <Card key={item.questionId || index} variant="default" className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="text-xs font-semibold text-violet-400">Question {index + 1}</span>
                    <h4 className="mt-1 font-semibold text-white text-base">{item.question || `Question ${item.questionId}`}</h4>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-2xl font-bold text-violet-400">{item.score}</span>
                    <span className="text-xs text-slate-500"> / 100</span>
                  </div>
                </div>

                <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-xl border border-white/10">
                  {item.feedback}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 pt-6">
          <Link to="/interview/setup">
            <Button variant="glow" size="lg" className="w-full sm:w-auto">
              Try Another Mock Session
              <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="outline" size="lg" className="w-full sm:w-auto">
              Return to Dashboard
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}

export default InterviewResult;
