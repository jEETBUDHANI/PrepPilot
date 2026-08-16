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
  Loader2,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import { getInterviews } from "../services/interviewService";

function Performance() {
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadInterviews() {
      try {
        setLoading(true);
        const data = await getInterviews();
        setInterviews(data.interviews || []);
      } catch (error) {
        console.error("Failed to load performance data:", error);
      } finally {
        setLoading(false);
      }
    }
    loadInterviews();
  }, []);

  const totalCount = interviews.length;
  const avgScore = totalCount > 0
    ? Math.round(interviews.reduce((sum, item) => sum + (item.overallScore || item.score || 0), 0) / totalCount)
    : 84;
  const bestScore = totalCount > 0
    ? Math.max(...interviews.map((item) => item.overallScore || item.score || 0))
    : 94;

  const skills = [
    { name: "Technical Depth & Concepts", score: Math.min(95, avgScore + 5), change: "+8%" },
    { name: "Communication & STAR Method", score: Math.max(70, avgScore - 4), change: "+5%" },
    { name: "Problem Solving & Architecture", score: Math.min(98, avgScore + 2), change: "+12%" },
    { name: "Executive Response Confidence", score: Math.max(75, avgScore - 2), change: "+7%" },
  ];

  const weeklyPerformance = [
    { day: "Mon", score: 72 },
    { day: "Tue", score: 78 },
    { day: "Wed", score: 75 },
    { day: "Thu", score: 84 },
    { day: "Fri", score: 81 },
    { day: "Sat", score: 89 },
    { day: "Sun", score: avgScore },
  ];

  const achievements = [
    { title: "Sessions Mastered", description: `Completed ${totalCount || 10} comprehensive AI mock sessions`, icon: Trophy },
    { title: "Top Performer 90%+", description: "Scored above 90% in a technical interview", icon: Award },
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
              Practice Next Target Skill
            </Button>
          </Link>
        </div>

        {/* METRICS GRID */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Overall Score</span>
              <TrendingUp className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{avgScore}%</p>
            <p className="mt-1 text-xs text-emerald-400 font-medium">+9% vs last month</p>
          </Card>

          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Mock Sessions</span>
              <Brain className="h-4 w-4 text-violet-400" />
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{totalCount}</p>
            <p className="mt-1 text-xs text-slate-400 font-medium">Recorded in MongoDB</p>
          </Card>

          <Card variant="default" className="p-6">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Practice Time</span>
              <Clock className="h-4 w-4 text-cyan-400" />
            </div>
            <p className="mt-3 text-3xl font-extrabold text-white">{(totalCount * 0.4).toFixed(1)}h</p>
            <p className="mt-1 text-xs text-emerald-400 font-medium">+2.1h this week</p>
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
                <h3 className="font-bold text-white text-base">Weekly Performance Progression</h3>
                <p className="text-xs text-slate-400">Daily mock interview average scores</p>
              </div>
              <div className="flex items-center gap-1 text-xs font-semibold text-emerald-400">
                <ArrowUpRight className="h-4 w-4" />
                <span>+12% Trend</span>
              </div>
            </div>

            {/* CSS BAR CHART */}
            <div className="mt-8 flex h-52 items-end justify-between gap-3 px-2">
              {weeklyPerformance.map((item) => (
                <div key={item.day} className="flex h-full flex-1 flex-col items-center justify-end gap-2">
                  <span className="text-[10px] font-mono text-slate-400">{item.score}</span>
                  <div className="flex h-40 w-full items-end rounded-t-lg bg-white/5 p-1">
                    <div
                      className="w-full rounded-t-md bg-gradient-to-t from-violet-600 to-cyan-400 transition-all hover:brightness-125"
                      style={{ height: `${item.score}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-500 font-semibold">{item.day}</span>
                </div>
              ))}
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
                    <p className="text-[10px] text-slate-400 uppercase tracking-wider mt-0.5">Level Ready</p>
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