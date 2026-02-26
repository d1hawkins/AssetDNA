interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info" | "default";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  const variants = {
    success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    error: "bg-red-500/20 text-red-400 border-red-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    default: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  };
  return <span className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded border ${variants[variant]} ${className}`}>{children}</span>;
}
