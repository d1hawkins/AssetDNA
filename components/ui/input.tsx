import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => (
    <div className="w-full">
      {label && <label className="block text-sm font-medium text-slate-300 mb-2">{label}</label>}
      <input
        ref={ref}
        className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:ring-1 transition-colors ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-slate-600 focus:border-primary focus:ring-primary"} ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  )
);
Input.displayName = "Input";
