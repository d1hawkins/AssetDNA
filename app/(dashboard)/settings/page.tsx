"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Card, Button, Input } from "@/components/ui";

export default function SettingsPage() {
  const { user, logout } = useAppStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000); };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>
      <Card>
        <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
        <div className="space-y-4">
          <Input label="Display Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {user?.walletAddress && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Wallet Address</label>
              <code className="block bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm">{user.walletAddress}</code>
            </div>
          )}
          <Button onClick={handleSave}>{saved ? "✓ Saved" : "Save Changes"}</Button>
        </div>
      </Card>
      <Card>
        <h2 className="text-lg font-semibold text-white mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div><p className="text-slate-200">Auto-rotate 3D Viewer</p><p className="text-sm text-slate-500">Automatically rotate models on load</p></div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div><p className="text-slate-200">Email Notifications</p><p className="text-sm text-slate-500">Receive updates about your assets</p></div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
          </div>
        </div>
      </Card>
      <Card className="border-red-900/50">
        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div><p className="text-slate-200">Sign Out</p><p className="text-sm text-slate-500">Sign out of your account</p></div>
          <Button variant="secondary" onClick={logout}>Sign Out</Button>
        </div>
      </Card>
    </div>
  );
}
