import { useState, useEffect } from "react";
import { Bell, Search, ChevronDown, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

function DashboardHeader() {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/history?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      navigate("/history");
    }
  };

  const userName = user?.name || "User";
  const userInitial = userName.charAt(0).toUpperCase();

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-6 border-b border-white/[0.08] bg-[#030712]/80 px-6 py-4 backdrop-blur-xl lg:px-10">
      {/* SEARCH BAR */}
      <form onSubmit={handleSearchSubmit} className="hidden md:flex w-full max-w-sm items-center gap-2.5 rounded-xl border border-white/10 bg-slate-900/60 px-3.5 py-2 text-sm backdrop-blur-md transition-all focus-within:border-amber-500/50 focus-within:ring-2 focus-within:ring-amber-500/10">
        <Search className="h-4 w-4 text-slate-500 shrink-0" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search interviews, topics, history..."
          className="w-full bg-transparent text-slate-200 outline-none placeholder:text-slate-500 text-xs sm:text-sm"
        />
        <button type="submit" className="hidden sm:inline-flex items-center rounded border border-white/10 bg-white/5 px-1.5 py-0.5 text-[10px] text-slate-400 font-mono hover:text-amber-400 transition-colors">
          Search
        </button>
      </form>

      {/* RIGHT ACTIONS */}
      <div className="ml-auto flex items-center gap-4">
        {/* NOTIFICATION BTN */}
        <div className="relative">
          <button
            type="button"
            onClick={() => setNotificationsOpen(!notificationsOpen)}
            className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-slate-900/60 text-slate-400 hover:border-white/20 hover:text-white transition-all"
          >
            <Bell className="h-4 w-4" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-amber-500 ring-2 ring-[#030712]" />
          </button>

          {notificationsOpen && (
            <div className="absolute right-0 mt-3 w-80 rounded-2xl border border-white/10 bg-slate-900/95 p-4 shadow-2xl backdrop-blur-2xl z-50">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-3">
                <span className="font-semibold text-xs text-white uppercase tracking-wider">Notifications</span>
                <span className="text-[10px] text-amber-400">2 New</span>
              </div>
              <div className="space-y-2.5 text-xs">
                <div className="rounded-xl bg-white/[0.04] p-2.5">
                  <p className="font-medium text-slate-200">Interview Evaluation Ready</p>
                  <p className="text-slate-400 mt-0.5">Mock session saved to your account.</p>
                </div>
                <div className="rounded-xl bg-white/[0.04] p-2.5">
                  <p className="font-medium text-slate-200">Resume Analysis Complete</p>
                  <p className="text-slate-400 mt-0.5">ATS compatibility feedback ready.</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* USER PROFILE */}
        <Link
          to="/settings"
          className="flex items-center gap-3 rounded-xl border border-white/10 bg-slate-900/60 p-1.5 pr-3 hover:border-white/20 transition-all group"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-amber-600 to-orange-600 font-bold text-white text-xs shadow-md">
            {userInitial}
          </div>
          <div className="hidden sm:block text-left">
            <p className="text-xs font-semibold text-slate-200 group-hover:text-amber-300 transition-colors">{userName}</p>
            <p className="text-[10px] text-slate-500">{user?.email || "Candidate Pro"}</p>
          </div>
          <ChevronDown className="hidden sm:block h-3.5 w-3.5 text-slate-500" />
        </Link>
      </div>
    </header>
  );
}

export default DashboardHeader;
