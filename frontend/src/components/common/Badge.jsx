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
    purple: "bg-sky-100 border-sky-200 text-sky-700",
    cyan: "bg-sky-100 border-sky-200 text-sky-700",
    emerald: "bg-emerald-100 border-emerald-200 text-emerald-700",
    amber: "bg-orange-100 border-orange-200 text-orange-700",
    rose: "bg-rose-100 border-rose-200 text-rose-700",
    neutral: "bg-slate-100 border-slate-200 text-slate-600",
    glow: "bg-gradient-to-r from-sky-100 via-white to-orange-100 border-sky-200 text-sky-700 shadow-[0_0_15px_rgba(2,132,199,0.12)]",
  };

  const dotColors = {
    purple: "bg-sky-500",
    cyan: "bg-sky-500",
    emerald: "bg-emerald-500",
    amber: "bg-orange-500",
    rose: "bg-rose-500",
    neutral: "bg-slate-500",
    glow: "bg-sky-500",
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
