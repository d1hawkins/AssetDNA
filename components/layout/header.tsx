"use client";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";

export function Header() {
  const { user, currentRole, setRole, logout, toggleSidebar } = useAppStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-slate-200">
          {currentRole === "creator" ? "Creator Dashboard" : "Agency Dashboard"}
        </h1>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <select
          value={currentRole}
          onChange={(e) => setRole(e.target.value as "creator" | "agency")}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
        >
          <option value="creator">Creator</option>
          <option value="agency">Agency</option>
        </select>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-200">{user?.name || "User"}</p>
            <p className="text-xs text-slate-500">
              {user?.email || user?.walletAddress?.slice(0, 10) + "..."}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-medium text-sm ring-2 ring-transparent hover:ring-primary/30 transition-all cursor-pointer">
            {user?.name?.charAt(0) || "U"}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
