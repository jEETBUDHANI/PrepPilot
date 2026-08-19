import {
  LayoutDashboard,
  Video,
  FileText,
  History,
  BarChart3,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  User,
} from "lucide-react";
import { NavLink, Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../services/authService";

const menuItems = [
  { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { name: "AI Interview", path: "/interview/setup", icon: Video },
  { name: "Resume Analyzer", path: "/resume", icon: FileText },
  { name: "Interview History", path: "/history", icon: History },
  { name: "Performance", path: "/performance", icon: BarChart3 },
];

function Sidebar() {
  const navigate = useNavigate();

  function handleLogout() {
    logoutUser();
    navigate("/login");
  }

  return (
    <aside className="hidden lg:flex fixed left-0 top-0 z-40 h-screen w-72 flex-col border-r border-white/[0.08] bg-[#030712]/95 backdrop-blur-2xl">
      {/* BRAND */}
      <div className="flex h-20 items-center gap-3 border-b border-white/[0.08] px-7">
        <Link to="/" className="flex items-center gap-3 group">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 via-orange-600 to-cyan-500 font-bold text-white shadow-lg shadow-amber-600/30">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-bold tracking-tight text-white text-base">HireFlux</h2>
            <p className="text-[10px] uppercase tracking-[2px] text-slate-400 font-medium">
              SaaS Workspace
            </p>
          </div>
        </Link>
      </div>

      {/* NAVIGATION */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto space-y-6">
        <div>
          <p className="mb-3 px-3 text-[11px] font-semibold uppercase tracking-[2px] text-slate-500">
            Workspace
          </p>
          <div className="space-y-1.5">
            {menuItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `group flex items-center gap-3.5 rounded-xl px-3.5 py-3 text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-amber-600/15 text-amber-300 border border-amber-500/30 shadow-md shadow-amber-500/10"
                        : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
                    }`
                  }
                >
                  <Icon className="h-4 w-4 shrink-0 transition-transform duration-200 group-hover:scale-110" />
                  <span>{item.name}</span>
                </NavLink>
              );
            })}
          </div>
        </div>

        {/* AI SPOTLIGHT BOX */}
        <div className="relative overflow-hidden rounded-2xl border border-amber-500/20 bg-gradient-to-b from-amber-950/40 to-slate-900/60 p-4">
          <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-amber-500/10 blur-xl pointer-events-none" />
          <div className="flex items-center gap-2 text-amber-300 font-medium text-xs">
            <Sparkles className="h-4 w-4" />
            <span>AI Practice Coach</span>
          </div>
          <p className="mt-2 text-xs text-slate-400 leading-relaxed">
            Ready for your next mock session? Customize role, depth & questions.
          </p>
          <Link
            to="/interview/setup"
            className="mt-3.5 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Start Practice</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </nav>

      {/* FOOTER USER AREA */}
      <div className="border-t border-white/[0.08] p-4 space-y-1">
        <NavLink
          to="/settings"
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
              isActive
                ? "bg-white/10 text-white"
                : "text-slate-400 hover:bg-white/[0.04] hover:text-slate-200"
            }`
          }
        >
          <Settings className="h-4 w-4" />
          <span>Settings</span>
        </NavLink>
        
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium text-slate-400 hover:bg-rose-500/10 hover:text-rose-400 transition-colors"
        >
          <LogOut className="h-4 w-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
