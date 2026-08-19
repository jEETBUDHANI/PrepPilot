import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-500">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* BRAND */}
          <div className="lg:col-span-2 space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 font-bold text-white shadow-md shadow-amber-600/30">
                <Sparkles className="h-4 w-4" />
              </div>
              <span className="font-bold text-white text-lg tracking-tight">HireFlux</span>
            </Link>
            <p className="max-w-sm text-sm text-slate-400 leading-relaxed">
              The AI-powered interview practice platform designed to transform job anxiety into high performance and interview confidence.
            </p>
            <div className="flex items-center gap-2 text-xs text-slate-500 pt-2">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All AI Systems Operational</span>
            </div>
          </div>

          {/* COL 1 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Product</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#features" className="hover:text-white transition-colors">AI Mock Interviews</a></li>
              <li><Link to="/resume" className="hover:text-white transition-colors">Resume Analyzer</Link></li>
              <li><Link to="/performance" className="hover:text-white transition-colors">Performance Analytics</Link></li>
              <li><Link to="/history" className="hover:text-white transition-colors">Interview History</Link></li>
            </ul>
          </div>

          {/* COL 2 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Resources</h3>
            <ul className="space-y-2.5 text-sm">
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it Works</a></li>
              <li><a href="#benefits" className="hover:text-white transition-colors">Career Prep Guide</a></li>
              <li><Link to="/interview/setup" className="hover:text-white transition-colors">Interview Simulator</Link></li>
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* COL 3 */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-200 mb-4">Account</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/login" className="hover:text-white transition-colors">Sign In</Link></li>
              <li><Link to="/register" className="hover:text-white transition-colors">Create Free Account</Link></li>
              <li><Link to="/dashboard" className="hover:text-white transition-colors">Workspace</Link></li>
              <li><Link to="/settings" className="hover:text-white transition-colors">Settings</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-14 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} HireFlux Inc. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition-colors">Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
