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
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] selection:bg-sky-200/80">
      <Navbar />

      {/* HERO SECTION */}
      <section className="relative overflow-hidden pt-12 pb-20 lg:pt-20 lg:pb-28">
        <div className="glow-orb-amber -top-40 left-1/2 -translate-x-1/2 h-[420px] w-[760px] opacity-60" />
        <div className="glow-orb-cyan top-80 -right-10 h-[360px] w-[420px] opacity-50" />
        <div className="absolute inset-0 bg-grid-pattern opacity-20 pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <div className="inline-flex items-center justify-center">
              <Badge variant="glow" size="lg" dot icon={Sparkles}>
                Next-Gen AI Interview Coaching SaaS
              </Badge>
            </div>

            <h1 className="mt-8 text-4xl font-extrabold tracking-tight text-[#0F172A] sm:text-6xl lg:text-7xl leading-[1.05]">
              Turn interview nerves into <br className="hidden sm:inline" />
              <span className="gradient-text-ember">job-ready confidence.</span>
            </h1>

            <p className="mx-auto mt-7 max-w-2xl text-base sm:text-lg leading-relaxed text-[#334155]">
              Practice realistic mock interviews with adaptive AI, get instant actionable feedback, optimize your resume for ATS screening, and land the role you want faster.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link to="/register">
                <Button variant="glow" size="lg" className="w-full sm:w-auto px-8">
                  Start Practicing Free
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>

              <a href="#how-it-works">
                <Button variant="secondary" size="lg" className="w-full sm:w-auto px-7">
                  <Play className="h-4 w-4 fill-current" />
                  See How It Works
                </Button>
              </a>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-[#64748B]">
              <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <ShieldCheck className="h-4 w-4 text-emerald-500" /> No credit card required
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <Zap className="h-4 w-4 text-[#F97316]" /> Instant AI Feedback
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm">
                <Star className="h-4 w-4 text-[#F97316]" /> Trusted by 10,000+ candidates
              </span>
            </div>
          </div>

          <div className="relative mx-auto mt-16 max-w-5xl">
            <div className="rounded-[28px] border border-slate-200 bg-white p-1.5 shadow-[0_30px_80px_rgba(2,132,199,0.10)]">
              <div className="overflow-hidden rounded-[22px] border border-slate-200 bg-[#F8FAFC] backdrop-blur-2xl">
                <div className="flex h-12 items-center justify-between border-b border-slate-200 bg-white px-5">
                  <div className="flex items-center gap-2">
                    <span className="h-3 w-3 rounded-full bg-rose-400" />
                    <span className="h-3 w-3 rounded-full bg-orange-400" />
                    <span className="h-3 w-3 rounded-full bg-emerald-400" />
                    <span className="ml-3 text-xs font-mono text-slate-500">hireflux.ai/app/workspace</span>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setActiveTab("interview")}
                      className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                        activeTab === "interview" ? "bg-sky-100 text-sky-700 font-semibold" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      AI Interview Session
                    </button>
                    <button
                      onClick={() => setActiveTab("resume")}
                      className={`px-3 py-1 text-xs rounded-lg transition-colors ${
                        activeTab === "resume" ? "bg-orange-100 text-orange-700 font-semibold" : "text-slate-500 hover:text-slate-700"
                      }`}
                    >
                      ATS Resume Score
                    </button>
                  </div>
                </div>

                <div className="p-6 lg:p-8 min-h-[380px]">
                  {activeTab === "interview" ? (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#0284C7]">
                            <Brain className="h-5 w-5" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-[#0F172A] text-sm sm:text-base">Frontend Developer (React & TypeScript)</h4>
                            <p className="text-xs text-slate-500">Question 3 of 5 • Technical Depth: Hard</p>
                          </div>
                        </div>
                        <Badge variant="emerald" dot>Live Session Active</Badge>
                      </div>

                      <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                        <p className="text-xs font-semibold uppercase tracking-wider text-[#0284C7] mb-2">AI Interviewer Prompt</p>
                        <p className="text-sm text-[#334155] leading-relaxed font-medium">
                          "Explain how React 19 Concurrent rendering optimizes state updates and how you would prevent unnecessary re-renders in a complex data table component."
                        </p>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4">
                          <div className="flex items-center justify-between text-xs font-semibold text-emerald-700 mb-1">
                            <span>Score Projection</span>
                            <span>92%</span>
                          </div>
                          <p className="text-xs text-slate-600">Strong technical terminology and practical code architecture explanation.</p>
                        </div>
                        <div className="rounded-2xl border border-sky-200 bg-sky-50 p-4">
                          <div className="flex items-center justify-between text-xs font-semibold text-sky-700 mb-1">
                            <span>Communication Tone</span>
                            <span>Confident</span>
                          </div>
                          <p className="text-xs text-slate-600">Pacing is structured with clear STAR method responses.</p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                        <div>
                          <h4 className="font-semibold text-[#0F172A]">Senior Software Engineer Resume</h4>
                          <p className="text-xs text-slate-500">ATS Scan Result • Updated Today</p>
                        </div>
                        <Badge variant="glow">Overall Score: 88/100</Badge>
                      </div>

                      <div className="grid gap-4 sm:grid-cols-3">
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <p className="text-xs text-slate-500">ATS Compatibility</p>
                          <p className="text-2xl font-bold text-emerald-600 mt-1">94%</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <p className="text-xs text-slate-500">Detected Keywords</p>
                          <p className="text-2xl font-bold text-[#F97316] mt-1">18 Skills</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
                          <p className="text-xs text-slate-500">Format Structure</p>
                          <p className="text-2xl font-bold text-[#0284C7] mt-1">Optimal</p>
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

      <section className="border-y border-slate-200 bg-white/70 py-10">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <p className="text-xs font-semibold uppercase tracking-[3px] text-slate-500 mb-6">
            Empowering candidates preparing for top tech roles
          </p>
          <div className="flex flex-wrap items-center justify-center gap-8 text-[#334155] text-sm font-medium">
            <span className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-2 bg-white shadow-sm">
              <ShieldCheck className="h-4 w-4 text-emerald-500" /> 100% Private & Confidential
            </span>
            <span className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-2 bg-white shadow-sm">
              <Brain className="h-4 w-4 text-[#0284C7]" /> Powered by Advanced LLMs
            </span>
            <span className="flex items-center gap-2 border border-slate-200 rounded-full px-4 py-2 bg-white shadow-sm">
              <CheckCircle2 className="h-4 w-4 text-emerald-500" /> 24/7 Practice Access
            </span>
          </div>
        </div>
      </section>

      <section id="features" className="py-24 relative">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <Badge variant="purple" size="md">Complete Suite</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
              Everything you need for interview success.
            </h2>
            <p className="mt-4 text-base text-[#334155] leading-relaxed">
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
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-sky-100 text-[#0284C7] border border-sky-200">
                        <Icon className="h-6 w-6" />
                      </div>
                      <Badge variant="neutral" size="sm">{item.tag}</Badge>
                    </div>
                    <h3 className="mt-6 text-lg font-semibold text-[#0F172A]">{item.title}</h3>
                    <p className="mt-3 text-sm leading-relaxed text-[#334155]">
                      {item.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-slate-200 flex items-center text-xs font-semibold text-[#0284C7] group-hover:text-[#0369A1]">
                    <span>Explore feature</span>
                    <ChevronRight className="h-3.5 w-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      <section id="how-it-works" className="border-y border-slate-200 bg-sky-50/50 py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto">
            <Badge variant="cyan" size="md">Simple Workflow</Badge>
            <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
              From interview anxiety to job offer.
            </h2>
            <p className="mt-4 text-[#334155] text-sm sm:text-base">
              A 3-step structured practice routine designed to build muscle memory and response confidence.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3 relative">
            <Card variant="default" className="p-8 text-center relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#0284C7] to-sky-500 font-bold text-white text-xl shadow-lg shadow-sky-200">
                01
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#0F172A]">Customize Session</h3>
              <p className="mt-3 text-sm text-[#334155] leading-relaxed">
                Select target role (Frontend, React, Fullstack), difficulty level, and number of questions.
              </p>
            </Card>

            <Card variant="default" className="p-8 text-center relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#F97316] to-orange-500 font-bold text-white text-xl shadow-lg shadow-orange-200">
                02
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#0F172A]">Practice with AI</h3>
              <p className="mt-3 text-sm text-[#334155] leading-relaxed">
                Respond via text or voice recording to adaptive technical and behavioral prompts in real-time.
              </p>
            </Card>

            <Card variant="default" className="p-8 text-center relative">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-500 font-bold text-white text-xl shadow-lg shadow-emerald-200">
                03
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#0F172A]">Actionable Insights</h3>
              <p className="mt-3 text-sm text-[#334155] leading-relaxed">
                Receive detailed score breakdowns, identified strengths, model answers, and improvement guides.
              </p>
            </Card>
          </div>
        </div>
      </section>

      <section id="benefits" className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">
            <div>
              <Badge variant="purple" size="md">Built For Candidates</Badge>
              <h2 className="mt-4 text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
                Prepare smarter, articulate better, land higher offers.
              </h2>
              <p className="mt-4 text-[#334155] text-base leading-relaxed">
                Every tool in HireFlux is calibrated to replicate actual hiring bar requirements from tech leads and interviewers.
              </p>

              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600 mt-0.5 border border-emerald-200">
                      <Check className="h-3.5 w-3.5" />
                    </div>
                    <span className="text-xs sm:text-sm text-[#334155] font-medium">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            <Card variant="gradient" className="p-8">
              <div className="flex items-center justify-between border-b border-slate-200 pb-6">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Interview Readiness Score</p>
                  <p className="text-4xl font-extrabold text-[#0F172A] mt-1">86<span className="text-xl text-slate-500">/100</span></p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600 border border-emerald-200">
                  <BarChart3 className="h-7 w-7" />
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-[#334155]">Technical Communication</span>
                    <span className="text-emerald-600 font-semibold">92%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#0284C7] to-emerald-500 w-[92%]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-[#334155]">Problem Solving Depth</span>
                    <span className="text-[#F97316] font-semibold">88%</span>
                  </div>
                  <div className="h-2 rounded-full bg-slate-200 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-[#F97316] to-sky-500 w-[88%]" />
                  </div>
                </div>
              </div>

              <div className="mt-8 rounded-2xl bg-white p-4 border border-slate-200 text-xs text-[#334155] flex items-center justify-between shadow-sm">
                <span>Recommended focus: Behavioral STAR storytelling</span>
                <Link to="/interview/setup" className="font-semibold text-[#0284C7] hover:underline">
                  Practice now →
                </Link>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="px-6 pb-24 lg:px-8">
        <div className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl border border-sky-200 bg-gradient-to-r from-sky-100 via-white to-orange-100 px-6 py-16 text-center shadow-[0_25px_65px_rgba(2,132,199,0.10)] sm:px-12">
          <div className="glow-orb-amber -top-20 left-1/2 -translate-x-1/2 h-64 w-64 opacity-60" />
          <Sparkles className="mx-auto h-8 w-8 text-[#F97316] mb-4 animate-pulse" />

          <h2 className="text-3xl font-bold tracking-tight text-[#0F172A] sm:text-4xl">
            Ready to ace your next technical interview?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-[#334155]">
            Join thousands of candidates using HireFlux to practice mock interviews, analyze resumes, and enter interview rooms with ultimate confidence.
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
