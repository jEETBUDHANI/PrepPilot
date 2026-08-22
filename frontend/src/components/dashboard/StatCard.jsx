import { TrendingUp, Video, Clock3, Target, ArrowUpRight } from "lucide-react";
import Card from "../common/Card";

const iconMap = {
  interviews: Video,
  score: Target,
  hours: Clock3,
  progress: TrendingUp,
};

const colorMap = {
  interviews: "from-amber-500/20 to-purple-500/10 text-amber-400 border-amber-500/20",
  score: "from-orange-500/20 to-amber-500/10 text-amber-400 border-orange-500/20",
  hours: "from-amber-500/20 to-orange-500/10 text-amber-400 border-amber-500/20",
  progress: "from-emerald-500/20 to-teal-500/10 text-emerald-400 border-emerald-500/20",
};

function StatCard({ title, value, change, type }) {
  const Icon = iconMap[type] || TrendingUp;
  const colors = colorMap[type] || colorMap.progress;

  return (
    <Card variant="interactive" className="p-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">{title}</p>
          <h3 className="mt-3 text-3xl font-bold tracking-tight text-white">{value}</h3>
        </div>
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br border ${colors} shadow-md`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-4 flex items-center gap-1.5 text-xs font-medium text-emerald-400">
        <ArrowUpRight className="h-3.5 w-3.5" />
        <span>{change}</span>
      </div>
    </Card>
  );
}

export default StatCard;
