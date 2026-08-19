import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Bell,
  Check,
  Lock,
  Mail,
  Save,
  Shield,
  User,
  Eye,
  EyeOff,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";
import Button from "../components/common/Button";
import Card from "../components/common/Card";
import Badge from "../components/common/Badge";
import Input from "../components/common/Input";
import { getProfile, updateProfile } from "../services/authService";

function Settings() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notifications, setNotifications] = useState(true);
  const [weeklyReport, setWeeklyReport] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProfile() {
      try {
        setLoading(true);
        const data = await getProfile();
        if (data.user) {
          setName(data.user.name || "");
          setEmail(data.user.email || "");
          setNotifications(data.user.notifications ?? true);
          setWeeklyReport(data.user.weeklyReport ?? true);
        }
      } catch (error) {
        console.error("Failed to load profile:", error);
      } finally {
        setLoading(false);
      }
    }
    loadProfile();
  }, []);

  async function handleSave() {
    try {
      const data = await updateProfile({
        name,
        notifications,
        weeklyReport,
      });

      if (data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));
      }

      setSaved(true);
      setTimeout(() => {
        setSaved(false);
      }, 2000);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  }

  return (
    <main className="min-h-screen bg-[#030712] text-slate-100 pb-20">
      {/* HEADER */}
      <header className="border-b border-white/[0.08] bg-[#030712]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-5xl items-center justify-between px-6">
          <Link
            to="/dashboard"
            className="flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Workspace
          </Link>

          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-600 to-orange-600 font-bold text-white shadow-md">
              <Sparkles className="h-4 w-4" />
            </div>
            <span className="font-bold text-white text-sm">Account Preferences</span>
          </div>

          <Badge variant="neutral" size="sm">
            {name || "Candidate Pro"}
          </Badge>
        </div>
      </header>

      {/* CONTENT */}
      <div className="mx-auto max-w-4xl px-6 py-12 space-y-8">
        {/* TITLE */}
        <div>
          <Badge variant="glow" size="md">User Settings</Badge>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            Account & System Preferences
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Manage your personal profile, notification triggers, security controls, and visual theme.
          </p>
        </div>

        {/* PROFILE SECTION */}
        <Card variant="default" className="p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/15 text-amber-400 border border-amber-500/20">
              <User className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Personal Profile</h2>
              <p className="text-xs text-slate-400">Your workspace candidate identity</p>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Input
              label="Full Name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              icon={User}
              disabled={loading}
            />
            <Input
              label="Email Address"
              type="email"
              value={email}
              disabled
              icon={Mail}
            />
          </div>
        </Card>

        {/* PASSWORD SECTION */}
        <Card variant="default" className="p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-600/15 text-cyan-400 border border-cyan-500/20">
              <Lock className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Password & Authentication</h2>
              <p className="text-xs text-slate-400">Manage account access security</p>
            </div>
          </div>

          <div className="mt-6 max-w-md">
            <Input
              label="Current Password"
              type={showPassword ? "text" : "password"}
              defaultValue="••••••••"
              disabled
              icon={Lock}
              endIcon={showPassword ? EyeOff : Eye}
              onEndIconClick={() => setShowPassword(!showPassword)}
            />
          </div>
        </Card>

        {/* NOTIFICATIONS SECTION */}
        <Card variant="default" className="p-6">
          <div className="flex items-center gap-3 border-b border-white/10 pb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600/15 text-amber-400 border border-amber-500/20">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Notification Triggers</h2>
              <p className="text-xs text-slate-400">Choose what updates you receive</p>
            </div>
          </div>

          <div className="mt-6 divide-y divide-white/10">
            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-semibold text-white">Interview Practice Reminders</p>
                <p className="text-xs text-slate-400 mt-0.5">Receive daily notifications to maintain practice streak.</p>
              </div>

              <button
                type="button"
                onClick={() => setNotifications(!notifications)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  notifications ? "bg-amber-600" : "bg-slate-800"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                    notifications ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between py-4">
              <div>
                <p className="text-sm font-semibold text-white">Weekly Performance Report</p>
                <p className="text-xs text-slate-400 mt-0.5">Summary of readiness score progression & ATS scans.</p>
              </div>

              <button
                type="button"
                onClick={() => setWeeklyReport(!weeklyReport)}
                className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${
                  weeklyReport ? "bg-amber-600" : "bg-slate-800"
                }`}
              >
                <span
                  className={`absolute top-1 h-4 w-4 rounded-full bg-white transition-all ${
                    weeklyReport ? "left-6" : "left-1"
                  }`}
                />
              </button>
            </div>
          </div>
        </Card>

        {/* SECURITY STATUS */}
        <Card variant="default" className="p-6 border-emerald-500/20 bg-emerald-500/[0.02]">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400 border border-emerald-500/20">
              <Shield className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-bold text-white text-base">Account Protection Active</h2>
              <p className="text-xs text-emerald-400 font-semibold mt-0.5">SSL Encrypted • Private Workspace</p>
            </div>
          </div>
        </Card>

        {/* SAVE ACTION */}
        <div className="flex justify-end pt-4">
          <Button variant="glow" size="lg" onClick={handleSave} disabled={loading}>
            {saved ? <Check className="h-4 w-4" /> : <Save className="h-4 w-4" />}
            {saved ? "Changes Saved!" : "Save Settings"}
          </Button>
        </div>
      </div>
    </main>
  );
}

export default Settings;
