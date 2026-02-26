"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, Badge } from "@/components/ui";

export default function DashboardPage() {
  const { user, currentRole, assets, talent, activity } = useAppStore();
  const totalWardrobe = assets.reduce((acc, a) => acc + a.wardrobeItems.length, 0);
  const formatTimeAgo = (ts: string) => { const h = Math.floor((Date.now() - new Date(ts).getTime()) / 3600000); return h < 1 ? "Just now" : h < 24 ? h + "h ago" : Math.floor(h / 24) + "d ago"; };
  const activityIcon = (t: string) => ({ upload: "📤", wardrobe: "👕", licence: "📜", verification: "✓" }[t] || "•");

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Welcome back, {user?.name?.split(" ")[0] || "Creator"}</h1>
        <p className="text-slate-400 mt-1">{currentRole === "creator" ? "Manage your digital assets and wardrobes" : "Oversee your talent roster and assets"}</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentRole === "creator" ? (
          <><Card><CardContent><p className="text-slate-400 text-sm">Total Assets</p><p className="text-3xl font-bold text-white mt-1">{assets.length}</p></CardContent></Card>
          <Card><CardContent><p className="text-slate-400 text-sm">DNA Verified</p><p className="text-3xl font-bold text-emerald-400 mt-1">{assets.length}</p></CardContent></Card>
          <Card><CardContent><p className="text-slate-400 text-sm">Wardrobe Items</p><p className="text-3xl font-bold text-white mt-1">{totalWardrobe}</p></CardContent></Card></>
        ) : (
          <><Card><CardContent><p className="text-slate-400 text-sm">Talent Count</p><p className="text-3xl font-bold text-white mt-1">{talent.length}</p></CardContent></Card>
          <Card><CardContent><p className="text-slate-400 text-sm">Total Assets</p><p className="text-3xl font-bold text-white mt-1">{talent.reduce((a, t) => a + t.assetCount, 0)}</p></CardContent></Card>
          <Card><CardContent><p className="text-slate-400 text-sm">Pending Approvals</p><p className="text-3xl font-bold text-amber-400 mt-1">{talent.filter((t) => t.status === "pending").length}</p></CardContent></Card></>
        )}
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">{currentRole === "creator" ? "Recent Assets" : "Talent Roster"}</h2>
          <Link href="/assets" className="text-sm text-primary hover:text-primary/80">View All →</Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentRole === "creator"
            ? assets.slice(0, 4).map((asset) => (
                <Link key={asset.id} href={`/assets/${asset.id}`}>
                  <Card hover><div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-4xl">🎭</div>
                  <p className="font-medium text-white truncate">{asset.name}</p>
                  <div className="flex items-center gap-2 mt-1"><Badge variant="success">✓ DNA</Badge><span className="text-xs text-slate-400">{asset.wardrobeItems.length} items</span></div></Card>
                </Link>))
            : talent.slice(0, 4).map((t) => (
                <Card key={t.id} hover><div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-4xl">👤</div>
                <p className="font-medium text-white truncate">{t.name}</p>
                <div className="flex items-center gap-2 mt-1"><Badge variant={t.status === "active" ? "success" : "warning"}>{t.status}</Badge><span className="text-xs text-slate-400">{t.assetCount} assets</span></div></Card>))}
        </div>
      </div>
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <Card><CardContent className="divide-y divide-slate-700">
          {activity.slice(0, 5).map((item) => (
            <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
              <span className="text-xl">{activityIcon(item.type)}</span>
              <p className="flex-1 text-slate-200">{item.description}</p>
              <span className="text-sm text-slate-500">{formatTimeAgo(item.timestamp)}</span>
            </div>
          ))}
        </CardContent></Card>
      </div>
    </div>
  );
}
