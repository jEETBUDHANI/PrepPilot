import Button from "../common/Button";

function Hero() {
  return (
    <section className="rounded-3xl bg-gradient-to-br from-slate-950 via-violet-950 to-slate-900 px-6 py-16 text-white shadow-2xl shadow-violet-900/20 sm:px-10 lg:px-14">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
        <div className="max-w-2xl">
          <p className="text-sm uppercase tracking-[0.4em] text-violet-300">AI Interview Prep</p>
          <h1 className="mt-6 text-5xl font-bold leading-tight sm:text-6xl">
            Master your next interview with AI-powered practice.
          </h1>
          <p className="mt-6 text-lg text-slate-300 sm:text-xl">
            Practice mock interviews, analyze your resume, and track your progress with personalized feedback from advanced AI.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Button className="min-w-[170px]">Start Practice</Button>
            <Button variant="secondary" className="min-w-[170px]">Book Demo</Button>
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl bg-white/5 p-5 text-slate-100 shadow-lg shadow-black/10">
              <p className="text-3xl font-semibold">98%</p>
              <p className="mt-2 text-sm text-slate-400">Users report boosted confidence</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5 text-slate-100 shadow-lg shadow-black/10">
              <p className="text-3xl font-semibold">120K+</p>
              <p className="mt-2 text-sm text-slate-400">Mock interviews completed</p>
            </div>
            <div className="rounded-3xl bg-white/5 p-5 text-slate-100 shadow-lg shadow-black/10">
              <p className="text-3xl font-semibold">24/7</p>
              <p className="mt-2 text-sm text-slate-400">Practice on your own schedule</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-slate-100 shadow-2xl shadow-black/20">
          <div className="rounded-3xl bg-slate-950/80 p-6">
            <p className="uppercase tracking-[0.3em] text-xs text-violet-300">Live Mock Interview</p>
            <h2 className="mt-4 text-2xl font-semibold">Ask your AI any question instantly.</h2>
            <p className="mt-4 text-slate-400">Get smarter follow-up prompts, answer feedback, and voice response guidance—all in one place.</p>
          </div>
          <div className="mt-8 grid gap-4">
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm text-slate-400">Question:</p>
              <p className="mt-3 text-lg font-semibold">Tell me about a time you solved a hard problem.</p>
            </div>
            <div className="rounded-3xl bg-slate-950/80 p-5">
              <p className="text-sm text-slate-400">Feedback:</p>
              <p className="mt-3 text-lg font-semibold">Use concrete examples, explain your thought process, and keep it concise.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;