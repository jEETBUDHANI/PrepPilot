import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/login";
import Register from "./pages/register";
import ForgotPassword from "./pages/forgotPassword";
import Dashboard from "./pages/Dashboard";
import InterviewSetup from "./pages/InterviewSetup";
import Interview from "./pages/Interview";
import InterviewHistory from "./pages/InterviewHistory";
import InterviewResult from "./pages/interviewResult";
import ResumeAnalyser from "./pages/ResumeAnalyser";
import Performance from "./pages/Performance";
import Settings from "./pages/Settings";
import { useEffect } from "react";
import { checkBackend } from "./services/api";
function App() {
  useEffect(() => {
    checkBackend()
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/interview/setup" element={<InterviewSetup />} />
      <Route path="/interview/result" element={<InterviewResult />} />
      <Route path="/interview/:id" element={<Interview />} />
      <Route path="/interview" element={<Interview />} />
      <Route path="/resume" element={<ResumeAnalyser />} />
      <Route path="/history" element={<InterviewHistory />} />
      <Route path="/performance" element={<Performance />} />
      <Route path="/settings" element={<Settings />} />
      <Route
        path="*"
        element={
          <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white">
            <div className="max-w-md rounded-3xl border border-white/10 bg-slate-900/80 p-10 text-center shadow-xl">
              <h1 className="text-3xl font-bold">404</h1>
              <p className="mt-4 text-slate-300">
                Page not found. Check the address or go back to the dashboard.
              </p>
            </div>
          </div>
        }
      />
    </Routes>
  );
}
export default App;
