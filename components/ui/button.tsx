import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const base = "font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";
    const variants = {
      primary: "bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white hover:brightness-110",
      secondary: "bg-transparent border border-slate-600 text-slate-200 hover:bg-slate-700",
      ghost: "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800",
    };
    const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-6 py-3 text-base", lg: "px-8 py-4 text-lg" };
    return <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
  }
);
Button.displayName = "Button";
