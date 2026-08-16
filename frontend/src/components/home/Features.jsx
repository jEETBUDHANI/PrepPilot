import {
  Brain,
  Mic,
  FileText,
  BarChart3,
  ShieldCheck,
  Clock3,
} from "lucide-react";
import Container from "../common/Container";

const features = [
  {
    icon: Brain,
    title: "AI Mock Interviews",
    description: "Practice interviews with intelligent AI generated questions.",
  },
  {
    icon: Mic,
    title: "Voice Based Interview",
    description: "Answer questions naturally using your microphone.",
  },
  {
    icon: FileText,
    title: "Resume Analysis",
    description: "Upload your resume and improve your ATS score.",
  },
  {
    icon: BarChart3,
    title: "Detailed Reports",
    description: "Track your performance after every interview.",
  },
  {
    icon: ShieldCheck,
    title: "Secure Data",
    description: "Your interview reports remain safe and private.",
  },
  {
    icon: Clock3,
    title: "Interview History",
    description: "Access all your previous interviews anytime.",
  },
];

function Features() {
  return (
    <section className="rounded-3xl bg-slate-950 px-6 py-28 text-white sm:px-10">
      <Container>
        <div className="text-center">
          <p className="text-violet-400 uppercase tracking-[0.3em]">FEATURES</p>
          <h2 className="mt-5 text-4xl font-bold sm:text-5xl">Everything You Need</h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto">
            One platform to practice interviews, analyze resumes and improve
            your confidence.
          </p>
        </div>
        <div className="mt-20 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="rounded-3xl border border-white/10 bg-white/5 p-8 transition-all duration-300 hover:-translate-y-2 hover:border-violet-500"
              >
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-600">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="mt-8 text-2xl font-semibold">{feature.title}</h3>
                <p className="mt-5 text-gray-400 leading-7">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default Features;
