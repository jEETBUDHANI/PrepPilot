function Card({
  children,
  variant = "default",
  className = "",
  onClick,
  ...props
}) {
  const base = "rounded-2xl border backdrop-blur-xl transition-all duration-300";

  const variants = {
    default: "bg-white border-[#E2E8F0] text-[#0F172A] shadow-xl shadow-sky-100/60",
    interactive: "bg-white border-[#E2E8F0] text-[#0F172A] shadow-xl shadow-sky-100/60 hover:border-sky-300 hover:-translate-y-1 hover:shadow-sky-200/80 cursor-pointer",
    gradient: "bg-gradient-to-br from-sky-50 via-white to-orange-50 border-[#E2E8F0] text-[#0F172A] shadow-2xl",
    glow: "bg-white border-sky-200 text-[#0F172A] shadow-[0_0_30px_rgba(2,132,199,0.08)]",
    solid: "bg-white border-[#E2E8F0] text-[#0F172A]",
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
