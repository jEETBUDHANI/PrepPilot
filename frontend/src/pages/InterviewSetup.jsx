import { useState } from "react";
import {
  Briefcase,
  Gauge,
  UserCheck,
  Hash,
  ArrowRight,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import Container from "../components/common/Container";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import { createInterview } from "../services/interviewService";

function InterviewSetup() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const [settings, setSettings] = useState({
    role: "Frontend Developer",
    difficulty: "Medium",
    experience: "Fresher",
    questions: 5,
  });

  const roles = [
    { title: "Frontend Developer", desc: "React, JavaScript, HTML/CSS & Web Performance" },
    { title: "React Developer", desc: "Hooks, State Management, Architecture & Fiber" },
    { title: "Full Stack Developer", desc: "Frontend + Node.js, REST API & Databases" },
    { title: "JavaScript Developer", desc: "Async JS, ES6+, Prototypes & Engines" },
  ];

  const difficulties = [
    { title: "Easy", color: "emerald", desc: "Fundamentals & Concept definitions" },
    { title: "Medium", color: "amber", desc: "Practical scenarios & state patterns" },
    { title: "Hard", color: "rose", desc: "System design, edge cases & optimization" },
  ];

  const experiences = ["Fresher", "1-2 Years", "3-5 Years", "5+ Years"];
  const questionCounts = [3, 5, 10];

  function handleChange(field, value) {
    setSettings((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function startInterview() {
    setIsLoading(true);
    try {
      const data = await createInterview({
        role: settings.role,
        difficulty: settings.difficulty,
        questionCount: settings.questions,
      });
      navigate(`/interview/${data.interview.id}`, {
        state: {
          interview: data.interview,
        },
      });
    } catch (error) {
      console.error("Failed to start interview:", error);
      alert("Failed to start interview. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 relative overflow-hidden pb-20">
      {/* Background Orbs */}
      <div className="glow-orb-amber top-0 left-1/2 -translate-x-1/2 h-96 w-96 opacity-25 pointer-events-none" />

      {/* HEADER */}
      <header className="border-b border-white/[0.08] bg-[#030712]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-6xl items-center justify-between px-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workspace
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 font-bold text-white shadow-md shadow-amber-600/30">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">Interview Simulator Setup</span>
          </div>

          <Badge variant="purple" size="sm" icon={Sparkles}>
            AI Powered
          </Badge>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* TITLE */}
        <div className="text-center max-w-xl mx-auto">
          <Badge variant="glow" size="md">Custom Mock Engine</Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Customize your AI interview
          </h1>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Configure your domain target, challenge depth, and session length. Our AI engine will synthesize realistic technical questions.
          </p>
        </div>

        {/* SETUP FORM GRID */}
        <div className="mt-12 space-y-8">
          {/* ROLE SELECTOR */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/20">
                <Briefcase className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-white">1. Select Target Job Role</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              {roles.map((r) => {
                const isSelected = settings.role === r.title;
                return (
                  <div
                    key={r.title}
                    onClick={() => handleChange("role", r.title)}
                    className={`cursor-pointer rounded-2xl border p-4 backdrop-blur-xl transition-all ${
                      isSelected
                        ? "border-amber-500/60 bg-amber-600/15 shadow-lg shadow-amber-600/15"
                        : "border-white/[0.08] bg-slate-900/50 hover:border-white/20 hover:bg-slate-900/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-sm text-white">{r.title}</p>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-amber-400" />}
                    </div>
                    <p className="mt-1.5 text-xs text-slate-400">{r.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* DIFFICULTY SELECTOR */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-cyan-600/20 text-cyan-400 border border-cyan-500/20">
                <Gauge className="h-4 w-4" />
              </div>
              <h2 className="text-base font-bold text-white">2. Choose Challenge Difficulty</h2>
            </div>

            <div className="grid gap-3 sm:grid-cols-3">
              {difficulties.map((d) => {
                const isSelected = settings.difficulty === d.title;
                return (
                  <div
                    key={d.title}
                    onClick={() => handleChange("difficulty", d.title)}
                    className={`cursor-pointer rounded-2xl border p-4 backdrop-blur-xl transition-all ${
                      isSelected
                        ? "border-amber-500/60 bg-amber-600/15 shadow-lg shadow-amber-600/15"
                        : "border-white/[0.08] bg-slate-900/50 hover:border-white/20 hover:bg-slate-900/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-white">{d.title}</span>
                      {isSelected && <CheckCircle2 className="h-4 w-4 text-amber-400" />}
                    </div>
                    <p className="mt-1.5 text-xs text-slate-400">{d.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* EXPERIENCE & QUESTION COUNT */}
          <div className="grid gap-8 sm:grid-cols-2">
            {/* EXPERIENCE */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600/20 text-emerald-400 border border-emerald-500/20">
                  <UserCheck className="h-4 w-4" />
                </div>
                <h2 className="text-base font-bold text-white">3. Experience Level</h2>
              </div>

              <div className="grid grid-cols-2 gap-2.5">
                {experiences.map((exp) => {
                  const isSelected = settings.experience === exp;
                  return (
                    <button
                      key={exp}
                      type="button"
                      onClick={() => handleChange("experience", exp)}
                      className={`rounded-xl border py-2.5 px-3 text-xs font-semibold transition-all ${
                        isSelected
                          ? "border-amber-500/60 bg-amber-600/20 text-white"
                          : "border-white/[0.08] bg-slate-900/50 text-slate-400 hover:text-white"
                      }`}
                    >
                      {exp}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* QUESTIONS */}
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-600/20 text-amber-400 border border-amber-500/20">
                  <Hash className="h-4 w-4" />
                </div>
                <h2 className="text-base font-bold text-white">4. Number of Questions</h2>
              </div>

              <div className="grid grid-cols-3 gap-2.5">
                {questionCounts.map((qc) => {
                  const isSelected = settings.questions === qc;
                  return (
                    <button
                      key={qc}
                      type="button"
                      onClick={() => handleChange("questions", qc)}
                      className={`rounded-xl border py-2.5 px-3 text-xs font-semibold transition-all ${
                        isSelected
                          ? "border-amber-500/60 bg-amber-600/20 text-white"
                          : "border-white/[0.08] bg-slate-900/50 text-slate-400 hover:text-white"
                      }`}
                    >
                      {qc} Questions
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* START ACTION */}
        <div className="mt-12 flex justify-center">
          <Button
            variant="glow"
            size="lg"
            onClick={startInterview}
            isLoading={isLoading}
            className="px-10"
          >
            Start AI Interview Session
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </main>
  );
}

export default InterviewSetup;
