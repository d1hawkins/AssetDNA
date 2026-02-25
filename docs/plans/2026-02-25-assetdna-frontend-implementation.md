# AssetDNA Frontend Prototype Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build an interactive prototype demonstrating the AssetDNA user journey (Login → Upload → 3D Viewer → Wardrobe) with mock data.

**Architecture:** Next.js 14 App Router with route groups for auth and dashboard layouts. Zustand store with localStorage persistence for mock auth and asset data. React Three Fiber for WebGL viewer.

**Tech Stack:** Next.js 14, Tailwind CSS, React Three Fiber, @react-three/drei, Zustand, TypeScript

**Design Reference:** `docs/plans/2026-02-25-assetdna-frontend-prototype-design.md`

**Mockups:** `docs/mockups/`

---

## Task 1: Project Setup

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `tailwind.config.ts`
- Create: `next.config.js`
- Create: `app/layout.tsx`
- Create: `app/globals.css`

**Step 1: Initialize Next.js project**

Run:
```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias="@/*" --use-npm
```

When prompted, accept defaults. This creates the base Next.js 14 project.

**Step 2: Install additional dependencies**

Run:
```bash
npm install zustand three @react-three/fiber @react-three/drei @types/three
```

**Step 3: Update tailwind.config.ts with design system colors**

Replace content of `tailwind.config.ts`:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7C3AED",
          50: "#F5F3FF",
          100: "#EDE9FE",
          200: "#DDD6FE",
          300: "#C4B5FD",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#4C1D95",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #7C3AED 0%, #2563EB 50%, #06B6D4 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 4: Update app/globals.css with base styles**

Replace content of `app/globals.css`:

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-slate-900 text-slate-50 antialiased;
  }
}

@layer components {
  .btn-primary {
    @apply bg-gradient-primary text-white font-medium px-6 py-3 rounded-lg
           hover:brightness-110 transition-all duration-150;
  }

  .btn-secondary {
    @apply bg-transparent border border-slate-600 text-slate-200 font-medium
           px-6 py-3 rounded-lg hover:bg-slate-700 transition-all duration-150;
  }

  .card {
    @apply bg-slate-800/80 border border-slate-700 rounded-xl p-6
           backdrop-blur-sm;
  }

  .input {
    @apply bg-slate-900 border border-slate-600 rounded-lg px-4 py-3
           text-slate-50 placeholder-slate-500
           focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary;
  }
}
```

**Step 5: Verify setup works**

Run:
```bash
npm run dev
```

Expected: Dev server starts at localhost:3000 with no errors.

**Step 6: Commit**

```bash
git add -A && git commit -m "$(cat <<'EOF'
chore: initialize Next.js project with Tailwind and dependencies

- Next.js 14 with App Router
- Tailwind CSS with custom design system colors
- React Three Fiber for 3D rendering
- Zustand for state management

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 2: Type Definitions and Mock Data

**Files:**
- Create: `lib/types.ts`
- Create: `lib/mock-data.ts`

**Step 1: Create type definitions**

Create `lib/types.ts`:

```typescript
export interface User {
  id: string;
  name: string;
  email?: string;
  walletAddress?: string;
  role: "creator" | "agency";
  avatarUrl?: string;
}

export interface WardrobeItem {
  id: string;
  name: string;
  parentAssetId: string;
  modelUrl: string;
  thumbnailUrl: string;
  tokenId: string;
  createdAt: string;
}

export interface Asset {
  id: string;
  name: string;
  description: string;
  hash: string;
  tokenId: string;
  modelUrl: string;
  thumbnailUrl: string;
  createdAt: string;
  ownerId: string;
  wardrobeItems: WardrobeItem[];
}

export interface AgencyTalent {
  id: string;
  name: string;
  avatarUrl: string;
  assetCount: number;
  status: "active" | "pending";
}

export interface ActivityItem {
  id: string;
  type: "upload" | "wardrobe" | "licence" | "verification";
  description: string;
  assetId?: string;
  timestamp: string;
}
```

**Step 2: Create mock data**

Create `lib/mock-data.ts`:

```typescript
import { Asset, User, AgencyTalent, ActivityItem } from "./types";

export const mockUsers: User[] = [
  {
    id: "user-1",
    name: "Alex Chen",
    email: "alex@example.com",
    role: "creator",
    avatarUrl: "/avatars/alex.png",
  },
  {
    id: "agency-1",
    name: "Digital Talent Agency",
    email: "admin@digitaltalent.com",
    role: "agency",
    avatarUrl: "/avatars/agency.png",
  },
];

export const mockAssets: Asset[] = [
  {
    id: "asset-1",
    name: "Nova",
    description: "Futuristic android character with customizable armor plating",
    hash: "a3f2b8c9d1e4f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0",
    tokenId: "1001",
    modelUrl: "/models/nova.glb",
    thumbnailUrl: "/thumbnails/nova.png",
    createdAt: "2025-05-20T10:30:00Z",
    ownerId: "user-1",
    wardrobeItems: [
      {
        id: "ward-1-1",
        name: "Combat Jacket",
        parentAssetId: "asset-1",
        modelUrl: "/models/jacket.glb",
        thumbnailUrl: "/thumbnails/jacket.png",
        tokenId: "1001-1",
        createdAt: "2025-05-21T14:00:00Z",
      },
      {
        id: "ward-1-2",
        name: "Plasma Boots",
        parentAssetId: "asset-1",
        modelUrl: "/models/boots.glb",
        thumbnailUrl: "/thumbnails/boots.png",
        tokenId: "1001-2",
        createdAt: "2025-05-22T09:15:00Z",
      },
      {
        id: "ward-1-3",
        name: "Holo Visor",
        parentAssetId: "asset-1",
        modelUrl: "/models/visor.glb",
        thumbnailUrl: "/thumbnails/visor.png",
        tokenId: "1001-3",
        createdAt: "2025-05-23T16:45:00Z",
      },
      {
        id: "ward-1-4",
        name: "Energy Sword",
        parentAssetId: "asset-1",
        modelUrl: "/models/sword.glb",
        thumbnailUrl: "/thumbnails/sword.png",
        tokenId: "1001-4",
        createdAt: "2025-05-24T11:30:00Z",
      },
    ],
  },
  {
    id: "asset-2",
    name: "Zephyr",
    description: "Wind-themed elemental character with flowing cloth dynamics",
    hash: "b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5",
    tokenId: "1002",
    modelUrl: "/models/zephyr.glb",
    thumbnailUrl: "/thumbnails/zephyr.png",
    createdAt: "2025-05-18T08:00:00Z",
    ownerId: "user-1",
    wardrobeItems: [
      {
        id: "ward-2-1",
        name: "Storm Cloak",
        parentAssetId: "asset-2",
        modelUrl: "/models/cloak.glb",
        thumbnailUrl: "/thumbnails/cloak.png",
        tokenId: "1002-1",
        createdAt: "2025-05-19T10:00:00Z",
      },
      {
        id: "ward-2-2",
        name: "Wind Staff",
        parentAssetId: "asset-2",
        modelUrl: "/models/staff.glb",
        thumbnailUrl: "/thumbnails/staff.png",
        tokenId: "1002-2",
        createdAt: "2025-05-19T14:30:00Z",
      },
    ],
  },
  {
    id: "asset-3",
    name: "Atlas",
    description: "Heavy-armored guardian with stone-textured skin",
    hash: "c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6",
    tokenId: "1003",
    modelUrl: "/models/atlas.glb",
    thumbnailUrl: "/thumbnails/atlas.png",
    createdAt: "2025-05-15T12:00:00Z",
    ownerId: "user-1",
    wardrobeItems: [
      {
        id: "ward-3-1",
        name: "Titan Shield",
        parentAssetId: "asset-3",
        modelUrl: "/models/shield.glb",
        thumbnailUrl: "/thumbnails/shield.png",
        tokenId: "1003-1",
        createdAt: "2025-05-16T09:00:00Z",
      },
      {
        id: "ward-3-2",
        name: "Stone Gauntlets",
        parentAssetId: "asset-3",
        modelUrl: "/models/gauntlets.glb",
        thumbnailUrl: "/thumbnails/gauntlets.png",
        tokenId: "1003-2",
        createdAt: "2025-05-16T11:00:00Z",
      },
      {
        id: "ward-3-3",
        name: "Earth Helm",
        parentAssetId: "asset-3",
        modelUrl: "/models/helm.glb",
        thumbnailUrl: "/thumbnails/helm.png",
        tokenId: "1003-3",
        createdAt: "2025-05-17T08:00:00Z",
      },
      {
        id: "ward-3-4",
        name: "Boulder Hammer",
        parentAssetId: "asset-3",
        modelUrl: "/models/hammer.glb",
        thumbnailUrl: "/thumbnails/hammer.png",
        tokenId: "1003-4",
        createdAt: "2025-05-17T14:00:00Z",
      },
      {
        id: "ward-3-5",
        name: "Granite Pauldrons",
        parentAssetId: "asset-3",
        modelUrl: "/models/pauldrons.glb",
        thumbnailUrl: "/thumbnails/pauldrons.png",
        tokenId: "1003-5",
        createdAt: "2025-05-17T16:00:00Z",
      },
      {
        id: "ward-3-6",
        name: "Quake Boots",
        parentAssetId: "asset-3",
        modelUrl: "/models/quakeboots.glb",
        thumbnailUrl: "/thumbnails/quakeboots.png",
        tokenId: "1003-6",
        createdAt: "2025-05-18T10:00:00Z",
      },
      {
        id: "ward-3-7",
        name: "Obsidian Cape",
        parentAssetId: "asset-3",
        modelUrl: "/models/cape.glb",
        thumbnailUrl: "/thumbnails/cape.png",
        tokenId: "1003-7",
        createdAt: "2025-05-18T15:00:00Z",
      },
    ],
  },
  {
    id: "asset-4",
    name: "Luna",
    description: "Ethereal moon priestess with luminescent features",
    hash: "d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7",
    tokenId: "1004",
    modelUrl: "/models/luna.glb",
    thumbnailUrl: "/thumbnails/luna.png",
    createdAt: "2025-05-10T18:00:00Z",
    ownerId: "user-1",
    wardrobeItems: [],
  },
  {
    id: "asset-5",
    name: "Orion",
    description: "Star hunter with constellation-mapped armor",
    hash: "e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8",
    tokenId: "1005",
    modelUrl: "/models/orion.glb",
    thumbnailUrl: "/thumbnails/orion.png",
    createdAt: "2025-05-08T14:00:00Z",
    ownerId: "user-1",
    wardrobeItems: [
      {
        id: "ward-5-1",
        name: "Celestial Bow",
        parentAssetId: "asset-5",
        modelUrl: "/models/bow.glb",
        thumbnailUrl: "/thumbnails/bow.png",
        tokenId: "1005-1",
        createdAt: "2025-05-09T10:00:00Z",
      },
      {
        id: "ward-5-2",
        name: "Star Quiver",
        parentAssetId: "asset-5",
        modelUrl: "/models/quiver.glb",
        thumbnailUrl: "/thumbnails/quiver.png",
        tokenId: "1005-2",
        createdAt: "2025-05-09T12:00:00Z",
      },
      {
        id: "ward-5-3",
        name: "Nebula Cloak",
        parentAssetId: "asset-5",
        modelUrl: "/models/nebulacloak.glb",
        thumbnailUrl: "/thumbnails/nebulacloak.png",
        tokenId: "1005-3",
        createdAt: "2025-05-10T09:00:00Z",
      },
    ],
  },
];

export const mockTalent: AgencyTalent[] = [
  { id: "talent-1", name: "Alex M.", avatarUrl: "/avatars/talent1.png", assetCount: 6, status: "active" },
  { id: "talent-2", name: "Jordan K.", avatarUrl: "/avatars/talent2.png", assetCount: 4, status: "active" },
  { id: "talent-3", name: "Sam Chen", avatarUrl: "/avatars/talent3.png", assetCount: 8, status: "pending" },
  { id: "talent-4", name: "Riley Park", avatarUrl: "/avatars/talent4.png", assetCount: 3, status: "active" },
];

export const mockActivity: ActivityItem[] = [
  {
    id: "act-1",
    type: "wardrobe",
    description: "Nova wardrobe updated - 2 new items",
    assetId: "asset-1",
    timestamp: "2025-05-24T14:30:00Z",
  },
  {
    id: "act-2",
    type: "verification",
    description: "Zephyr DNA registered",
    assetId: "asset-2",
    timestamp: "2025-05-23T10:00:00Z",
  },
  {
    id: "act-3",
    type: "licence",
    description: "Atlas licensed to Studio X",
    assetId: "asset-3",
    timestamp: "2025-05-21T16:00:00Z",
  },
  {
    id: "act-4",
    type: "upload",
    description: "Luna uploaded and verified",
    assetId: "asset-4",
    timestamp: "2025-05-10T18:30:00Z",
  },
];

export function generateMockHash(): string {
  const chars = "0123456789abcdef";
  let hash = "";
  for (let i = 0; i < 64; i++) {
    hash += chars[Math.floor(Math.random() * chars.length)];
  }
  return hash;
}

export function generateMockTokenId(): string {
  return String(1000 + Math.floor(Math.random() * 9000));
}

export function generateMockTxHash(): string {
  return "0x" + generateMockHash().slice(0, 40);
}
```

**Step 3: Commit**

```bash
git add lib/ && git commit -m "$(cat <<'EOF'
feat: add type definitions and mock data

- User, Asset, WardrobeItem, AgencyTalent types
- 5 sample avatars with wardrobe items
- Activity feed data
- Mock hash/token generators

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 3: Zustand Store

**Files:**
- Create: `lib/store.ts`

**Step 1: Create Zustand store with localStorage persistence**

Create `lib/store.ts`:

```typescript
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User, Asset, AgencyTalent, ActivityItem } from "./types";
import { mockAssets, mockTalent, mockActivity } from "./mock-data";

interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;

  // Role
  currentRole: "creator" | "agency";

  // Data
  assets: Asset[];
  talent: AgencyTalent[];
  activity: ActivityItem[];

  // Actions
  login: (user: User) => void;
  logout: () => void;
  setRole: (role: "creator" | "agency") => void;
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;
  addWardrobeItem: (assetId: string, item: Asset["wardrobeItems"][0]) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set) => ({
      // Initial state
      user: null,
      isAuthenticated: false,
      currentRole: "creator",
      assets: mockAssets,
      talent: mockTalent,
      activity: mockActivity,

      // Actions
      login: (user) =>
        set({
          user,
          isAuthenticated: true,
          currentRole: user.role,
        }),

      logout: () =>
        set({
          user: null,
          isAuthenticated: false,
        }),

      setRole: (role) => set({ currentRole: role }),

      addAsset: (asset) =>
        set((state) => ({
          assets: [asset, ...state.assets],
          activity: [
            {
              id: `act-${Date.now()}`,
              type: "upload",
              description: `${asset.name} uploaded and verified`,
              assetId: asset.id,
              timestamp: new Date().toISOString(),
            },
            ...state.activity,
          ],
        })),

      updateAsset: (id, updates) =>
        set((state) => ({
          assets: state.assets.map((a) =>
            a.id === id ? { ...a, ...updates } : a
          ),
        })),

      addWardrobeItem: (assetId, item) =>
        set((state) => ({
          assets: state.assets.map((a) =>
            a.id === assetId
              ? { ...a, wardrobeItems: [...a.wardrobeItems, item] }
              : a
          ),
          activity: [
            {
              id: `act-${Date.now()}`,
              type: "wardrobe",
              description: `${item.name} added to wardrobe`,
              assetId,
              timestamp: new Date().toISOString(),
            },
            ...state.activity,
          ],
        })),
    }),
    {
      name: "assetdna-storage",
      partialize: (state) => ({
        user: state.user,
        isAuthenticated: state.isAuthenticated,
        currentRole: state.currentRole,
        assets: state.assets,
        activity: state.activity,
      }),
    }
  )
);
```

**Step 2: Commit**

```bash
git add lib/store.ts && git commit -m "$(cat <<'EOF'
feat: add Zustand store with localStorage persistence

- Auth state management
- Role switching (creator/agency)
- Asset CRUD operations
- Activity feed updates

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 4: UI Components - Buttons and Inputs

**Files:**
- Create: `components/ui/button.tsx`
- Create: `components/ui/input.tsx`
- Create: `components/ui/badge.tsx`
- Create: `components/ui/card.tsx`

**Step 1: Create Button component**

Create `components/ui/button.tsx`:

```typescript
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const baseStyles = "font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      primary: "bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white hover:brightness-110",
      secondary: "bg-transparent border border-slate-600 text-slate-200 hover:bg-slate-700",
      ghost: "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800",
    };

    const sizes = {
      sm: "px-3 py-1.5 text-sm",
      md: "px-6 py-3 text-base",
      lg: "px-8 py-4 text-lg",
    };

    return (
      <button
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
```

**Step 2: Create Input component**

Create `components/ui/input.tsx`:

```typescript
import { forwardRef, InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-slate-300 mb-2">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`w-full bg-slate-900 border rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500
            focus:outline-none focus:ring-1 transition-colors
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500" : "border-slate-600 focus:border-primary focus:ring-primary"}
            ${className}`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
```

**Step 3: Create Badge component**

Create `components/ui/badge.tsx`:

```typescript
interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info" | "default";
  children: React.ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  const variants = {
    success: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    warning: "bg-amber-500/20 text-amber-400 border-amber-500/30",
    error: "bg-red-500/20 text-red-400 border-red-500/30",
    info: "bg-blue-500/20 text-blue-400 border-blue-500/30",
    default: "bg-slate-500/20 text-slate-400 border-slate-500/30",
  };

  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium rounded border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
```

**Step 4: Create Card component**

Create `components/ui/card.tsx`:

```typescript
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = "", hover = false, onClick }: CardProps) {
  return (
    <div
      className={`bg-slate-800/80 border border-slate-700 rounded-xl p-6 backdrop-blur-sm
        ${hover ? "hover:border-slate-600 hover:shadow-lg hover:scale-[1.02] transition-all duration-200 cursor-pointer" : ""}
        ${className}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`mb-4 ${className}`}>{children}</div>;
}

export function CardTitle({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <h3 className={`text-lg font-semibold text-slate-50 ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
```

**Step 5: Create index export**

Create `components/ui/index.ts`:

```typescript
export { Button } from "./button";
export { Input } from "./input";
export { Badge } from "./badge";
export { Card, CardHeader, CardTitle, CardContent } from "./card";
```

**Step 6: Commit**

```bash
git add components/ && git commit -m "$(cat <<'EOF'
feat: add base UI components

- Button (primary, secondary, ghost variants)
- Input with label and error states
- Badge for status indicators
- Card with hover effects

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 5: Layout Components - Sidebar and Header

**Files:**
- Create: `components/layout/sidebar.tsx`
- Create: `components/layout/header.tsx`
- Create: `components/layout/index.ts`

**Step 1: Create Sidebar component**

Create `components/layout/sidebar.tsx`:

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: "📊" },
  { href: "/assets", label: "My Assets", icon: "🎭" },
  { href: "/upload", label: "Upload", icon: "📤" },
];

const bottomItems = [
  { href: "/settings", label: "Settings", icon: "⚙️" },
];

export function Sidebar() {
  const pathname = usePathname();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col">
      {/* Logo */}
      <div className="p-6 border-b border-slate-800">
        <Link href="/dashboard" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary via-blue-600 to-cyan-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            AssetDNA
          </span>
        </Link>
      </div>

      {/* Main Nav */}
      <nav className="flex-1 p-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.href)
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom Nav */}
      <div className="p-4 border-t border-slate-800">
        <ul className="space-y-1">
          {bottomItems.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                  ${isActive(item.href)
                    ? "bg-slate-800 text-white"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                  }`}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
```

**Step 2: Create Header component**

Create `components/layout/header.tsx`:

```typescript
"use client";

import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";

export function Header() {
  const { user, currentRole, setRole, logout } = useAppStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <h1 className="text-lg font-medium text-slate-200">
          {currentRole === "creator" ? "Creator Dashboard" : "Agency Dashboard"}
        </h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Role Switcher */}
        <select
          value={currentRole}
          onChange={(e) => setRole(e.target.value as "creator" | "agency")}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-sm text-slate-200 focus:outline-none focus:border-primary"
        >
          <option value="creator">Creator</option>
          <option value="agency">Agency</option>
        </select>

        {/* User Menu */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-sm font-medium text-slate-200">{user?.name || "User"}</p>
            <p className="text-xs text-slate-500">{user?.email || user?.walletAddress?.slice(0, 10) + "..."}</p>
          </div>
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-medium">
            {user?.name?.charAt(0) || "U"}
          </div>
          <button
            onClick={handleLogout}
            className="text-slate-400 hover:text-slate-200 transition-colors"
            title="Logout"
          >
            ↪
          </button>
        </div>
      </div>
    </header>
  );
}
```

**Step 3: Create index export**

Create `components/layout/index.ts`:

```typescript
export { Sidebar } from "./sidebar";
export { Header } from "./header";
```

**Step 4: Commit**

```bash
git add components/layout/ && git commit -m "$(cat <<'EOF'
feat: add layout components

- Sidebar with navigation links
- Header with role switcher and user menu
- Active state highlighting

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 6: Login Page

**Files:**
- Create: `app/(auth)/login/page.tsx`
- Modify: `app/page.tsx`

**Step 1: Create login page**

Create directory and file `app/(auth)/login/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Input } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import { mockUsers } from "@/lib/mock-data";

export default function LoginPage() {
  const router = useRouter();
  const login = useAppStore((state) => state.login);
  const [authMethod, setAuthMethod] = useState<"email" | "wallet" | null>(null);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState<"choose" | "email" | "otp" | "wallet">("choose");

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setStep("otp");
    }
  };

  const handleOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length === 6) {
      // Mock login with creator user
      login({ ...mockUsers[0], email });
      router.push("/dashboard");
    }
  };

  const handleWalletConnect = () => {
    // Mock wallet connection
    const mockAddress = "0x" + Array.from({ length: 40 }, () =>
      "0123456789abcdef"[Math.floor(Math.random() * 16)]
    ).join("");

    login({
      ...mockUsers[0],
      walletAddress: mockAddress,
      email: undefined,
    });
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-blue-600/10 to-cyan-500/20" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl" />

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md p-8 bg-slate-800/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-r from-primary via-blue-600 to-cyan-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              AssetDNA
            </span>
          </div>
          <p className="text-slate-400">Protect your digital identity</p>
        </div>

        {/* Auth Forms */}
        {step === "choose" && (
          <div className="space-y-4">
            <Button
              onClick={() => setStep("email")}
              variant="secondary"
              className="w-full justify-center"
            >
              Continue with Email
            </Button>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-700" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-slate-800 text-slate-500">or</span>
              </div>
            </div>
            <Button
              onClick={handleWalletConnect}
              className="w-full justify-center"
            >
              🦊 Connect Wallet
            </Button>
          </div>
        )}

        {step === "email" && (
          <form onSubmit={handleEmailSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email Address"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button type="submit" className="w-full justify-center">
              Send OTP Code
            </Button>
            <button
              type="button"
              onClick={() => setStep("choose")}
              className="w-full text-sm text-slate-400 hover:text-slate-200"
            >
              ← Back
            </button>
          </form>
        )}

        {step === "otp" && (
          <form onSubmit={handleOtpSubmit} className="space-y-4">
            <p className="text-sm text-slate-400 text-center mb-4">
              Enter the 6-digit code sent to<br />
              <span className="text-slate-200">{email}</span>
            </p>
            <Input
              type="text"
              label="Verification Code"
              placeholder="000000"
              value={otp}
              onChange={(e) => setOtp(e.target.value.replace(/\D/g, "").slice(0, 6))}
              maxLength={6}
              className="text-center text-2xl tracking-widest font-mono"
              required
            />
            <Button type="submit" className="w-full justify-center" disabled={otp.length !== 6}>
              Verify & Login
            </Button>
            <button
              type="button"
              onClick={() => setStep("email")}
              className="w-full text-sm text-slate-400 hover:text-slate-200"
            >
              ← Back
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
```

**Step 2: Update root page to redirect**

Replace `app/page.tsx`:

```typescript
import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login");
}
```

**Step 3: Create auth layout (optional route group)**

Create `app/(auth)/layout.tsx`:

```typescript
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
```

**Step 4: Verify login page works**

Run:
```bash
npm run dev
```

Navigate to localhost:3000 - should see login page.

**Step 5: Commit**

```bash
git add app/ && git commit -m "$(cat <<'EOF'
feat: add login page with email and wallet auth

- Email + OTP flow (mocked)
- Wallet connect flow (mocked)
- Gradient background with blur effects
- Redirects to dashboard on success

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 7: Dashboard Layout

**Files:**
- Create: `app/(dashboard)/layout.tsx`
- Create: `app/(dashboard)/dashboard/page.tsx`

**Step 1: Create dashboard layout with sidebar**

Create `app/(dashboard)/layout.tsx`:

```typescript
"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Sidebar, Header } from "@/components/layout";
import { useAppStore } from "@/lib/store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const isAuthenticated = useAppStore((state) => state.isAuthenticated);

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, router]);

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-900">
      <Sidebar />
      <div className="ml-64">
        <Header />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
```

**Step 2: Create dashboard page**

Create `app/(dashboard)/dashboard/page.tsx`:

```typescript
"use client";

import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Card, CardContent, Badge } from "@/components/ui";

export default function DashboardPage() {
  const { user, currentRole, assets, talent, activity } = useAppStore();

  const totalWardrobe = assets.reduce((acc, a) => acc + a.wardrobeItems.length, 0);

  const formatTimeAgo = (timestamp: string) => {
    const diff = Date.now() - new Date(timestamp).getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return "Just now";
    if (hours < 24) return `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return `${days}d ago`;
  };

  const activityIcon = (type: string) => {
    switch (type) {
      case "upload": return "📤";
      case "wardrobe": return "👕";
      case "licence": return "📜";
      case "verification": return "✓";
      default: return "•";
    }
  };

  return (
    <div className="space-y-8">
      {/* Welcome */}
      <div>
        <h1 className="text-2xl font-bold text-white">
          Welcome back, {user?.name?.split(" ")[0] || "Creator"}
        </h1>
        <p className="text-slate-400 mt-1">
          {currentRole === "creator"
            ? "Manage your digital assets and wardrobes"
            : "Oversee your talent roster and assets"}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {currentRole === "creator" ? (
          <>
            <Card>
              <CardContent>
                <p className="text-slate-400 text-sm">Total Assets</p>
                <p className="text-3xl font-bold text-white mt-1">{assets.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-slate-400 text-sm">DNA Verified</p>
                <p className="text-3xl font-bold text-emerald-400 mt-1">{assets.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-slate-400 text-sm">Wardrobe Items</p>
                <p className="text-3xl font-bold text-white mt-1">{totalWardrobe}</p>
              </CardContent>
            </Card>
          </>
        ) : (
          <>
            <Card>
              <CardContent>
                <p className="text-slate-400 text-sm">Talent Count</p>
                <p className="text-3xl font-bold text-white mt-1">{talent.length}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-slate-400 text-sm">Total Assets</p>
                <p className="text-3xl font-bold text-white mt-1">
                  {talent.reduce((acc, t) => acc + t.assetCount, 0)}
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <p className="text-slate-400 text-sm">Pending Approvals</p>
                <p className="text-3xl font-bold text-amber-400 mt-1">
                  {talent.filter((t) => t.status === "pending").length}
                </p>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Recent Assets / Talent */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            {currentRole === "creator" ? "Recent Assets" : "Talent Roster"}
          </h2>
          <Link href="/assets" className="text-sm text-primary hover:text-primary/80">
            View All →
          </Link>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {currentRole === "creator"
            ? assets.slice(0, 4).map((asset) => (
                <Link key={asset.id} href={`/assets/${asset.id}`}>
                  <Card hover>
                    <div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-4xl">
                      🎭
                    </div>
                    <p className="font-medium text-white truncate">{asset.name}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="success">✓ DNA</Badge>
                      <span className="text-xs text-slate-400">
                        {asset.wardrobeItems.length} items
                      </span>
                    </div>
                  </Card>
                </Link>
              ))
            : talent.slice(0, 4).map((t) => (
                <Card key={t.id} hover>
                  <div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <p className="font-medium text-white truncate">{t.name}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge variant={t.status === "active" ? "success" : "warning"}>
                      {t.status}
                    </Badge>
                    <span className="text-xs text-slate-400">{t.assetCount} assets</span>
                  </div>
                </Card>
              ))}
        </div>
      </div>

      {/* Activity */}
      <div>
        <h2 className="text-lg font-semibold text-white mb-4">Recent Activity</h2>
        <Card>
          <CardContent className="divide-y divide-slate-700">
            {activity.slice(0, 5).map((item) => (
              <div key={item.id} className="flex items-center gap-4 py-3 first:pt-0 last:pb-0">
                <span className="text-xl">{activityIcon(item.type)}</span>
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
```

**Step 3: Verify dashboard works**

Run dev server and login - should see dashboard with stats, assets, and activity.

**Step 4: Commit**

```bash
git add app/\(dashboard\)/ && git commit -m "$(cat <<'EOF'
feat: add dashboard layout and page

- Auth guard redirects to login
- Sidebar + header layout
- Stats cards (creator vs agency views)
- Recent assets/talent grid
- Activity feed

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 8: Assets Grid Page

**Files:**
- Create: `app/(dashboard)/assets/page.tsx`

**Step 1: Create assets grid page**

Create `app/(dashboard)/assets/page.tsx`:

```typescript
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
        case "newest":
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case "oldest":
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case "name":
          return a.name.localeCompare(b.name);
        case "wardrobe":
          return b.wardrobeItems.length - a.wardrobeItems.length;
        default:
          return 0;
      }
    });

  if (currentRole === "agency") {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-white">Talent Roster</h1>
          <Button variant="secondary">+ Add Talent</Button>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {talent.map((t) => (
            <Card key={t.id} hover>
              <div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-5xl">
                👤
              </div>
              <p className="font-medium text-white">{t.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={t.status === "active" ? "success" : "warning"}>
                  {t.status}
                </Badge>
                <span className="text-sm text-slate-400">{t.assetCount} assets</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">My Assets</h1>
        <Link href="/upload">
          <Button>+ New Asset</Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input
            type="search"
            placeholder="Search assets..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-slate-200 focus:outline-none focus:border-primary"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name A-Z</option>
          <option value="wardrobe">Most Wardrobe Items</option>
        </select>
      </div>

      {/* Grid */}
      {filteredAssets.length === 0 ? (
        <Card className="text-center py-12">
          <p className="text-slate-400 mb-4">No assets found</p>
          <Link href="/upload">
            <Button>Upload Your First Asset</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredAssets.map((asset) => (
            <Link key={asset.id} href={`/assets/${asset.id}`}>
              <Card hover className="h-full">
                <div className="aspect-square bg-slate-700 rounded-lg mb-3 flex items-center justify-center text-5xl">
                  🎭
                </div>
                <p className="font-medium text-white truncate">{asset.name}</p>
                <p className="text-sm text-slate-400 truncate mt-1">{asset.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="success">✓ DNA</Badge>
                  <span className="text-xs text-slate-400">
                    {asset.wardrobeItems.length} items
                  </span>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/\(dashboard\)/assets/page.tsx && git commit -m "$(cat <<'EOF'
feat: add assets grid page

- Search and sort filters
- Asset cards with DNA badge
- Agency view shows talent roster
- Empty state with upload CTA

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 9: WebGL 3D Viewer Component

**Files:**
- Create: `components/viewer/model-viewer.tsx`
- Create: `components/viewer/index.ts`

**Step 1: Create 3D model viewer component**

Create `components/viewer/model-viewer.tsx`:

```typescript
"use client";

import { Suspense, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Environment, Center, useGLTF, Html } from "@react-three/drei";
import * as THREE from "three";

interface ModelProps {
  url: string;
  autoRotate: boolean;
}

function Model({ url, autoRotate }: ModelProps) {
  const groupRef = useRef<THREE.Group>(null);

  // For demo, we'll use a simple box since we don't have actual models yet
  useFrame((_, delta) => {
    if (autoRotate && groupRef.current) {
      groupRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <group ref={groupRef}>
      <Center>
        <mesh>
          <capsuleGeometry args={[0.5, 1, 4, 16]} />
          <meshStandardMaterial color="#7C3AED" metalness={0.3} roughness={0.4} />
        </mesh>
        {/* Head */}
        <mesh position={[0, 1.2, 0]}>
          <sphereGeometry args={[0.4, 32, 32]} />
          <meshStandardMaterial color="#7C3AED" metalness={0.3} roughness={0.4} />
        </mesh>
      </Center>
    </group>
  );
}

function LoadingSpinner() {
  return (
    <Html center>
      <div className="text-slate-400">Loading model...</div>
    </Html>
  );
}

interface ModelViewerProps {
  modelUrl: string;
  className?: string;
}

export function ModelViewer({ modelUrl, className = "" }: ModelViewerProps) {
  const [autoRotate, setAutoRotate] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleScreenshot = () => {
    if (canvasRef.current) {
      const link = document.createElement("a");
      link.download = "asset-screenshot.png";
      link.href = canvasRef.current.toDataURL("image/png");
      link.click();
    }
  };

  const handleFullscreen = () => {
    const container = canvasRef.current?.parentElement;
    if (container) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        container.requestFullscreen();
      }
    }
  };

  return (
    <div className={`relative bg-slate-800 rounded-xl overflow-hidden ${className}`}>
      <Canvas
        ref={canvasRef}
        camera={{ position: [0, 1, 4], fov: 50 }}
        gl={{ preserveDrawingBuffer: true }}
        className="!h-full"
      >
        <Suspense fallback={<LoadingSpinner />}>
          <ambientLight intensity={0.5} />
          <directionalLight position={[5, 5, 5]} intensity={1} />
          <Model url={modelUrl} autoRotate={autoRotate} />
          <OrbitControls
            enablePan={false}
            minDistance={2}
            maxDistance={10}
            autoRotate={false}
          />
          <Environment preset="city" />
          {/* Ground */}
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.2, 0]} receiveShadow>
            <planeGeometry args={[10, 10]} />
            <meshStandardMaterial color="#1e293b" />
          </mesh>
        </Suspense>
      </Canvas>

      {/* Controls */}
      <div className="absolute bottom-4 left-4 flex gap-2">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`p-2 rounded-lg transition-colors ${
            autoRotate ? "bg-primary text-white" : "bg-slate-700 text-slate-300"
          }`}
          title="Toggle auto-rotate"
        >
          🔄
        </button>
        <button
          onClick={handleScreenshot}
          className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          title="Take screenshot"
        >
          📷
        </button>
        <button
          onClick={handleFullscreen}
          className="p-2 rounded-lg bg-slate-700 text-slate-300 hover:bg-slate-600 transition-colors"
          title="Toggle fullscreen"
        >
          ⛶
        </button>
      </div>
    </div>
  );
}
```

**Step 2: Create index export**

Create `components/viewer/index.ts`:

```typescript
export { ModelViewer } from "./model-viewer";
```

**Step 3: Commit**

```bash
git add components/viewer/ && git commit -m "$(cat <<'EOF'
feat: add WebGL 3D model viewer

- React Three Fiber canvas
- Auto-rotate toggle
- Screenshot capture
- Fullscreen mode
- Orbit controls for interaction
- Placeholder geometry (will load GLTF later)

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 10: Asset Detail Page

**Files:**
- Create: `app/(dashboard)/assets/[id]/page.tsx`

**Step 1: Create asset detail page with viewer and wardrobe**

Create `app/(dashboard)/assets/[id]/page.tsx`:

```typescript
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
    return (
      <div className="text-center py-12">
        <p className="text-slate-400 mb-4">Asset not found</p>
        <Link href="/assets">
          <Button variant="secondary">← Back to Assets</Button>
        </Link>
      </div>
    );
  }

  const copyHash = () => {
    navigator.clipboard.writeText(asset.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="text-slate-400 hover:text-white transition-colors"
        >
          ← Back to Assets
        </button>
        <div className="flex gap-2">
          <Button variant="secondary">Edit</Button>
          <Button variant="secondary">Share</Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Viewer */}
        <div className="lg:col-span-2">
          <ModelViewer modelUrl={asset.modelUrl} className="aspect-[4/3]" />
        </div>

        {/* Info Panel */}
        <Card>
          <h1 className="text-2xl font-bold text-white mb-2">{asset.name}</h1>
          <p className="text-slate-400 mb-4">{asset.description}</p>

          <div className="space-y-4">
            <div>
              <p className="text-sm text-slate-500">Created</p>
              <p className="text-slate-200">{formatDate(asset.createdAt)}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">DNA Status</p>
              <Badge variant="success" className="mt-1">✓ Verified</Badge>
            </div>

            <div>
              <p className="text-sm text-slate-500">Token ID</p>
              <p className="text-slate-200 font-mono">#{asset.tokenId}</p>
            </div>

            <div>
              <p className="text-sm text-slate-500">Hash (SHA-256)</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-xs text-slate-300 bg-slate-900 px-2 py-1 rounded font-mono truncate flex-1">
                  {asset.hash.slice(0, 24)}...
                </code>
                <button
                  onClick={copyHash}
                  className="text-slate-400 hover:text-white transition-colors text-sm"
                >
                  {copied ? "✓" : "Copy"}
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Wardrobe */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">
            Wardrobe (ERC-6551)
            <span className="text-slate-400 font-normal ml-2">
              {asset.wardrobeItems.length} items
            </span>
          </h2>
          <Button variant="secondary" size="sm">+ Add Item</Button>
        </div>

        {asset.wardrobeItems.length === 0 ? (
          <Card className="text-center py-8">
            <p className="text-slate-400 mb-4">No wardrobe items yet</p>
            <p className="text-sm text-slate-500 mb-4">
              Add accessories, clothing, or props to this avatar
            </p>
            <Button variant="secondary">+ Add First Item</Button>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {asset.wardrobeItems.map((item) => (
              <Card key={item.id} hover className="p-4">
                <div className="aspect-square bg-slate-700 rounded-lg mb-2 flex items-center justify-center text-2xl">
                  👕
                </div>
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
```

**Step 2: Verify asset detail page works**

Navigate to `/assets/asset-1` - should see 3D viewer and wardrobe items.

**Step 3: Commit**

```bash
git add app/\(dashboard\)/assets/\[id\]/ && git commit -m "$(cat <<'EOF'
feat: add asset detail page

- 3D model viewer integration
- Asset info panel with hash copy
- Wardrobe items grid
- Empty state for no items

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 11: Upload Page

**Files:**
- Create: `components/upload/dropzone.tsx`
- Create: `components/upload/index.ts`
- Create: `app/(dashboard)/upload/page.tsx`

**Step 1: Create dropzone component**

Create `components/upload/dropzone.tsx`:

```typescript
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

    if (file.size > maxSize) {
      setError(`File too large. Maximum size is ${Math.round(maxSize / 1024 / 1024)}MB`);
      return;
    }

    const ext = file.name.split(".").pop()?.toLowerCase();
    const allowedExts = accept.split(",").map(e => e.replace(".", "").trim());

    if (ext && !allowedExts.includes(ext)) {
      setError(`Invalid file type. Allowed: ${allowedExts.join(", ")}`);
      return;
    }

    onFileSelect(file);
  }, [onFileSelect, accept, maxSize]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  return (
    <div
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors cursor-pointer
        ${isDragging
          ? "border-primary bg-primary/10"
          : "border-slate-600 hover:border-slate-500 bg-slate-800/50"
        }`}
    >
      <input
        type="file"
        accept={accept}
        onChange={handleInputChange}
        className="hidden"
        id="file-upload"
      />
      <label htmlFor="file-upload" className="cursor-pointer">
        <div className="text-5xl mb-4">📁</div>
        <p className="text-lg text-slate-200 mb-2">
          Drag & drop your 3D asset here
        </p>
        <p className="text-slate-400">or click to browse</p>
        <p className="text-sm text-slate-500 mt-4">
          Supported: GLTF, GLB, FBX, VRM (up to 1GB)
        </p>
      </label>
      {error && (
        <p className="text-red-400 text-sm mt-4">{error}</p>
      )}
    </div>
  );
}
```

**Step 2: Create index export**

Create `components/upload/index.ts`:

```typescript
export { Dropzone } from "./dropzone";
```

**Step 3: Create upload page**

Create `app/(dashboard)/upload/page.tsx`:

```typescript
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Dropzone } from "@/components/upload";
import { ModelViewer } from "@/components/viewer";
import { Button, Input, Card } from "@/components/ui";
import { useAppStore } from "@/lib/store";
import { generateMockHash, generateMockTokenId, generateMockTxHash } from "@/lib/mock-data";

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
    startHashing();
  };

  const startHashing = () => {
    setIsHashing(true);
    setHashProgress(0);

    // Simulate hash calculation
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

    const assetId = `asset-${Date.now()}`;
    const tokenId = generateMockTokenId();

    addAsset({
      id: assetId,
      name,
      description,
      hash,
      tokenId,
      modelUrl: `/models/${name.toLowerCase()}.glb`,
      thumbnailUrl: `/thumbnails/${name.toLowerCase()}.png`,
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
        <Card className="py-8">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-white mb-2">DNA Registered</h2>
          <p className="text-slate-400 mb-6">
            Your asset has been registered on the blockchain.
          </p>

          <div className="text-left bg-slate-900 rounded-lg p-4 mb-6 space-y-2">
            <div>
              <span className="text-slate-500 text-sm">Token ID:</span>
              <span className="text-slate-200 ml-2 font-mono">#{newAssetId.split("-")[1]}</span>
            </div>
            <div>
              <span className="text-slate-500 text-sm">Transaction:</span>
              <span className="text-slate-200 ml-2 font-mono text-xs">{txHash.slice(0, 20)}...</span>
            </div>
          </div>

          <div className="flex gap-3 justify-center">
            <Button onClick={() => router.push(`/assets/${newAssetId}`)}>
              View Asset
            </Button>
            <Button variant="secondary" onClick={handleReset}>
              Upload Another
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-white">Register New Asset</h1>

      {step === "dropzone" && (
        <Dropzone onFileSelect={handleFileSelect} />
      )}

      {step === "preview" && file && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Preview */}
          <div>
            <ModelViewer modelUrl="" className="aspect-square" />

            {/* Hash Progress */}
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
                  style={{ width: `${hashProgress}%` }}
                />
              </div>
            </div>
          </div>

          {/* Form */}
          <Card>
            <h2 className="text-lg font-semibold text-white mb-4">Asset Details</h2>

            <div className="space-y-4">
              <Input
                label="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter asset name"
              />

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your asset..."
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-50 placeholder-slate-500 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  DNA Hash (SHA-256)
                </label>
                <div className="bg-slate-900 border border-slate-600 rounded-lg p-3">
                  {hash ? (
                    <code className="text-xs text-slate-300 font-mono break-all">
                      {hash}
                    </code>
                  ) : (
                    <span className="text-slate-500 text-sm">Calculating...</span>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={handleRegister}
                  disabled={!name || !hash}
                  className="flex-1"
                >
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
```

**Step 4: Verify upload flow works**

Navigate to `/upload`, drop a file (any file for now), fill in name, click Register.

**Step 5: Commit**

```bash
git add components/upload/ app/\(dashboard\)/upload/ && git commit -m "$(cat <<'EOF'
feat: add upload page with hash calculation

- Drag-and-drop file upload
- Mock SHA-256 hash calculation with progress
- Asset details form
- Success state with transaction info
- Redirects to asset detail on completion

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 12: Settings Page

**Files:**
- Create: `app/(dashboard)/settings/page.tsx`

**Step 1: Create settings page**

Create `app/(dashboard)/settings/page.tsx`:

```typescript
"use client";

import { useState } from "react";
import { useAppStore } from "@/lib/store";
import { Card, Button, Input } from "@/components/ui";

export default function SettingsPage() {
  const { user, logout } = useAppStore();
  const [name, setName] = useState(user?.name || "");
  const [email, setEmail] = useState(user?.email || "");
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    // In a real app, this would update the user
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-2xl space-y-6">
      <h1 className="text-2xl font-bold text-white">Settings</h1>

      {/* Profile */}
      <Card>
        <h2 className="text-lg font-semibold text-white mb-4">Profile</h2>
        <div className="space-y-4">
          <Input
            label="Display Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {user?.walletAddress && (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">
                Wallet Address
              </label>
              <code className="block bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-slate-300 font-mono text-sm">
                {user.walletAddress}
              </code>
            </div>
          )}
          <Button onClick={handleSave}>
            {saved ? "✓ Saved" : "Save Changes"}
          </Button>
        </div>
      </Card>

      {/* Preferences */}
      <Card>
        <h2 className="text-lg font-semibold text-white mb-4">Preferences</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-200">Auto-rotate 3D Viewer</p>
              <p className="text-sm text-slate-500">Automatically rotate models on load</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-slate-200">Email Notifications</p>
              <p className="text-sm text-slate-500">Receive updates about your assets</p>
            </div>
            <input type="checkbox" defaultChecked className="w-5 h-5 accent-primary" />
          </div>
        </div>
      </Card>

      {/* Danger Zone */}
      <Card className="border-red-900/50">
        <h2 className="text-lg font-semibold text-red-400 mb-4">Danger Zone</h2>
        <div className="flex items-center justify-between">
          <div>
            <p className="text-slate-200">Sign Out</p>
            <p className="text-sm text-slate-500">Sign out of your account</p>
          </div>
          <Button variant="secondary" onClick={logout}>
            Sign Out
          </Button>
        </div>
      </Card>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/\(dashboard\)/settings/ && git commit -m "$(cat <<'EOF'
feat: add settings page

- Profile editing (name, email)
- Wallet address display
- Preferences toggles
- Sign out functionality

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 13: Final Polish and Sample Models

**Files:**
- Create: `public/models/.gitkeep`
- Create: `public/thumbnails/.gitkeep`
- Create: `public/avatars/.gitkeep`

**Step 1: Create placeholder directories**

```bash
mkdir -p public/models public/thumbnails public/avatars
touch public/models/.gitkeep public/thumbnails/.gitkeep public/avatars/.gitkeep
```

**Step 2: Update next.config.js for static exports (optional)**

The default config should work for Vercel deployment.

**Step 3: Test the complete flow**

Run:
```bash
npm run dev
```

Test:
1. Visit localhost:3000 → Login page
2. Enter any email → Enter any 6 digits → Dashboard
3. View assets grid, click an asset
4. See 3D viewer, wardrobe items
5. Upload new asset, see success
6. Switch role to Agency, see talent view
7. Settings page, sign out

**Step 4: Run linter**

```bash
npm run lint
```

Fix any lint errors.

**Step 5: Build production**

```bash
npm run build
```

Expected: Build succeeds with no errors.

**Step 6: Final commit**

```bash
git add -A && git commit -m "$(cat <<'EOF'
chore: add placeholder directories and verify build

- Public directories for models, thumbnails, avatars
- Verified lint passes
- Verified production build succeeds

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Task 14: Deploy to Vercel

**Step 1: Install Vercel CLI (if needed)**

```bash
npm install -g vercel
```

**Step 2: Login to Vercel**

```bash
vercel login
```

**Step 3: Deploy**

```bash
vercel --prod
```

Follow prompts to link/create project. Set project name to `assetdna-demo`.

**Step 4: Configure custom domain (if available)**

In Vercel dashboard, add `demo.assetdna.xyz` as a custom domain.

**Step 5: Commit deploy config**

```bash
git add -A && git commit -m "$(cat <<'EOF'
chore: configure Vercel deployment

Co-Authored-By: Claude Opus 4.5 <noreply@anthropic.com>
EOF
)"
```

---

## Summary

This plan implements the AssetDNA frontend prototype with:

- **14 tasks** building up incrementally
- **Next.js 14** with App Router and route groups
- **Tailwind CSS** with custom design system
- **React Three Fiber** for 3D viewer
- **Zustand** for state with localStorage persistence
- **Mock data** for 5 avatars with wardrobe items
- **Both auth flows** (email + wallet) mocked
- **Role switching** between Creator and Agency views

Total estimated commits: ~15 incremental commits with clear boundaries.
