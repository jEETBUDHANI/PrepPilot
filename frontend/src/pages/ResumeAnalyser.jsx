import { useState, useEffect } from "react";
import {
  Upload,
  FileText,
  X,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import { analyzeResume as analyzeResumeService, getLatestResume } from "../services/resumeService";

function ResumeAnalyzer() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [analyzed, setAnalyzed] = useState(false);
  const [analysis, setAnalysis] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadLatestResume() {
      try {
        const data = await getLatestResume();
        if (data.success && data.resume) {
          setAnalysis(data.resume);
          setAnalyzed(true);
        }
      } catch (err) {
        console.error("Failed to load latest resume:", err);
      }
    }
    loadLatestResume();
  }, []);

  function handleFileChange(event) {
    const selectedFile = event.target.files[0];
    if (!selectedFile) return;
    if (selectedFile.type !== "application/pdf") {
      setError("Only PDF files are supported");
      return;
    }
    setError("");
    setFile(selectedFile);
    setAnalyzed(false);
  }

  function removeFile() {
    setFile(null);
    setAnalyzed(false);
    setError("");
  }

  async function handleAnalyzeResume() {
    if (!file) return;

    try {
      setAnalyzing(true);
      setError("");
      const data = await analyzeResumeService(file);
      setAnalysis(data.resume);
      setAnalyzed(true);
    } catch (err) {
      console.error(err);
      setError(err.message || "Resume analysis failed");
    } finally {
      setAnalyzing(false);
    }
  }

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
            Upload your resume PDF to extract text and receive AI analysis on ATS compatibility, skills, strengths, and targeted improvements.
          </p>
        </div>

        {error && (
          <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-xs text-rose-300">
            {error}
          </div>
        )}

        {/* UPLOAD ZONE */}
        {!analyzed && (
          <section className="mt-8">
            {!file ? (
              <label className="group flex min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed border-white/15 bg-slate-900/40 p-10 text-center transition-all hover:border-violet-500/50 hover:bg-slate-900/80 backdrop-blur-xl">
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />

                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-600/15 text-violet-400 border border-violet-500/20 transition-transform group-hover:scale-110">
                  <Upload className="h-8 w-8" />
                </div>

                <h2 className="mt-6 text-lg font-bold text-white">Upload your resume PDF</h2>
                <p className="mt-2 text-xs sm:text-sm text-slate-400 max-w-sm">
                  Drag and drop PDF file here or click to browse from device (max 5MB).
                </p>

                <div className="mt-6">
                  <Button variant="glow" size="md" className="pointer-events-none">
                    Select PDF Resume
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
                  <p className="text-xs text-slate-400">PDF text will be parsed by backend AI for ATS analysis.</p>
                  <Button
                    variant="glow"
                    size="lg"
                    onClick={handleAnalyzeResume}
                    isLoading={analyzing}
                    disabled={analyzing}
                    className="w-full sm:w-auto"
                  >
                    <Sparkles className="h-4 w-4" />
                    Analyze Resume
                  </Button>
                </div>
              </Card>
            )}
          </section>
        )}

        {/* ANALYSIS RESULTS */}
        {analyzed && analysis && (
          <section className="space-y-8">
            {/* SCORE + SUMMARY */}
            <div className="grid gap-6 lg:grid-cols-3">
              <Card variant="gradient" className="p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">ATS Score</span>
                    <Badge variant="emerald" size="sm" dot>Evaluated</Badge>
                  </div>
                  <div className="mt-6 text-center">
                    <span className="text-6xl font-extrabold text-white">{analysis.atsScore}</span>
                    <span className="text-xl text-slate-400"> / 100</span>
                    <p className="mt-2 text-xs font-semibold text-emerald-400">ATS Match</p>
                  </div>
                </div>

                <div className="mt-6 h-2 overflow-hidden rounded-full bg-white/10">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-400"
                    style={{ width: `${analysis.atsScore}%` }}
                  />
                </div>
              </Card>

              <Card variant="default" className="lg:col-span-2 p-6 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2.5 border-b border-white/10 pb-4">
                    <Sparkles className="h-5 w-5 text-violet-400" />
                    <h3 className="font-bold text-white text-base">AI Executive Summary</h3>
                  </div>
                  <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">
                    {analysis.summary}
                  </p>
                </div>
              </Card>
            </div>

            {/* DETECTED SKILLS */}
            {analysis.skills && analysis.skills.length > 0 && (
              <Card variant="default" className="p-6">
                <h3 className="font-bold text-white text-base mb-4">Detected Technical Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {analysis.skills.map((skill) => (
                    <Badge key={skill} variant="purple" size="md">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </Card>
            )}

            {/* STRENGTHS */}
            {analysis.strengths && analysis.strengths.length > 0 && (
              <Card variant="default" className="p-6">
                <h3 className="font-bold text-emerald-400 text-base mb-3">Resume Strengths</h3>
                <ul className="list-disc list-inside space-y-1.5 text-xs sm:text-sm text-slate-300">
                  {analysis.strengths.map((str, idx) => (
                    <li key={idx}>{str}</li>
                  ))}
                </ul>
              </Card>
            )}

            {/* SUGGESTIONS / IMPROVEMENTS */}
            {analysis.improvements && analysis.improvements.length > 0 && (
              <div className="space-y-4">
                <h3 className="font-bold text-white text-base">Prioritized Improvements</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {analysis.improvements.map((suggestion, idx) => (
                    <Card key={idx} variant="default" className="p-5 flex flex-col justify-between">
                      <div>
                        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-amber-500/15 text-amber-400 text-xs font-bold border border-amber-500/20">
                          {idx + 1}
                        </span>
                        <p className="mt-4 text-xs sm:text-sm text-slate-300 leading-relaxed">{suggestion}</p>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

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
                  Practice AI Interview
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
