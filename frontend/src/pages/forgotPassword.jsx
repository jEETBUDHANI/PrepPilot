import { useState } from "react";
import { ArrowLeft, Mail, ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Input from "../components/common/Input";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    if (!email) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubmitted(true);
    }, 600);
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 flex items-center justify-center p-4 sm:p-6 relative overflow-hidden">
      <div className="glow-orb-violet top-20 left-1/2 -translate-x-1/2 h-80 w-80 opacity-25 pointer-events-none" />

      <div className="w-full max-w-md rounded-3xl border border-white/[0.08] bg-[#080d1a]/80 backdrop-blur-2xl shadow-2xl p-8 sm:p-10 relative z-10">
        {!submitted ? (
          <>
            <Link
              to="/login"
              className="inline-flex items-center gap-2 text-xs font-medium text-slate-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Sign In
            </Link>

            <div className="mt-8 text-left">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-violet-600/20 text-violet-400 border border-violet-500/20 mb-6">
                <Mail className="h-6 w-6" />
              </div>
              <h1 className="text-2xl font-bold tracking-tight text-white">Reset password</h1>
              <p className="mt-2 text-xs sm:text-sm text-slate-400 leading-relaxed">
                Enter your account email address and we'll send you instructions to reset your password.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <Input
                label="Email Address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                icon={Mail}
                required
              />

              <Button type="submit" variant="glow" size="lg" className="w-full justify-center" isLoading={isLoading}>
                Send Reset Instructions
                <ArrowRight className="h-4 w-4" />
              </Button>
            </form>
          </>
        ) : (
          <div className="py-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="mt-6 text-2xl font-bold text-white">Check your inbox</h2>
            <p className="mt-3 text-xs sm:text-sm text-slate-400 leading-relaxed">
              If an account exists for <span className="text-slate-200 font-semibold">{email}</span>, password reset instructions have been sent.
            </p>
            <Link to="/login" className="mt-8 inline-block">
              <Button variant="outline" size="md">
                Return to Login
              </Button>
            </Link>
          </div>
        )}
      </div>
    </main>
  );
}

export default ForgotPassword;
