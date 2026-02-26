interface CardProps { children: React.ReactNode; className?: string; hover?: boolean; onClick?: () => void; }

export function Card({ children, className = "", hover = false, onClick }: CardProps) {
  return (
    <div className={`bg-slate-800/80 border border-slate-700 rounded-xl p-6 backdrop-blur-sm ${hover ? "hover:border-slate-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer" : ""} ${className}`} onClick={onClick}>
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold text-slate-50 ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
