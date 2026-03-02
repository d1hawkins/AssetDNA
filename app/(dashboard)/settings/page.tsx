"use client";
import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Card, Button, Input } from "@/components/ui";
import { Check, LogOut } from "lucide-react";

export default function SettingsPage() {
  const { user, logout } = useAppStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>

      <Card>
        <h2 className="text-xl font-semibold text-white mb-6">Profile</h2>
        <div className="space-y-5">
          <Input label="Display Name" value={name} onChange={(e) => setName(e.target.value)} />
          <Input label="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
          {user?.walletAddress && (
            <div>
              <label className="block text-xs font-medium uppercase tracking-wide text-slate-500 mb-2">
                Wallet Address
              </label>
              <code className="block bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm">
                {user.walletAddress}
              </code>
            </div>
          )}
          <Button onClick={handleSave}>
            {saved ? (
              <>
                <Check className="w-4 h-4 mr-2" />
                Saved
              </>
            ) : (
              "Save Changes"
            )}
          </Button>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold text-white mb-6">Preferences</h2>
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-200 font-medium">Auto-rotate 3D Viewer</p>
              <p className="text-sm text-slate-500">Automatically rotate models on load</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-200 font-medium">Email Notifications</p>
              <p className="text-sm text-slate-500">Receive updates about your assets</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary rounded" />
          </div>
        </div>
      </Card>

      <Card className="border-red-900/30">
        <h2 className="text-xl font-semibold text-red-400 mb-6">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-200 font-medium">Sign Out</p>
            <p className="text-sm text-slate-500">Sign out of your account</p>
          </div>
          <Button variant="secondary" onClick={logout}>
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
}
