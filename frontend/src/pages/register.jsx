import { useState } from "react";
import { User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

import { registerUser } from "../services/authService";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setError("");
    setIsLoading(true);

    try {
      const data = await registerUser({ name, email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      {/* Background Orbs */}
      <div className="glow-orb-amber top-10 right-10 h-96 w-96 opacity-30 pointer-events-none" />
      <div className="glow-orb-cyan bottom-10 left-10 h-96 w-96 opacity-20 pointer-events-none" />

      <div className="w-full max-w-xl rounded-3xl border border-white/[0.08] bg-[#080d1a]/80 backdrop-blur-2xl shadow-2xl p-8 sm:p-12 relative z-10">
        <div className="text-center max-w-md mx-auto">
          <Link to="/" className="inline-flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 font-bold text-white shadow-lg shadow-amber-600/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <span className="font-bold text-white text-xl tracking-tight">HireFlux</span>
          </Link>

          <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-white">Create your account</h1>
          <p className="mt-2 text-sm text-slate-400">
            Get unlimited AI mock interviews & instant resume ATS feedback.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 max-w-md mx-auto">
          <Input
            label="Full Name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Alex Johnson"
            icon={User}
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            icon={Mail}
            required
          />

          <Input
            label="Password"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create password"
            icon={Lock}
            endIcon={showPassword ? EyeOff : Eye}
            onEndIconClick={() => setShowPassword(!showPassword)}
            required
          />

          <Input
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
            icon={Lock}
            endIcon={showConfirmPassword ? EyeOff : Eye}
            onEndIconClick={() => setShowConfirmPassword(!showConfirmPassword)}
            required
          />

          <div className="pt-2">
            <Button type="submit" variant="glow" size="lg" className="w-full justify-center" isLoading={isLoading}>
              Create Free Account
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </form>

        <p className="mt-8 text-center text-xs sm:text-sm text-slate-400">
          Already have an account?{" "}
          <Link to="/login" className="font-semibold text-amber-400 hover:text-amber-300">
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}

export default Register;
