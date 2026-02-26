"use client";
import { useCallback, useState } from "react";

interface DropzoneProps {
  onFileSelect: (file: File) => void;
  accept?: string;
  maxSize?: number;
}

export function Dropzone({ onFileSelect, accept = ".glb,.gltf,.fbx,.vrm", maxSize = 1024 * 1024 * 1024 }: DropzoneProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFile = useCallback((file: File) => {
    setError(null);
    if (file.size > maxSize) { setError("File too large. Maximum size is " + Math.round(maxSize / 1024 / 1024) + "MB"); return; }
    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowedExts = accept.split(",").map(e => e.replace(".", "").trim());
    if (ext && !allowedExts.includes(ext)) { setError("Invalid file type. Allowed: " + allowedExts.join(", ")); return; }
    onFileSelect(file);
  }, [onFileSelect, accept, maxSize]);

  const handleDrop = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if (file) handleFile(file); }, [handleFile]);
  const handleDragOver = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(true); }, []);
  const handleDragLeave = useCallback((e: React.DragEvent) => { e.preventDefault(); setIsDragging(false); }, []);
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => { const file = e.target.files?.[0]; if (file) handleFile(file); }, [handleFile]);

  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} onDragLeave={handleDragLeave}
      className={"border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer " + (isDragging ? "border-primary bg-primary/10" : "border-slate-600 hover:border-slate-500 bg-slate-800/50")}>
      <input type="file" accept={accept} onChange={handleInputChange} className="hidden" id="file-upload" />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="text-5xl mb-4">📁</div>
        <p className="text-lg text-slate-200 mb-2">Drag & drop your 3D asset here</p>
        <p className="text-slate-400">or click to browse</p>
        <p className="text-sm text-slate-500 mt-4">Supported: GLTF, GLB, FBX, VRM (up to 1GB)</p>
      </label>
      {error && <p className="text-red-400 text-sm mt-4">{error}</p>}
    </div>
  );
}
