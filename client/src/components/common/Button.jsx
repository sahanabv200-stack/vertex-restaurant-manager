import clsx from "clsx";

export default function Button({ children, className, variant = "primary", ...props }) {
  const styles = {
    primary: "bg-brand-600 text-white hover:bg-brand-700",
    secondary: "bg-white border border-slate-300 text-slate-700 hover:bg-slate-50",
    danger: "bg-rose-600 text-white hover:bg-rose-700",
  };

  return (
    <button
      className={clsx(
        "rounded-lg px-4 py-2 text-sm font-semibold transition-colors disabled:opacity-50",
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}
