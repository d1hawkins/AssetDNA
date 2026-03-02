import { ReactNode } from "react";

interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info" | "default";
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  const variants = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    error: "bg-red-500/10 text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    default: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
