import { useEffect, useState } from "react";
import {
  Search,
  Calendar,
  Clock,
  ChevronRight,
  ArrowLeft,
  Filter,
  Video,
  Loader2,
} from "lucide-react";
import { useSearchParams, Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Input from "../components/common/Input";
import { getInterviews } from "../services/interviewService";

function InterviewHistory() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function loadInterviews() {
      try {
        setLoading(true);
        const data = await getInterviews();
        setInterviews(data.interviews || []);
      } catch (error) {
        console.error("Failed to load history:", error);
      } finally {
        setLoading(false);
      }
    }
    loadInterviews();
  }, []);

  useEffect(() => {
    const urlQuery = searchParams.get("search") || "";
    setSearch(urlQuery);
  }, [searchParams]);

  const handleSearchChange = (val) => {
    setSearch(val);
    if (val) {
      setSearchParams({ search: val });
    } else {
      setSearchParams({});
    }
  };

  const filteredInterviews = interviews.filter((interview) => {
    const query = search.toLowerCase().trim();
    const roleText = (interview.role || "").toLowerCase();
    const diffText = (interview.difficulty || "").toLowerCase();
    const questionsText = (interview.questions || []).map((q) => q.question || "").join(" ").toLowerCase();

    const matchesSearch = !query || roleText.includes(query) || diffText.includes(query) || questionsText.includes(query);

    let matchesFilter = true;
    if (filter === "Frontend") {
      matchesFilter = roleText.includes("frontend") || roleText.includes("react");
    } else if (filter === "Full Stack") {
      matchesFilter = roleText.includes("full stack") || roleText.includes("javascript") || roleText.includes("node");
    } else if (filter === "Medium / Hard") {
      matchesFilter = diffText.includes("medium") || diffText.includes("hard");
    }

    return matchesSearch && matchesFilter;
  });

  const totalCount = interviews.length;
  const avgScore = totalCount > 0
    ? Math.round(interviews.reduce((sum, item) => sum + (item.overallScore || item.score || 0), 0) / totalCount)
    : 0;
  const bestScore = totalCount > 0
    ? Math.max(...interviews.map((item) => item.overallScore || item.score || 0))
    : 0;

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
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 font-bold text-white shadow-md">
              <Video className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">Interview History</span>
          </div>

          <Badge variant="purple" size="sm">
            {totalCount} Sessions
          </Badge>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8 space-y-8">
        {/* TITLE */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <Badge variant="glow" size="md">Persistent MongoDB Records</Badge>
            <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Your Practice History
            </h1>
            <p className="mt-2 text-sm text-slate-400">
              Review historical scores, duration logs, and answer breakdowns across past sessions.
            </p>
          </div>

          <Link to="/interview/setup">
            <Button variant="glow" size="md">
              + New Mock Session
            </Button>
          </Link>
        </div>

        {/* SUMMARY CARDS */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card variant="default" className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Completed Sessions</p>
            <p className="mt-2 text-3xl font-extrabold text-white">{totalCount}</p>
          </Card>
          <Card variant="default" className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Average Score</p>
            <p className="mt-2 text-3xl font-extrabold text-emerald-400">{avgScore}%</p>
          </Card>
          <Card variant="default" className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Personal Best</p>
            <p className="mt-2 text-3xl font-extrabold text-amber-400">{bestScore}%</p>
          </Card>
          <Card variant="default" className="p-5">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Database Status</p>
            <p className="mt-2 text-3xl font-extrabold text-cyan-400">Live DB</p>
          </Card>
        </div>

        {/* SEARCH & FILTERS */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
          <Input
            type="text"
            value={search}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder="Search by role, difficulty, or question..."
            icon={Search}
            containerClassName="max-w-md"
          />

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-500" />
            {["All", "Frontend", "Full Stack", "Medium / Hard"].map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setFilter(item)}
                className={`rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                  filter === item
                    ? "bg-amber-600 text-white shadow-md shadow-amber-600/30"
                    : "bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        {/* HISTORY LIST */}
        {loading ? (
          <div className="py-12 text-center">
            <Loader2 className="h-8 w-8 animate-spin text-amber-400 mx-auto" />
            <p className="text-xs text-slate-400 mt-2">Fetching sessions from MongoDB...</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredInterviews.length > 0 ? (
              filteredInterviews.map((item) => {
                const dateStr = item.createdAt
                  ? new Date(item.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })
                  : "Recent";
                const qCount = item.questions ? item.questions.length : 5;
                const score = item.overallScore || item.score || 0;

                return (
                  <Card
                    key={item._id || item.id}
                    variant="interactive"
                    className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-600/15 text-amber-400 border border-amber-500/20">
                        <Video className="h-6 w-6" />
                      </div>

                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-white text-base">{item.role}</h3>
                          <Badge variant="emerald" size="sm">Completed</Badge>
                        </div>
                        <div className="mt-1 flex flex-wrap items-center gap-4 text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3.5 w-3.5" /> {dateStr}
                          </span>
                          <span>{qCount} Questions</span>
                          <span className="text-amber-400">{item.difficulty}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6">
                      <div className="text-right">
                        <p className="text-[10px] uppercase tracking-wider text-slate-500">Score</p>
                        <span className="text-xl font-extrabold text-emerald-400">{score}%</span>
                      </div>
                      <ChevronRight className="h-5 w-5 text-slate-500 group-hover:translate-x-1 group-hover:text-amber-400 transition-all" />
                    </div>
                  </Card>
                );
              })
            ) : (
              <Card variant="default" className="p-12 text-center">
                <Search className="h-8 w-8 text-slate-600 mx-auto mb-3" />
                <p className="font-semibold text-white">No sessions found</p>
                <p className="text-xs text-slate-500 mt-1">Complete your first mock interview to view historical records.</p>
                <Link
                  to="/interview/setup"
                  className="mt-5 inline-flex rounded-xl bg-amber-600 px-5 py-2.5 text-xs font-semibold text-white hover:bg-amber-500 transition-colors shadow-md shadow-amber-600/20"
                >
                  Start Interview
                </Link>
              </Card>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default InterviewHistory;
