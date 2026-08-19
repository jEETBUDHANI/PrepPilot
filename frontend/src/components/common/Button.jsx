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
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500/40 disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98]";

  const sizes = {
    sm: "px-3.5 py-2 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  const variants = {
    primary:
      "bg-gradient-to-r from-[#0284C7] to-[#0EA5E9] text-white shadow-lg shadow-sky-500/25 hover:shadow-sky-500/35 hover:from-[#0369A1] hover:to-[#0284C7] border border-sky-400/20",
    glow:
      "bg-gradient-to-r from-[#0284C7] via-[#F97316] to-[#F59E0B] text-white shadow-[0_0_25px_rgba(2,132,199,0.25)] hover:shadow-[0_0_35px_rgba(249,115,22,0.3)] hover:brightness-105 border border-white/20",
    secondary:
      "bg-white text-[#0F172A] hover:bg-sky-50 border border-[#E2E8F0] backdrop-blur-md shadow-sm",
    outline:
      "border border-[#E2E8F0] bg-white text-[#0F172A] hover:border-sky-300 hover:bg-sky-50",
    ghost:
      "bg-transparent text-[#334155] hover:text-[#0284C7] hover:bg-sky-50",
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

