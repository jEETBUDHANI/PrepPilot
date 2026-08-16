function Badge({
  children,
  variant = "purple",
  size = "md",
  icon: Icon,
  dot = false,
  className = "",
}) {
  const base = "inline-flex items-center gap-1.5 font-medium rounded-full border backdrop-blur-md";

  const sizes = {
    sm: "px-2.5 py-0.5 text-xs",
    md: "px-3 py-1 text-xs",
    lg: "px-4 py-1.5 text-sm",
  };

  const variants = {
    purple: "bg-violet-500/10 border-violet-500/30 text-violet-300",
    cyan: "bg-cyan-500/10 border-cyan-500/30 text-cyan-300",
    emerald: "bg-emerald-500/10 border-emerald-500/30 text-emerald-300",
    amber: "bg-amber-500/10 border-amber-500/30 text-amber-300",
    rose: "bg-rose-500/10 border-rose-500/30 text-rose-300",
    neutral: "bg-white/5 border-white/10 text-slate-300",
    glow: "bg-gradient-to-r from-violet-500/20 to-cyan-500/20 border-violet-400/30 text-violet-200 shadow-[0_0_15px_rgba(139,92,246,0.2)]",
  };

  const dotColors = {
    purple: "bg-violet-400",
    cyan: "bg-cyan-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    rose: "bg-rose-400",
    neutral: "bg-slate-400",
    glow: "bg-violet-300",
  };

  return (
    <span className={`${base} ${sizes[size]} ${variants[variant]} ${className}`}>
      {dot && <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${dotColors[variant]}`} />}
      {Icon && <Icon className="h-3.5 w-3.5" />}
      {children}
    </span>
  );
}

export default Badge;
