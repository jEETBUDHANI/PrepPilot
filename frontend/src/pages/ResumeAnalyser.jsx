import { useState } from "react";
import {
  Upload,
  FileText,
  X,
  Sparkles,
  Briefcase,
  Lightbulb,
  TrendingUp,
  ArrowRight,
  Loader2,
  ArrowLeft,
  CheckCircle2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    setFile(selectedFile);
    setAnalyzed(false);
  }

  function removeFile() {
    setFile(null);
    setAnalyzed(false);
  }

  function analyzeResume() {
    if (!file) return;
    setAnalyzing(true);

    setTimeout(() => {
      setAnalyzing(false);
      setAnalyzed(true);
    }, 1600);
  }

  const skills = [
    "React 19",
    "JavaScript ES6+",
    "TypeScript",
    "Tailwind CSS",
    "REST API",
    "Redux Toolkit",
    "Vite",
    "Git & GitHub",
  ];

  const suggestions = [
    {
      title: "Quantify Project Impact",
      description: "Include specific metric percentages and performance numbers (e.g. 'Improved initial load time by 35%').",
    },
    {
      title: "Technical STAR Descriptions",
      description: "Structure bullet points by stating problem context, architecture approach, and concrete developer outcomes.",
    },
    {
      title: "Role Keyword Alignment",
      description: "Incorporate targeted ATS keywords matching senior frontend engineer job specs to pass screening filters.",
    },
  ];

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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-cyan-500 font-bold text-white shadow-md">
              <FileText className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">Resume ATS Scanner</span>
          </div>

          <Badge variant="cyan" dot icon={Sparkles}>
            AI Resume Intelligence
          </Badge>
        </div>
      </header>

      {/* CONTENT WORKSPACE */}
      <div className="mx-auto max-w-5xl px-6 py-12 lg:px-8 space-y-10">
        {/* PAGE TITLE */}
        <div className="max-w-2xl">
          <Badge variant="purple" size="md">ATS Optimizer</Badge>
          <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Optimize your resume for recruiters & ATS.
          </h1>
          <p className="mt-3 text-sm text-slate-400 leading-relaxed">
            Upload your resume document (PDF, DOCX) to get instant artificial intelligence feedback on ATS compatibility, keyword density, and technical achievements.
          </p>
        </div>

        {/* UPLOAD ZONE */}
        {!analyzed && (
          <section className="mt-8">
            {!file ? (
              <label className="group flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/15 bg-slate-900/40 p-10 text-center transition-all hover:border-violet-500/50 hover:bg-slate-900/80 backdrop-blur-xl">
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/15 text-violet-400 border border-violet-500/20 transition-transform group-hover:scale-110">
                  <Upload className="h-8 w-8" />
                </div>

                <h2 className="mt-6 text-lg font-bold text-white">Upload your resume file</h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-sm">
                  Drag and drop PDF or DOCX file here or click to browse from device.
                </p>

                <div className="mt-6">
                  <Button variant="glow" size="md" className="pointer-events-none">
                    Select Resume File
                  </Button>
                </div>
              </label>
            ) : (
              <Card variant="default" className="p-8">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-400 border border-rose-500/20">
                      <FileText className="h-7 w-7" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-base">{file.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{(file.size / 1024 / 1024).toFixed(2)} MB • Ready for AI scan</p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={removeFile}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                <div className="mt-8 border-t border-white/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-400">Our parser will evaluate skills, keyword density, and bullet formatting.</p>
                  <Button
                    variant="glow"
                    size="lg"
                    onClick={analyzeResume}
                    isLoading={analyzing}
                    className="w-full sm:w-auto"
                  >
                    <Sparkles className="h-4 w-4" />
                    Start ATS Scan
                  </Button>
                </div>
              </Card>
            )}
          </section>
        )}

        {/* ANALYSIS RESULTS */}
        {analyzed && (
          <section className="space-y-8">
            {/* SCORE + SUMMARY */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card variant="gradient" className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">ATS Score</span>
                    <Badge variant="emerald" size="sm" dot>Passed</Badge>
                  </div>
                  <div className="mt-6 text-center">
                    <span className="text-6xl font-extrabold text-white">84</span>
                    <span className="text-xl text-slate-400"> / 100</span>
                    <p className="mt-2 text-xs font-semibold text-emerald-400">High Keyword Match</p>
                  </div>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-400 w-[84%]" />
                </div>
              </Card>

              <Card variant="default" className="lg:col-span-2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
                    <Sparkles className="h-5 w-5 text-violet-400" />
                    <h3 className="font-bold text-white text-base">AI Executive Analysis</h3>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Your resume exhibits a clean hierarchy and highlights essential modern frontend frameworks. Technical skill categorization is clear for ATS parsing systems.
                    <br /><br />
                    To maximize callback rates for senior roles, enhance project bullet points with concrete metrics andSTAR-formatted architectural outcomes.
                  </p>
                </div>
              </Card>
            </div>

            {/* DETECTED SKILLS */}
            <Card variant="default" className="p-6">
              <h3 className="font-bold text-white text-base mb-4">Detected Technical Skills</h3>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge key={skill} variant="purple" size="md">
                    {skill}
                  </Badge>
                ))}
              </div>
            </Card>

            {/* SUGGESTIONS GRID */}
            <div className="space-y-4">
              <h3 className="font-bold text-white text-base">Prioritized ATS Improvements</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {suggestions.map((item, idx) => (
                  <Card key={item.title} variant="default" className="p-5 flex flex-col justify-between">
                    <div>
                      <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/20">
                        {idx + 1}
                      </span>
                      <h4 className="mt-4 font-semibold text-white text-sm">{item.title}</h4>
                      <p className="mt-2 text-xs text-slate-400 leading-relaxed">{item.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>

            {/* ACTIONS */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4">
              <Button
                variant="outline"
                size="lg"
                onClick={() => {
                  setFile(null);
                  setAnalyzed(false);
                }}
              >
                Scan Another Resume
              </Button>
              <Link to="/interview/setup">
                <Button variant="glow" size="lg">
                  Practice Tailored Mock Session
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}

export default ResumeAnalyzer;
