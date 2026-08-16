function Card({
  children,
  variant = "default",
  className = "",
  onClick,
  ...props
}) {
  const base = "rounded-2xl border backdrop-blur-xl transition-all duration-300";

  const variants = {
    default: "bg-[#0b0f19]/70 border-white/[0.08] text-slate-100 shadow-xl shadow-black/20",
    interactive: "bg-[#0b0f19]/70 border-white/[0.08] text-slate-100 shadow-xl shadow-black/20 hover:border-violet-500/40 hover:-translate-y-1 hover:shadow-violet-500/10 cursor-pointer",
    gradient: "bg-gradient-to-br from-violet-950/30 via-slate-900/60 to-cyan-950/20 border-violet-500/20 text-slate-100 shadow-2xl",
    glow: "bg-[#0b0f19]/80 border-violet-500/30 text-slate-100 shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    solid: "bg-slate-900 border-slate-800 text-slate-100",
  };

  return (
    <div
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return <div className={`px-6 pt-6 pb-4 ${className}`}>{children}</div>;
}

export function CardBody({ children, className = "" }) {
  return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = "" }) {
  return <div className={`px-6 pb-6 pt-4 border-t border-white/[0.06] ${className}`}>{children}</div>;
}

export default Card;
