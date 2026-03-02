import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
    const variants = {
      primary: "bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white hover:brightness-110 shadow-lg shadow-primary/25",
      secondary: "bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500",
      ghost: "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800",
    };
    const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-6 py-3 text-base" };
    return <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
  }
);
Button.displayName = "Button";
