function Card({
  children,
  variant = "default",
  className = "",
  onClick,
  ...props
}) {
  const base = "rounded-2xl border backdrop-blur-xl transition-all duration-300";

  const variants = {
    default: "bg-slate-900 border-slate-800 text-white shadow-xl shadow-black/40",
    interactive: "bg-slate-900 border-slate-800 text-white shadow-xl shadow-black/40 hover:border-orange-500/40 hover:-translate-y-1 hover:shadow-orange-500/20 cursor-pointer",
    gradient: "bg-gradient-to-br from-orange-950 via-slate-900 to-orange-900 border-slate-800 text-white shadow-2xl",
    glow: "bg-slate-900 border-orange-700/50 text-white shadow-[0_0_30px_rgba(249,115,22,0.15)]",
    solid: "bg-slate-900 border-slate-800 text-white",
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
