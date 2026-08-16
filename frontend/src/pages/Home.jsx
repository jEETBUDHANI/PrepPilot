import { useState } from "react";
import {
  ArrowRight,
  Check,
  Play,
  Sparkles,
  Brain,
  BarChart3,
  FileText,
  Mic,
  ShieldCheck,
  ChevronRight,
  Award,
  Zap,
  Target,
  Clock,
  Star,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import Card, { CardBody } from "../components/common/Card";
import Badge from "../components/common/Badge";

function Home() {
  const [activeTab, setActiveTab] = useState("interview");

  const features = [
    {
      icon: Brain,
      title: "AI Mock Interviews",
      description: "Experience hyper-realistic technical & behavioral sessions with an adaptive AI interviewer.",
      tag: "Core Engine",
      color: "violet",
    },
    {
      icon: FileText,
      title: "Resume ATS Analyzer",
      description: "Analyze your resume structure, keyword gaps, and get instant ATS compatibility scores.",
      tag: "Smart Review",
      color: "cyan",
    },
    {
      icon: BarChart3,
      title: "Performance Analytics",
      description: "Track score trends, skill matrix improvements, and readiness metrics across interviews.",
      tag: "Analytics",
      color: "emerald",
    },
    {
      icon: Mic,
      title: "Real-time Feedback",
      description: "Get detailed critiques on answer structure, technical depth, and communication tone.",
      tag: "Voice & Text",
      color: "amber",
    },
  ];

  const benefits = [
    "Personalized interview questions based on role & depth",
    "Instant line-by-line feedback and model answer hints",
    "Comprehensive ATS resume scoring & keyword suggestion",
    "Detailed session history with audio and text transcripts",
    "Interactive readiness score gauge and progress charts",
    "Practice technical, behavioral, and system design topics",
  ];

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 selection:bg-violet-500/30">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-32">
        {/* Glow Effects */}
        <div className="glow-orb-violet -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] opacity-60" />
        <div className="glow-orb-cyan top-96 -right-40 h-[400px] w-[500px] opacity-40" />

        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            {/* BADGE */}
            <div className="inline-flex items-center justify-center">
              <Badge variant="glow" size="lg" dot icon={Sparkles}>
                Next-Gen AI Interview Coaching SaaS
              </Badge>
            </div>

            {/* MAIN HEADLINE */}
            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-white sm:text-6xl lg:text-7xl leading-[1.1]">
              Turn interview anxiety into <br className="hidden sm:inline" />
              <span className="gradient-text-purple">interview confidence.</span>
            </h1>

            {/* SUBTITLE */}
            <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-400">
              Practice realistic mock interviews with adaptive AI, receive instant actionable feedback, optimize your resume for ATS screening, and land your dream offer.
            </p>

            {/* CTAS */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/register">
                <Button variant="glow" size="lg" className="w-full sm:w-auto px-8">
                  Start Practicing Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <a href="#how-it-works">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-7">
                  <Play className="h-4 w-4 fill-white" />
                  See How It Works
                </Button>
              </a>
            </div>

            {/* MICRO BADGES */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5">
                <Zap className="h-4 w-4 text-violet-400" /> Instant AI Feedback
              </span>
              <span className="flex items-center gap-1.5">
                <Star className="h-4 w-4 text-amber-400" /> Trusted by 10,000+ candidates
              </span>
            </div>
          </div>

          {/* DYNAMIC PRODUCT PREVIEW CARD */}
          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="glow-border rounded-3xl p-1 bg-gradient-to-b from-white/15 to-white/0 shadow-2xl shadow-violet-950/40">
              <div className="overflow-hidden rounded-[22px] border border-white/10 bg-[#080d1a] backdrop-blur-2xl">
                {/* WINDOW HEADER */}
                <div className="flex h-12 items-center justify-between border-b border-white/[0.08] bg-slate-950/80 px-5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-500/80" />
                    <span className="h-3 w-3 rounded-full bg-amber-500/80" />
                    <span className="h-3 w-3 rounded-full bg-emerald-500/80" />
                    <span className="ml-3 text-xs font-mono text-slate-500">preppilot.ai/app/workspace</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("interview")}
                      className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                        activeTab === "interview" ? "bg-violet-600/30 text-violet-300 font-semibold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      AI Interview Session
                    </button>
                    <button
                      onClick={() => setActiveTab("resume")}
                      className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                        activeTab === "resume" ? "bg-violet-600/30 text-violet-300 font-semibold" : "text-slate-400 hover:text-white"
                      }`}
                    >
                      ATS Resume Score
                    </button>
                  </div>
                </div>

                {/* PREVIEW CONTENT */}
                <div className="p-6 lg:p-8 min-h-[380px]">
                  {activeTab === "interview" ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600/20 text-violet-400">
                            <Brain className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white text-sm sm:text-base">Frontend Developer (React & TypeScript)</h4>
                            <p className="text-xs text-slate-400">Question 3 of 5 • Technical Depth: Hard</p>
                          </div>
                        </div>
                        <Badge variant="emerald" dot>Live Session Active</Badge>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-violet-400 mb-2">AI Interviewer Prompt</p>
                        <p className="text-sm text-slate-200 leading-relaxed font-medium">
                          "Explain how React 19 Concurrent rendering optimizes state updates and how you would prevent unnecessary re-renders in a complex data table component."
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-4">
                          <div className="flex items-center justify-between text-xs font-semibold text-emerald-400 mb-1">
                            <span>Score Projection</span>
                            <span>92%</span>
                          </div>
                          <p className="text-xs text-slate-400">Strong technical terminology and practical code architecture explanation.</p>
                        </div>
                        <div className="rounded-2xl border border-cyan-500/20 bg-cyan-500/5 p-4">
                          <div className="flex items-center justify-between text-xs font-semibold text-cyan-400 mb-1">
                            <span>Communication Tone</span>
                            <span>Confident</span>
                          </div>
                          <p className="text-xs text-slate-400">Pacing is structured with clear STAR method responses.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-white/10 pb-4">
                        <div>
                          <h4 className="font-semibold text-white">Senior Software Engineer Resume</h4>
                          <p className="text-xs text-slate-400">ATS Scan Result • Updated Today</p>
                        </div>
                        <Badge variant="glow">Overall Score: 88/100</Badge>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs text-slate-400">ATS Compatibility</p>
                          <p className="text-2xl font-bold text-emerald-400 mt-1">94%</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs text-slate-400">Detected Keywords</p>
                          <p className="text-2xl font-bold text-violet-400 mt-1">18 Skills</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <p className="text-xs text-slate-400">Format Structure</p>
                          <p className="text-2xl font-bold text-cyan-400 mt-1">Optimal</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BANNER */}
      <section className="border-y border-white/[0.08] bg-white/[0.01] py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-slate-500 mb-6">
            Empowering candidates preparing for top tech roles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-slate-400 text-sm font-medium">
            <span className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 bg-white/5">
              <ShieldCheck className="h-4 w-4 text-violet-400" /> 100% Private & Confidential
            </span>
            <span className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 bg-white/5">
              <Brain className="h-4 w-4 text-cyan-400" /> Powered by Advanced LLMs
            </span>
            <span className="flex items-center gap-2 border border-white/10 rounded-full px-4 py-2 bg-white/5">
              <CheckCircle2 className="h-4 w-4 text-emerald-400" /> 24/7 Practice Access
            </span>
          </div>
        </div>
      </section>

      {/* FEATURES GRID SECTION */}
      <section id="features" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="purple" size="md">Complete Suite</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Everything you need for interview success.
            </h2>
            <p className="mt-4 text-base text-slate-400 leading-relaxed">
              Stop guessing what interviewers want. Practice with precise AI simulation and analyze performance metrics in one workspace.
            </p>
          </div>

          <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {features.map((item) => {
              const Icon = item.icon;
              return (
                <Card key={item.title} variant="interactive" className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/15 text-violet-400 border border-violet-500/20">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="neutral" size="sm">{item.tag}</Badge>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-slate-400">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center text-xs font-semibold text-violet-400 group-hover:text-violet-300">
                    <span>Explore feature</span>
                    <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS SECTION */}
      <section id="how-it-works" className="border-y border-white/[0.08] bg-slate-950/40 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="cyan" size="md">Simple Workflow</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              From interview anxiety to job offer.
            </h2>
            <p className="mt-4 text-slate-400 text-sm sm:text-base">
              A 3-step structured practice routine designed to build muscle memory and response confidence.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
            <Card variant="default" className="p-8 text-center relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-indigo-600 font-bold text-white text-xl shadow-lg shadow-violet-600/30">
                01
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Customize Session</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Select target role (Frontend, React, Fullstack), difficulty level, and number of questions.
              </p>
            </Card>

            <Card variant="default" className="p-8 text-center relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-600 to-blue-600 font-bold text-white text-xl shadow-lg shadow-cyan-600/30">
                02
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Practice with AI</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Respond via text or voice recording to adaptive technical and behavioral prompts in real-time.
              </p>
            </Card>

            <Card variant="default" className="p-8 text-center relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-600 to-teal-600 font-bold text-white text-xl shadow-lg shadow-emerald-600/30">
                03
              </div>
              <h3 className="mt-6 text-xl font-semibold text-white">Actionable Insights</h3>
              <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                Receive detailed score breakdowns, identified strengths, model answers, and improvement guides.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* BENEFITS SECTION */}
      <section id="benefits" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <Badge variant="purple" size="md">Built For Candidates</Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Prepare smarter, articulate better, land higher offers.
              </h2>
              <p className="mt-4 text-slate-400 text-base leading-relaxed">
                Every tool in PrepPilot is calibrated to replicate actual hiring bar requirements from tech leads and interviewers.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 mt-0.5 border border-emerald-500/20">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-slate-300 font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* INTERACTIVE READINESS SIMULATOR CARD */}
            <Card variant="gradient" className="p-8">
              <div className="flex items-center justify-between border-b border-white/10 pb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Interview Readiness Score</p>
                  <p className="text-4xl font-extrabold text-white mt-1">86<span className="text-xl text-slate-500">/100</span></p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  <BarChart3 className="h-7 w-7" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-slate-300">Technical Communication</span>
                    <span className="text-emerald-400 font-semibold">92%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-400 w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-slate-300">Problem Solving Depth</span>
                    <span className="text-violet-400 font-semibold">88%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-400 w-[88%]" />
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-slate-900/80 p-4 border border-white/10 text-xs text-slate-300 flex items-center justify-between">
                <span>Recommended focus: Behavioral STAR storytelling</span>
                <Link to="/interview/setup" className="font-semibold text-violet-400 hover:underline">
                  Practice now →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section className="px-6 pb-24 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-violet-500/30 bg-gradient-to-r from-violet-950/60 via-slate-900/90 to-cyan-950/60 px-6 py-16 text-center shadow-2xl backdrop-blur-2xl sm:px-12">
          <div className="glow-orb-violet -top-20 left-1/2 -translate-x-1/2 h-64 w-64 opacity-50" />
          <Sparkles className="mx-auto h-8 w-8 text-violet-400 mb-4 animate-pulse" />

          <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
            Ready to ace your next technical interview?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-slate-300">
            Join thousands of candidates using PrepPilot to practice mock interviews, analyze resumes, and enter interview rooms with ultimate confidence.
          </p>

          <div className="mt-8 flex justify-center">
            <Link to="/register">
              <Button variant="glow" size="lg" className="px-8">
                Create Your Free Account
                <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

export default Home;
