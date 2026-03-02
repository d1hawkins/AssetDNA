"use client";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, Badge } from "@/components/ui";
import { Upload, Shirt, FileText, CheckCircle, Box, ShieldCheck } from "lucide-react";

export default function DashboardPage() {
  const { user, currentRole, assets, talent, activity } = useAppStore();
  const totalWardrobe = assets.reduce((acc, a) => acc + a.wardrobeItems.length, 0);

  const formatTimeAgo = (ts: string) => {
    const h = Math.floor((Date.now() - new Date(ts).getTime()) / 3600000);
    return h < 1 ? "Just now" : h < 24 ? h + "h ago" : Math.floor(h / 24) + "d ago";
  };

  const activityIcon = (t: string) => {
    const icons: Record<string, React.ReactNode> = {
      upload: <Upload className="w-5 h-5 text-blue-400" />,
      wardrobe: <Shirt className="w-5 h-5 text-purple-400" />,
      licence: <FileText className="w-5 h-5 text-amber-400" />,
      verification: <CheckCircle className="w-5 h-5 text-emerald-400" />,
    };
    return icons[t] || <Box className="w-5 h-5 text-slate-400" />;
  };

  return (
    <div className="space-y-10">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Welcome back, {user?.name?.split(" ")[0] || "Creator"}
        </h1>
        <p className="text-slate-400 mt-2">
          {currentRole === "creator"
            ? "Manage your digital assets and wardrobes"
            : "Oversee your talent roster and assets"}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {currentRole === "creator" ? (
          <>
            <Card>
              <CardContent>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total Assets
                </p>
                <p className="text-4xl font-semibold tracking-tight text-white mt-2">
                  {assets.length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  DNA Verified
                </p>
                <p className="text-4xl font-semibold tracking-tight text-emerald-400 mt-2">
                  {assets.length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Wardrobe Items
                </p>
                <p className="text-4xl font-semibold tracking-tight text-white mt-2">
                  {totalWardrobe}
                </p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardContent>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Talent Count
                </p>
                <p className="text-4xl font-semibold tracking-tight text-white mt-2">
                  {talent.length}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Total Assets
                </p>
                <p className="text-4xl font-semibold tracking-tight text-white mt-2">
                  {talent.reduce((a, t) => a + t.assetCount, 0)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                  Pending Approvals
                </p>
                <p className="text-4xl font-semibold tracking-tight text-amber-400 mt-2">
                  {talent.filter((t) => t.status === "pending").length}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-white">
            {currentRole === "creator" ? "Recent Assets" : "Talent Roster"}
          </h2>
          <Link href="/assets" className="text-sm text-primary hover:text-primary/80 font-medium">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {currentRole === "creator"
            ? assets.slice(0, 4).map((asset) => (
                <Link key={asset.id} href={`/assets/${asset.id}`}>
                  <Card hover>
                    <div className="aspect-square bg-slate-700/50 rounded-lg mb-3 flex items-center justify-center">
                      <Box className="w-12 h-12 text-slate-500" />
                    </div>
                    <p className="font-medium text-white truncate">{asset.name}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <Badge variant="success">
                        <ShieldCheck className="w-3 h-3" />
                        DNA
                      </Badge>
                      <span className="text-xs text-slate-400">
                        {asset.wardrobeItems.length} items
                      </span>
                    </div>
                  </Card>
                </Link>
              ))
            : talent.slice(0, 4).map((t) => (
                <Card key={t.id} hover>
                  <div className="aspect-square bg-slate-700/50 rounded-lg mb-3 flex items-center justify-center">
                    <Box className="w-12 h-12 text-slate-500" />
                  </div>
                  <p className="font-medium text-white truncate">{t.name}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge variant={t.status === "active" ? "success" : "warning"}>
                      {t.status}
                    </Badge>
                    <span className="text-xs text-slate-400">{t.assetCount} assets</span>
                  </div>
                </Card>
              ))}
        </div>
      </div>

      <div>
        <h2 className="text-xl font-semibold text-white mb-5">Recent Activity</h2>
        <Card>
          <CardContent className="divide-y divide-slate-700/50">
            {activity.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-4 first:pt-0 last:pb-0">
                <div className="flex-shrink-0">{activityIcon(item.type)}</div>
                <p className="flex-1 text-slate-200">{item.description}</p>
                <span className="text-sm text-slate-500">{formatTimeAgo(item.timestamp)}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
