"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Dropzone } from "@/components/upload";
import { ModelViewer } from "@/components/viewer";
import { Button, Input, Card } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import { generateMockHash, generateMockTokenId, generateMockTxHash } from "@/lib/mock-data";
import { CheckCircle, Eye, RefreshCw } from "lucide-react";

type UploadStep = "dropzone" | "preview" | "success";

export default function UploadPage() {
  const router = useRouter();
  const addAsset = useAppStore((state) => state.addAsset);
  const [step, setStep] = useState<UploadStep>("dropzone");
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [hash, setHash] = useState("");
  const [hashProgress, setHashProgress] = useState(0);
  const [isHashing, setIsHashing] = useState(false);
  const [newAssetId, setNewAssetId] = useState("");
  const [txHash, setTxHash] = useState("");

  const handleFileSelect = (selectedFile: File) => {
    setFile(selectedFile);
    setName(selectedFile.name.replace(/\.[^/.]+$/, ""));
    setStep("preview");
    setIsHashing(true);
    setHashProgress(0);
    const interval = setInterval(() => {
      setHashProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsHashing(false);
          setHash(generateMockHash());
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);
  };

  const handleRegister = () => {
    if (!name || !hash) return;
    const assetId = "asset-" + Date.now();
    addAsset({
      id: assetId,
      name,
      description,
      hash,
      tokenId: generateMockTokenId(),
      modelUrl: "/models/" + name.toLowerCase() + ".glb",
      thumbnailUrl: "/thumbnails/" + name.toLowerCase() + ".png",
      createdAt: new Date().toISOString(),
      ownerId: "user-1",
      wardrobeItems: [],
    });
    setNewAssetId(assetId);
    setTxHash(generateMockTxHash());
    setStep("success");
  };

  const handleReset = () => {
    setStep("dropzone");
    setFile(null);
    setName("");
    setDescription("");
    setHash("");
    setHashProgress(0);
  };

  if (step === "success") {
    return (
      <div className="max-w-md mx-auto text-center py-12">
        <Card className="py-10">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">DNA Registered</h2>
          <p className="text-slate-400 mb-6">Your asset has been registered on the blockchain.</p>
          <div className="text-left bg-slate-900/50 rounded-lg p-4 mb-6 space-y-3">
            <div className="flex justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Token ID</span>
              <span className="text-slate-200 font-mono text-sm">#{newAssetId.split("-")[1]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Transaction</span>
              <span className="text-slate-200 font-mono text-xs">{txHash.slice(0, 16)}...</span>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <Button onClick={() => router.push("/assets/" + newAssetId)}>
              <Eye className="w-4 h-4 mr-2" />
              View Asset
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              <RefreshCw className="w-4 h-4 mr-2" />
              Upload Another
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold tracking-tight text-white">Register New Asset</h1>
      {step === "dropzone" && <Dropzone onFileSelect={handleFileSelect} />}
      {step === "preview" && file && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div>
            <ModelViewer modelUrl="" className="aspect-square" />
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-slate-400">
                  {isHashing ? "Calculating hash..." : "Hash calculated"}
                </span>
                <span className="text-sm text-slate-400">{Math.round(hashProgress)}%</span>
              </div>
              <div className="h-2 bg-slate-700 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-primary to-cyan-500 transition-all duration-200"
                  style={{ width: hashProgress + "%" }}
                />
              </div>
            </div>
          </div>
          <Card>
            <h2 className="text-xl font-semibold text-white mb-6">Asset Details</h2>
            <div className="space-y-5">
              <Input label="Name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Enter asset name" />
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your asset..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">DNA Hash (SHA-256)</label>
                <div className="bg-slate-900 border border-slate-600 rounded-lg p-3">
                  {hash ? (
                    <code className="text-xs text-slate-300 font-mono break-all">{hash}</code>
                  ) : (
                    <span className="text-slate-500 text-sm">Calculating...</span>
                  )}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <Button onClick={handleRegister} disabled={!name || !hash} className="flex-1">
                  Register DNA
                </Button>
                <Button variant="secondary" onClick={handleReset}>
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
