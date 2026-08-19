import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";
import Card from "../components/common/Card";

import { loginUser } from "../services/authService";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const data = await loginUser({ email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb-amber top-10 left-10 h-96 w-96 opacity-30 pointer-events-none" />
      <div className="glow-orb-cyan bottom-10 right-10 h-96 w-96 opacity-20 pointer-events-none" />

      <div className="w-full max-w-5xl grid lg:grid-cols-2 rounded-3xl border border-white/[0.08] bg-[#080d1a]/80 backdrop-blur-2xl shadow-2xl overflow-hidden relative z-10">
        {/* LEFT SHOWCASE */}
        <div className="hidden lg:flex flex-col justify-between bg-gradient-to-br from-amber-950/60 via-slate-900/90 to-orange-950/50 p-12 border-r border-white/[0.08]">
          <Link to="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 font-bold text-white shadow-lg shadow-amber-600/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-white text-lg tracking-tight">HireFlux</span>
          </Link>

          <div className="space-y-6">
            <span className="rounded-full bg-amber-500/10 px-3 py-1 text-xs font-semibold text-amber-300 border border-amber-500/20">
              Candidate Workspace
            </span>
            <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
              Master technical interviews with AI coaching.
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Log in to resume your practice sessions, review resume ATS feedback, and track your interview performance analytics.
            </p>

            <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-4 text-xs text-slate-300 space-y-2 backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-400 font-semibold">
                <ShieldCheck className="h-4 w-4" />
                <span>Enterprise grade security</span>
              </div>
              <p className="text-slate-400">All practice audio & response data is encrypted and private to your account.</p>
            </div>
          </div>

          <p className="text-xs text-slate-500">© HireFlux Inc. Next-Gen Career Preparation.</p>
        </div>

        {/* RIGHT FORM */}
        <div className="p-8 sm:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="mb-8">
              <span className="text-xs font-semibold uppercase tracking-[2px] text-amber-400">Sign In</span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-white">Welcome back</h2>
              <p className="mt-2 text-sm text-slate-400">Enter your credentials to access your dashboard.</p>
            </div>

            {error && (
              <div className="mb-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                icon={Mail}
                required
              />

              <div>
                <Input
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  icon={Lock}
                  endIcon={showPassword ? EyeOff : Eye}
                  onEndIconClick={() => setShowPassword(!showPassword)}
                  required
                />
                <div className="mt-2 flex justify-end">
                  <Link to="/forgot-password" className="text-xs text-amber-400 hover:text-amber-300 font-medium">
                    Forgot password?
                  </Link>
                </div>
              </div>

              <Button type="submit" variant="glow" size="lg" className="w-full justify-center" isLoading={isLoading}>
                Sign In
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>

            <p className="mt-8 text-center text-xs sm:text-sm text-slate-400">
              Don't have an account?{" "}
              <Link to="/register" className="font-semibold text-amber-400 hover:text-amber-300">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Login;
