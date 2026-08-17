import { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowUpRight,
  Award,
  Brain,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  Trophy,
  Zap,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import { getPerformance } from "../services/interviewService";

function Performance() {
  const [performance, setPerformance] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPerformance() {
      try {
        setLoading(true);
        const data = await getPerformance();
        setPerformance(data.performance);
      } catch (error) {
        console.error("Failed to load performance data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadPerformance();
  }, []);

  const totalInterviews = performance?.totalInterviews ?? 0;
  const avgScore = performance?.averageScore ?? 0;
  const bestScore = performance?.bestScore ?? 0;
  const totalPracticeTime = performance?.totalPracticeTime ?? 0;
  const weeklyPerformance = performance?.weeklyPerformance ?? [];

  const skills = [
    { name: "Technical Depth & Concepts", score: Math.min(95, avgScore + 5), change: "+8%" },
    { name: "Communication & STAR Method", score: Math.max(0, avgScore - 4), change: "+5%" },
    { name: "Problem Solving & Architecture", score: Math.min(98, avgScore + 2), change: "+12%" },
    { name: "Executive Response Confidence", score: Math.max(0, avgScore - 2), change: "+7%" },
  ];

  const achievements = [
    { title: "Sessions Mastered", description: `Completed ${totalInterviews} comprehensive AI mock sessions`, icon: Trophy },
    { title: "Top Performer 90%+", description: "Scored high technical competence in mock interviews", icon: Award },
    { title: "Consistent Practice Streak", description: "Practiced consistently across multiple mock runs", icon: Zap },
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
            Back to Workspace
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 font-bold text-white shadow-md">
              <TrendingUp className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">Performance Analytics</span>
          </div>

          <Badge variant="emerald" size="sm" dot>
            Live DB Calculations
          </Badge>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 space-y-8">
        {/* TITLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="glow" size="md">Analytics Engine</Badge>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Track Your Interview Readiness
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Visualize score progression, domain skill strengths, and milestone badges.
            </p>
          </div>

          <Link to="/interview/setup">
            <Button variant="glow" size="md">
              Start Practice Session
            </Button>
          </Link>
        </div>

        {/* EMPTY STATE */}
        {!loading && totalInterviews === 0 && (
          <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-10 text-center backdrop-blur-xl">
            <h2 className="text-xl font-semibold text-white">No interviews yet</h2>
            <p className="mt-3 text-sm text-slate-400 max-w-md mx-auto leading-relaxed">
              Complete your first AI interview to see your detailed performance metrics, progress charts, and readiness index.
            </p>
            <Link
              to="/interview/setup"
              className="mt-6 inline-flex rounded-xl bg-violet-600 px-6 py-3 text-sm font-semibold text-white hover:bg-violet-500 transition-colors shadow-lg shadow-violet-600/30"
            >
              Start Interview Now
            </Link>
          </div>
        )}

        {/* METRICS GRID */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Average Score</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{avgScore}%</p>
            <p className="mt-1 text-xs text-slate-400 font-medium">From MongoDB sessions</p>
          </Card>

          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Mock Sessions</span>
              <Brain className="h-4 w-4 text-violet-400" />
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{totalInterviews}</p>
            <p className="mt-1 text-xs text-slate-400 font-medium">Completed interviews</p>
          </Card>

          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Practice Time</span>
              <Clock className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{totalPracticeTime} min</p>
            <p className="mt-1 text-xs text-emerald-400 font-medium">Total minutes practiced</p>
          </Card>

          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Best Score</span>
              <Trophy className="h-4 w-4 text-amber-400" />
            </div>
            <p className="mt-3 text-3xl font-extrabold text-amber-400">{bestScore}%</p>
            <p className="mt-1 text-xs text-slate-400 font-medium">Personal Best Record</p>
          </Card>
        </div>

        {/* WEEKLY CHART & READINESS */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* WEEKLY CHART */}
          <Card variant="default" className="lg:col-span-2 p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="font-bold text-white text-base">Recent Sessions Performance</h3>
                <p className="text-xs text-slate-400">Scores of your recent AI interviews</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <ArrowUpRight className="h-4 w-4" />
                <span>Real-Time Data</span>
              </div>
            </div>

            {/* CSS BAR CHART */}
            <div className="mt-8 flex h-52 items-end justify-between gap-3 px-2">
              {weeklyPerformance.length > 0 ? (
                weeklyPerformance.map((item, index) => {
                  const dateStr = item.date
                    ? new Date(item.date).toLocaleDateString("en-US", { weekday: "short" })
                    : `S${index + 1}`;
                  return (
                    <div key={index} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                      <span className="text-[10px] font-mono text-slate-400">{item.score}</span>
                      <div className="flex h-40 w-full items-end rounded-t-lg bg-white/5 p-1">
                        <div
                          className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-cyan-400 transition-all hover:brightness-125"
                          style={{ height: `${item.score}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 font-semibold">{dateStr}</span>
                    </div>
                  );
                })
              ) : (
                <div className="w-full flex items-center justify-center text-xs text-slate-500 py-10">
                  No interview scores recorded yet
                </div>
              )}
            </div>
          </Card>

          {/* READINESS GAUGE */}
          <Card variant="gradient" className="p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-violet-300 font-medium text-xs">
                <Target className="h-4 w-4" />
                <span>Interview Readiness Index</span>
              </div>

              <div className="mt-8 text-center">
                <div className="mx-auto flex h-36 w-36 items-center justify-center rounded-full border-8 border-violet-500/20 bg-slate-950/60 shadow-xl">
                  <div>
                    <span className="text-4xl font-extrabold text-white">{avgScore}%</span>
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Readiness</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-xs text-slate-400">
                <span>Novice</span>
                <span className="font-semibold text-emerald-400">Offer Ready</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full rounded-full bg-gradient-to-r from-violet-600 to-emerald-400" style={{ width: `${avgScore}%` }} />
              </div>
            </div>
          </Card>
        </div>

        {/* SKILLS BREAKDOWN */}
        <Card variant="default" className="p-6">
          <h3 className="font-bold text-white text-base mb-6">Domain Skill Performance Matrix</h3>
          <div className="grid gap-6 md:grid-cols-2">
            {skills.map((skill) => (
              <div key={skill.name} className="space-y-2 bg-slate-900/40 p-4 rounded-xl border border-white/10">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-200">{skill.name}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-emerald-400 font-semibold">{skill.change}</span>
                    <span className="font-bold text-white">{skill.score}%</span>
                  </div>
                </div>
                <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-cyan-400"
                    style={{ width: `${skill.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* ACHIEVEMENTS */}
        <div className="space-y-4">
          <h3 className="font-bold text-white text-base">Unlocked Badges & Milestones</h3>
          <div className="grid gap-4 md:grid-cols-3">
            {achievements.map((ach) => {
              const Icon = ach.icon;
              return (
                <Card key={ach.title} variant="default" className="p-6 flex flex-col justify-between">
                  <div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400 border border-amber-500/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h4 className="mt-4 font-bold text-white text-base">{ach.title}</h4>
                    <p className="mt-1 text-xs text-slate-400 leading-relaxed">{ach.description}</p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    <span>Unlocked</span>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </main>
  );
}

export default Performance;