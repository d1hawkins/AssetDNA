"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import { mockUsers } from "@/lib/mock-data";

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"choose" | "email" | "otp">("choose");

  const handleEmailSubmit = (e: React.FormEvent) => { e.preventDefault(); if (email) setStep("otp"); };
  const handleOtpSubmit = (e: React.FormEvent) => { e.preventDefault(); if (otp.length === 6) { login({ ...mockUsers[0], email }); router.push("/dashboard"); } };
  const handleWalletConnect = () => {
    const mockAddress = "0x" + Array.from({ length: 40 }, () => "0123456789abcdef"[Math.floor(Math.random() * 16)]).join("");
    login({ ...mockUsers[0], walletAddress: mockAddress, email: undefined });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-600/10 to-cyan-500/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl" />
      <div className="relative z-10 w-full max-w-md p-8 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-cyan-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">AssetDNA</span>
          </div>
          <p className="text-slate-400">Protect your digital identity</p>
        </div>
        {step === "choose" && (
          <div className="space-y-4">
            <Button onClick={() => setStep("email")} variant="secondary" className="w-full justify-center">Continue with Email</Button>
            <div className="relative"><div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-700" /></div><div className="relative flex justify-center text-sm"><span className="px-2 bg-slate-800 text-slate-500">or</span></div></div>
            <Button onClick={handleWalletConnect} className="w-full justify-center">🦊 Connect Wallet</Button>
          </div>
        )}
        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input type="email" label="Email Address" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <Button type="submit" className="w-full justify-center">Send OTP Code</Button>
            <button type="button" onClick={() => setStep("choose")} className="w-full text-sm text-slate-400 hover:text-slate-200">← Back</button>
          </form>
        )}
        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <p className="text-sm text-slate-400 text-center mb-4">Enter the 6-digit code sent to<br /><span className="text-slate-200">{email}</span></p>
            <Input type="text" label="Verification Code" placeholder="000000" value={otp} onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))} maxLength={6} className="text-center text-2xl tracking-widest font-mono" required />
            <Button type="submit" className="w-full justify-center" disabled={otp.length !== 6}>Verify & Login</Button>
            <button type="button" onClick={() => setStep("email")} className="w-full text-sm text-slate-400 hover:text-slate-200">← Back</button>
          </form>
        )}
      </div>
    </div>
  );
}
