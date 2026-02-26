"use client";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, currentRole, setRole, logout } = useAppStore();
  const router = useRouter();

  const handleLogout = () => { logout(); router.push("/"); };

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-6">
      <h1 className="text-lg font-medium text-slate-200">{currentRole === "creator" ? "Creator Dashboard" : "Agency Dashboard"}</h1>
      <div className="flex items-center gap-4">
        <select value={currentRole} onChange={(e) => setRole(e.target.value as "creator" | "agency")} className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary">
          <option value="creator">Creator</option>
          <option value="agency">Agency</option>
        </select>
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-200">{user?.name || "User"}</p>
            <p className="text-xs text-slate-500">{user?.email || user?.walletAddress?.slice(0, 10) + "..."}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-medium">{user?.name?.charAt(0) || "U"}</div>
          <button onClick={handleLogout} className="text-slate-400 hover:text-slate-200 transition-colors" title="Logout">↪</button>
        </div>
      </div>
    </header>
  );
}
