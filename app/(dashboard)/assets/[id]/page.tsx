"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { ModelViewer } from "@/components/viewer";
import { Card, Badge, Button } from "@/components/ui";
import { useState } from "react";

export default function AssetDetailPage() {
  const params = useParams();
  const router = useRouter();
  const assets = useAppStore((state) => state.assets);
  const [copied, setCopied] = useState(false);

  const asset = assets.find((a) => a.id === params.id);

  if (!asset) {
    return (<div className="text-center py-12"><p className="text-slate-400 mb-4">Asset not found</p><Link href="/assets"><Button variant="secondary">← Back to Assets</Button></Link></div>);
  }

  const copyHash = () => { navigator.clipboard.writeText(asset.hash); setCopied(true); setTimeout(() => setCopied(false), 2000); };
  const formatDate = (date: string) => new Date(date).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-white transition-colors">← Back to Assets</button>
        <div className="flex gap-2"><Button variant="secondary">Edit</Button><Button variant="secondary">Share</Button></div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2"><ModelViewer modelUrl={asset.modelUrl} className="aspect-[4/3]" /></div>
        <Card>
          <h1 className="text-2xl font-bold text-white mb-2">{asset.name}</h1>
          <p className="text-slate-400 mb-4">{asset.description}</p>
          <div className="space-y-4">
            <div><p className="text-sm text-slate-500">Created</p><p className="text-slate-200">{formatDate(asset.createdAt)}</p></div>
            <div><p className="text-sm text-slate-500">DNA Status</p><Badge variant="success" className="mt-1">✓ Verified</Badge></div>
            <div><p className="text-sm text-slate-500">Token ID</p><p className="text-slate-200 font-mono">#{asset.tokenId}</p></div>
            <div>
              <p className="text-sm text-slate-500">Hash (SHA-256)</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-xs text-slate-300 bg-slate-900 px-2 py-1 rounded font-mono truncate flex-1">{asset.hash.slice(0, 24)}...</code>
                <button onClick={copyHash} className="text-slate-400 hover:text-white transition-colors text-sm">{copied ? "✓" : "Copy"}</button>
              </div>
            </div>
          </div>
        </Card>
      </div>
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Wardrobe (ERC-6551)<span className="text-slate-400 font-normal ml-2">{asset.wardrobeItems.length} items</span></h2>
          <Button variant="secondary" size="sm">+ Add Item</Button>
        </div>
        {asset.wardrobeItems.length === 0 ? (
          <Card className="text-center py-8"><p className="text-slate-400 mb-4">No wardrobe items yet</p><p className="text-sm text-slate-500 mb-4">Add accessories, clothing, or props to this avatar</p><Button variant="secondary">+ Add First Item</Button></Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {asset.wardrobeItems.map((item) => (
              <Card key={item.id} hover className="p-4">
                <div className="aspect-square bg-slate-700 rounded-lg mb-2 flex items-center justify-center text-2xl">👕</div>
                <p className="text-sm font-medium text-white truncate">{item.name}</p>
                <p className="text-xs text-slate-500 font-mono">#{item.tokenId}</p>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
