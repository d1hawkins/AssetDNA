"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Card, Badge, Button, Input } from "@/components/ui";

export default function AssetsPage() {
  const { assets, currentRole, talent } = useAppStore();
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<"newest" | "oldest" | "name" | "wardrobe">("newest");

  const filteredAssets = assets
    .filter((a) => a.name.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => {
      switch (sortBy) {
        case "newest": return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest": return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name": return a.name.localeCompare(b.name);
        case "wardrobe": return b.wardrobeItems.length - a.wardrobeItems.length;
        default: return 0;
      }
    });

  if (currentRole === "agency") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-white">Talent Roster</h1><Button variant="secondary">+ Add Talent</Button></div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {talent.map((t) => (<Card key={t.id} hover><div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-5xl">👤</div><p className="font-medium text-white">{t.name}</p><div className="flex items-center gap-2 mt-2"><Badge variant={t.status === "active" ? "success" : "warning"}>{t.status}</Badge><span className="text-sm text-slate-400">{t.assetCount} assets</span></div></Card>))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between"><h1 className="text-2xl font-bold text-white">My Assets</h1><Link href="/upload"><Button>+ New Asset</Button></Link></div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]"><Input type="search" placeholder="Search assets..." value={search} onChange={(e) => setSearch(e.target.value)} /></div>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value as typeof sortBy)} className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary">
          <option value="newest">Newest First</option><option value="oldest">Oldest First</option><option value="name">Name A-Z</option><option value="wardrobe">Most Wardrobe Items</option>
        </select>
      </div>
      {filteredAssets.length === 0 ? (
        <Card className="text-center py-12"><p className="text-slate-400 mb-4">No assets found</p><Link href="/upload"><Button>Upload Your First Asset</Button></Link></Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <Link key={asset.id} href={`/assets/${asset.id}`}>
              <Card hover className="h-full"><div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-5xl">🎭</div>
              <p className="font-medium text-white truncate">{asset.name}</p><p className="text-sm text-slate-400 truncate mt-1">{asset.description}</p>
              <div className="flex items-center gap-2 mt-3"><Badge variant="success">✓ DNA</Badge><span className="text-xs text-slate-400">{asset.wardrobeItems.length} items</span></div></Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
