function Input({
  label,
  error,
  icon: Icon,
  endIcon: EndIcon,
  onEndIconClick,
  className = "",
  containerClassName = "",
  ...props
}) {
  return (
    <div className={`w-full ${containerClassName}`}>
      {label && (
        <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
          {label}
        </label>
      )}
      <div className="relative flex items-center">
        {Icon && (
          <Icon className="absolute left-4 h-4 w-4 text-slate-500 transition-colors pointer-events-none" />
        )}
        <input
          className={`w-full rounded-xl border border-white/10 bg-slate-900/60 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none backdrop-blur-md transition-all duration-200 focus:border-violet-500/80 focus:bg-slate-900/80 focus:ring-4 focus:ring-violet-500/10 ${
            Icon ? "pl-11" : "pl-4"
          } ${EndIcon ? "pr-11" : "pr-4"} ${
            error ? "border-rose-500/80 focus:border-rose-500 focus:ring-rose-500/10" : ""
          } ${className}`}
          {...props}
        />
        {EndIcon && (
          <button
            type="button"
            onClick={onEndIconClick}
            className="absolute right-4 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <EndIcon className="h-4 w-4" />
          </button>
        )}
      </div>
      {error && <p className="mt-1.5 text-xs text-rose-400">{error}</p>}
    </div>
  );
}

export default Input;
