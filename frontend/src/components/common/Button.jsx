import { Loader2 } from "lucide-react";

function Button({
  children,
  variant = "primary",
  size = "md",
  type = "button",
  className = "",
  onClick,
  disabled,
  isLoading = false,
}) {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

  const sizes = {
    sm: "px-3.5 py-2 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-[#f97316] to-[#fb923c] text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/35 hover:from-[#ea580c] hover:to-[#f97316] border border-orange-400/20",
    glow:
      "bg-gradient-to-r from-[#f97316] via-[#fb923c] to-[#fbbf24] text-white shadow-[0_0_25px_rgba(249,115,22,0.25)] hover:shadow-[0_0_35px_rgba(249,115,22,0.3)] hover:brightness-105 border border-white/20",
    secondary:
      "bg-slate-900 text-white hover:bg-slate-800 border border-slate-700 backdrop-blur-md shadow-sm",
    outline:
      "border border-slate-700 bg-slate-950 text-white hover:border-orange-500/50 hover:bg-slate-900",
    ghost:
      "bg-transparent text-slate-300 hover:text-orange-400 hover:bg-slate-900/50",
    destructive:
      "bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-lg shadow-rose-600/25 hover:from-rose-500 hover:to-red-500 border border-rose-400/20",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`${baseStyles} ${sizes[size]} ${variants[variant]} ${className}`}
    >
      {isLoading ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Loading...</span>
        </>
      ) : (
        children
      )}
    </button>
  );
}

export default Button;

