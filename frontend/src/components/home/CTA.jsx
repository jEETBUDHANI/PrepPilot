import Button from "../common/Button";
import Container from "../common/Container";

function CTA() {
  return (
    <section className="bg-gradient-to-r from-amber-600 via-amber-600 to-sky-500 py-16 text-white shadow-2xl shadow-amber-600/20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div>
            <p className="text-sm uppercase tracking-[0.4em] text-white/70">Ready to transform your interview skills?</p>
            <h2 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">
              Build confidence, sharpen answers, and land your dream role.
            </h2>
            <p className="mt-6 max-w-xl text-white/80">
              Use our AI-backed platform to prepare for technical interviews, behavioral rounds, and role-specific assessments with real-time insights.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Button>Start Free Trial</Button>
              <Button variant="secondary">Learn More</Button>
            </div>
          </div>

          <div className="rounded-3xl bg-white/10 p-8 backdrop-blur-xl">
            <p className="text-sm uppercase tracking-[0.3em] text-white/70">What you get</p>
            <ul className="mt-8 space-y-4 text-white/90">
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <strong className="block text-lg font-semibold">Interview simulation</strong>
                <span className="text-white/70">Practice with realistic questions and feedback.</span>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <strong className="block text-lg font-semibold">Resume improvement</strong>
                <span className="text-white/70">Get AI-driven tips for a stronger application.</span>
              </li>
              <li className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <strong className="block text-lg font-semibold">Performance tracking</strong>
                <span className="text-white/70">Compare growth over every session.</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default CTA;