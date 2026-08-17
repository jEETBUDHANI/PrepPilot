import { useEffect, useState } from "react";
import {
  ArrowRight,
  Play,
  FileText,
  Sparkles,
  Settings as SettingsIcon,
  BarChart3,
  Video,
} from "lucide-react";
import Sidebar from "../components/dashboard/Sidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCard from "../components/dashboard/StatCard";
import Card from "../components/common/Card";
import Button from "../components/common/Button";
import Badge from "../components/common/Badge";
import { useNavigate } from "react-router-dom";
import { getPerformance, getInterviews } from "../services/interviewService";

function Dashboard() {
  const navigate = useNavigate();
  const [performance, setPerformance] = useState(null);
  const [recentSessions, setRecentSessions] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Load stored user
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }

    async function loadDashboardData() {
      try {
        const perfData = await getPerformance();
        setPerformance(perfData.performance);

        const intData = await getInterviews();
        if (intData.interviews) {
          setRecentSessions(intData.interviews.slice(0, 3));
        }
      } catch (error) {
        console.error("Dashboard load error:", error);
      }
    }

    loadDashboardData();
  }, []);

  const totalInterviews = performance?.totalInterviews ?? 0;
  const avgScore = performance?.averageScore ?? 0;
  const practiceHours = ((performance?.totalPracticeTime ?? 0) / 60).toFixed(1);
  const bestScore = performance?.bestScore ?? 0;
  const userName = user?.name || "Candidate";

  return (
    <div className="min-h-screen bg-[#030712] text-slate-100 flex">
      <Sidebar />

      <div className="flex-1 lg:ml-72 flex flex-col min-w-0">
        <DashboardHeader />

        <main className="flex-1 px-6 py-8 lg:px-10 max-w-7xl w-full mx-auto space-y-8">
          {/* WELCOME BANNER */}
          <section className="relative overflow-hidden rounded-3xl border border-white/[0.08] bg-gradient-to-r from-violet-950/40 via-slate-900/80 to-cyan-950/30 p-8 backdrop-blur-2xl">
            <div className="glow-orb-violet -right-20 -top-20 h-64 w-64 opacity-30 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <Badge variant="purple" size="sm" dot icon={Sparkles}>
                  Candidate Workspace
                </Badge>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                  Welcome back, {userName}
                </h1>
                <p className="mt-2 text-sm text-slate-400 max-w-xl leading-relaxed">
                  Your current interview readiness is at <span className="text-emerald-400 font-semibold">{avgScore}%</span>. Keep practicing to refine your responses and technical depth.
                </p>
              </div>

              <Button
                variant="glow"
                size="lg"
                onClick={() => navigate("/interview/setup")}
                className="shrink-0"
              >
                <Play className="h-4 w-4 fill-white" />
                Start AI Mock Session
              </Button>
            </div>
          </section>

          {/* STATS GRID */}
          <section className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            <StatCard
              title="Total Interviews"
              value={totalInterviews.toString()}
              change="From MongoDB"
              type="interviews"
            />
            <StatCard
              title="Average Score"
              value={`${avgScore}%`}
              change="Overall average"
              type="score"
            />
            <StatCard
              title="Practice Hours"
              value={`${practiceHours}h`}
              change="Total practice duration"
              type="hours"
            />
            <StatCard
              title="Best Score"
              value={`${bestScore}%`}
              change="Personal record"
              type="progress"
            />
          </section>

          {/* MAIN WORKSPACE GRID */}
          <section className="grid gap-6 xl:grid-cols-3">
            {/* RECENT INTERVIEWS */}
            <Card variant="default" className="xl:col-span-2 p-6 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-white/[0.08] pb-4">
                  <div>
                    <h2 className="text-lg font-bold text-white">Recent Interview Sessions</h2>
                    <p className="text-xs text-slate-400">Review your latest practice feedback</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => navigate("/history")}
                    className="text-violet-400 hover:text-violet-300"
                  >
                    View History →
                  </Button>
                </div>

                <div className="mt-6 space-y-3">
                  {recentSessions.length > 0 ? (
                    recentSessions.map((session) => (
                      <div
                        key={session._id || session.id}
                        className="flex items-center justify-between rounded-2xl border border-white/[0.06] bg-slate-900/60 p-4 backdrop-blur-md transition-all hover:border-violet-500/30 hover:bg-slate-900/90"
                      >
                        <div className="flex items-center gap-4">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600/15 text-violet-400 border border-violet-500/20">
                            <Video className="h-5 w-5" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-white text-sm">{session.role}</h3>
                            <p className="text-xs text-slate-400 mt-0.5">{session.difficulty} Level</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-base font-bold text-emerald-400">{session.overallScore || 0}%</span>
                          <p className="text-[10px] text-slate-500">
                            {session.createdAt ? new Date(session.createdAt).toLocaleDateString("en-US", { month: "short", day: "numeric" }) : "Recent"}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-8 text-xs text-slate-500">
                      No recent mock interviews found. Start your first session now!
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-white/[0.06] flex items-center justify-between text-xs text-slate-400">
                <span>{totalInterviews} sessions saved in database</span>
                <span className="text-violet-400 font-semibold cursor-pointer" onClick={() => navigate("/interview/setup")}>+ New Mock</span>
              </div>
            </Card>

            {/* AI RECOMMENDATION BOX */}
            <Card variant="gradient" className="p-6 flex flex-col justify-between">
              <div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-cyan-500 font-bold text-white shadow-lg shadow-violet-600/30">
                  <Sparkles className="h-6 w-6" />
                </div>
                <h2 className="mt-6 text-xl font-bold text-white">AI Coach Recommendation</h2>
                <p className="mt-3 text-sm text-slate-300 leading-relaxed">
                  Your overall score is {avgScore}%. Focus on expanding error handling scenarios and using STAR framework narratives for technical prompts.
                </p>
              </div>

              <div className="mt-8 pt-4 border-t border-white/10">
                <Button
                  variant="glow"
                  size="md"
                  onClick={() => navigate("/interview/setup")}
                  className="w-full justify-center"
                >
                  Start Target Practice
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </div>
            </Card>
          </section>

          {/* QUICK ACTIONS GRID */}
          <section className="space-y-4">
            <h2 className="text-lg font-bold text-white">Quick Actions</h2>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
              <Card
                variant="interactive"
                onClick={() => navigate("/interview/setup")}
                className="p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-600/15 text-violet-400 border border-violet-500/20">
                    <Play className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Start Interview</h3>
                    <p className="text-xs text-slate-400">Launch AI mock session</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-violet-400" />
              </Card>

              <Card
                variant="interactive"
                onClick={() => navigate("/resume")}
                className="p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-600/15 text-cyan-400 border border-cyan-500/20">
                    <FileText className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Analyze Resume</h3>
                    <p className="text-xs text-slate-400">Check ATS readiness score</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-cyan-400" />
              </Card>

              <Card
                variant="interactive"
                onClick={() => navigate("/performance")}
                className="p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-600/15 text-amber-400 border border-amber-500/20">
                    <BarChart3 className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Performance</h3>
                    <p className="text-xs text-slate-400">Track score analytics</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-amber-400" />
              </Card>

              <Card
                variant="interactive"
                onClick={() => navigate("/settings")}
                className="p-5 flex items-center justify-between group"
              >
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-600/15 text-emerald-400 border border-emerald-500/20">
                    <SettingsIcon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">Settings</h3>
                    <p className="text-xs text-slate-400">Manage account & theme</p>
                  </div>
                </div>
                <ArrowRight className="h-4 w-4 text-slate-500 transition-transform group-hover:translate-x-1 group-hover:text-emerald-400" />
              </Card>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;
