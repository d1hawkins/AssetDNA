# UI Polish Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Polish the AssetDNA UI with Lucide icons, refined shadows/hover states, and improved typography for a modern SaaS aesthetic.

**Architecture:** Replace emoji with Lucide React icons, enhance UI components with shadows and transitions, improve typography hierarchy. No structural changes.

**Tech Stack:** Next.js, Tailwind CSS, Lucide React

---

## Task 1: Install Lucide React

**Files:**
- Modify: `package.json`

**Step 1: Install lucide-react**

Run:
```bash
npm install lucide-react
```

**Step 2: Verify installation**

Run:
```bash
grep lucide-react package.json
```
Expected: `"lucide-react": "^0.x.x"` in dependencies

**Step 3: Commit**

```bash
git add package.json package-lock.json
git commit -m "chore: add lucide-react for icons"
```

---

## Task 2: Update Button Component

**Files:**
- Modify: `components/ui/button.tsx`

**Step 1: Add active scale and focus ring**

Replace the entire file with:

```tsx
import { forwardRef, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className = "", variant = "primary", size = "md", children, ...props }, ref) => {
    const base = "inline-flex items-center justify-center font-medium rounded-lg transition-all duration-150 disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900";
    const variants = {
      primary: "bg-gradient-to-r from-primary via-blue-600 to-cyan-500 text-white hover:brightness-110 shadow-lg shadow-primary/25",
      secondary: "bg-slate-800 border border-slate-600 text-slate-200 hover:bg-slate-700 hover:border-slate-500",
      ghost: "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-800",
    };
    const sizes = { sm: "px-3 py-1.5 text-sm", md: "px-5 py-2.5 text-sm", lg: "px-6 py-3 text-base" };
    return <button ref={ref} className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>{children}</button>;
  }
);
Button.displayName = "Button";
```

**Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
git add components/ui/button.tsx
git commit -m "feat: enhance button with active scale and focus ring"
```

---

## Task 3: Update Card Component

**Files:**
- Modify: `components/ui/card.tsx`

**Step 1: Add shadows and improved hover states**

Replace the entire file with:

```tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  onClick?: () => void;
}

export function Card({ children, className = "", hover = false, onClick }: CardProps) {
  return (
    <div
      className={`bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 backdrop-blur-sm shadow-lg shadow-black/20 ${
        hover
          ? "hover:border-slate-600 hover:shadow-xl hover:shadow-black/30 transition-all duration-200 cursor-pointer"
          : ""
      } ${className}`}
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
  return <h3 className={`text-xl font-semibold text-slate-50 ${className}`}>{children}</h3>;
}

export function CardContent({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={className}>{children}</div>;
}
```

**Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
git add components/ui/card.tsx
git commit -m "feat: enhance card with shadows and improved hover"
```

---

## Task 4: Update Badge Component

**Files:**
- Modify: `components/ui/badge.tsx`

**Step 1: Refine badge styling with softer backgrounds**

Replace the entire file with:

```tsx
import { ReactNode } from "react";

interface BadgeProps {
  variant?: "success" | "warning" | "error" | "info" | "default";
  children: ReactNode;
  className?: string;
}

export function Badge({ variant = "default", children, className = "" }: BadgeProps) {
  const variants = {
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    error: "bg-red-500/10 text-red-400 border-red-500/20",
    info: "bg-blue-500/10 text-blue-400 border-blue-500/20",
    default: "bg-slate-500/10 text-slate-400 border-slate-500/20",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-md border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
git add components/ui/badge.tsx
git commit -m "feat: refine badge with softer backgrounds"
```

---

## Task 5: Update Sidebar with Lucide Icons

**Files:**
- Modify: `components/layout/sidebar.tsx`

**Step 1: Replace emoji with Lucide icons and add active border**

Replace the entire file with:

```tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAppStore } from "@/lib/store";
import { LayoutDashboard, Box, Upload, Settings, X } from "lucide-react";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/assets", label: "My Assets", icon: Box },
  { href: "/upload", label: "Upload", icon: Upload },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useAppStore();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  const closeSidebar = () => setSidebarOpen(false);

  return (
    <>
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-800 flex flex-col z-50
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <Link href="/dashboard" className="flex items-center gap-2" onClick={closeSidebar}>
            <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-primary via-blue-600 to-cyan-500" />
            <span className="text-xl font-bold bg-gradient-to-r from-primary via-blue-500 to-cyan-400 bg-clip-text text-transparent">
              AssetDNA
            </span>
          </Link>
          <button
            onClick={closeSidebar}
            className="md:hidden p-2 text-slate-400 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 p-4">
          <ul className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={closeSidebar}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      active
                        ? "bg-slate-800 text-white border-l-2 border-primary -ml-[2px]"
                        : "text-slate-400 hover:text-white hover:bg-slate-800/50"
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="p-4 border-t border-slate-800/50">
          <Link
            href="/settings"
            onClick={closeSidebar}
            className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
              pathname === "/settings"
                ? "bg-slate-800 text-white border-l-2 border-primary -ml-[2px]"
                : "text-slate-400 hover:text-white hover:bg-slate-800/50"
            }`}
          >
            <Settings className="w-5 h-5" />
            <span>Settings</span>
          </Link>
        </div>
      </aside>
    </>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
git add components/layout/sidebar.tsx
git commit -m "feat: replace emoji with Lucide icons in sidebar"
```

---

## Task 6: Update Header with Lucide Icons

**Files:**
- Modify: `components/layout/header.tsx`

**Step 1: Replace SVG/text with Lucide icons and add avatar ring**

Replace the entire file with:

```tsx
"use client";
import { useAppStore } from "@/lib/store";
import { useRouter } from "next/navigation";
import { Menu, LogOut } from "lucide-react";

export function Header() {
  const { user, currentRole, setRole, logout, toggleSidebar } = useAppStore();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/");
  };

  return (
    <header className="h-16 bg-slate-900/80 backdrop-blur-sm border-b border-slate-800 flex items-center justify-between px-4 md:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={toggleSidebar}
          className="md:hidden p-2 text-slate-400 hover:text-white transition-colors rounded-lg hover:bg-slate-800"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>
        <h1 className="text-lg font-semibold text-slate-200">
          {currentRole === "creator" ? "Creator Dashboard" : "Agency Dashboard"}
        </h1>
      </div>
      <div className="flex items-center gap-3 md:gap-4">
        <select
          value={currentRole}
          onChange={(e) => setRole(e.target.value as "creator" | "agency")}
          className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-200 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary cursor-pointer"
        >
          <option value="creator">Creator</option>
          <option value="agency">Agency</option>
        </select>
        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-medium text-slate-200">{user?.name || "User"}</p>
            <p className="text-xs text-slate-500">
              {user?.email || user?.walletAddress?.slice(0, 10) + "..."}
            </p>
          </div>
          <div className="w-9 h-9 rounded-full bg-gradient-to-r from-primary to-blue-600 flex items-center justify-center text-white font-medium text-sm ring-2 ring-transparent hover:ring-primary/30 transition-all cursor-pointer">
            {user?.name?.charAt(0) || "U"}
          </div>
          <button
            onClick={handleLogout}
            className="p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800 rounded-lg transition-colors"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
```

**Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
git add components/layout/header.tsx
git commit -m "feat: replace icons in header with Lucide"
```

---

## Task 7: Update Dashboard Page

**Files:**
- Modify: `app/(dashboard)/dashboard/page.tsx`

**Step 1: Replace emoji with Lucide icons and improve typography**

Replace the entire file with:

```tsx
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
```

**Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
git add "app/(dashboard)/dashboard/page.tsx"
git commit -m "feat: update dashboard with Lucide icons and improved typography"
```

---

## Task 8: Update Assets Page

**Files:**
- Modify: `app/(dashboard)/assets/page.tsx`

**Step 1: Replace emoji with Lucide icons**

Replace the entire file with:

```tsx
"use client";
import { useState } from "react";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { Card, Badge, Button, Input } from "@/components/ui";
import { Box, ShieldCheck, User, Plus } from "lucide-react";

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
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-white">Talent Roster</h1>
          <Button variant="secondary">
            <Plus className="w-4 h-4 mr-2" />
            Add Talent
          </Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {talent.map((t) => (
            <Card key={t.id} hover>
              <div className="aspect-square bg-slate-700/50 rounded-lg mb-3 flex items-center justify-center">
                <User className="w-12 h-12 text-slate-500" />
              </div>
              <p className="font-medium text-white">{t.name}</p>
              <div className="flex items-center gap-2 mt-2">
                <Badge variant={t.status === "active" ? "success" : "warning"}>{t.status}</Badge>
                <span className="text-sm text-slate-400">{t.assetCount} assets</span>
              </div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight text-white">My Assets</h1>
        <Link href="/upload">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Asset
          </Button>
        </Link>
      </div>
      <div className="flex flex-wrap gap-4">
        <div className="flex-1 min-w-[200px]">
          <Input type="search" placeholder="Search assets..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="bg-slate-800 border border-slate-700 rounded-lg px-4 py-2.5 text-sm text-slate-200 focus:outline-none focus:border-primary cursor-pointer"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name A-Z</option>
          <option value="wardrobe">Most Wardrobe Items</option>
        </select>
      </div>
      {filteredAssets.length === 0 ? (
        <Card className="text-center py-12">
          <Box className="w-12 h-12 text-slate-500 mx-auto mb-4" />
          <p className="text-slate-400 mb-4">No assets found</p>
          <Link href="/upload">
            <Button>Upload Your First Asset</Button>
          </Link>
        </Card>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {filteredAssets.map((asset) => (
            <Link key={asset.id} href={`/assets/${asset.id}`}>
              <Card hover className="h-full">
                <div className="aspect-square bg-slate-700/50 rounded-lg mb-3 flex items-center justify-center">
                  <Box className="w-12 h-12 text-slate-500" />
                </div>
                <p className="font-medium text-white truncate">{asset.name}</p>
                <p className="text-sm text-slate-400 truncate mt-1">{asset.description}</p>
                <div className="flex items-center gap-2 mt-3">
                  <Badge variant="success">
                    <ShieldCheck className="w-3 h-3" />
                    DNA
                  </Badge>
                  <span className="text-xs text-slate-400">{asset.wardrobeItems.length} items</span>
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

**Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
git add "app/(dashboard)/assets/page.tsx"
git commit -m "feat: update assets page with Lucide icons"
```

---

## Task 9: Update Asset Detail Page

**Files:**
- Modify: `app/(dashboard)/assets/[id]/page.tsx`

**Step 1: Replace emoji with Lucide icons**

Replace the entire file with:

```tsx
"use client";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { useAppStore } from "@/lib/store";
import { ModelViewer } from "@/components/viewer";
import { Card, Badge, Button } from "@/components/ui";
import { useState } from "react";
import { ArrowLeft, ShieldCheck, Copy, Check, Edit, Share2, Shirt, Plus } from "lucide-react";

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
          <Button variant="secondary">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Assets
          </Button>
        </Link>
      </div>
    );
  }

  const copyHash = () => {
    navigator.clipboard.writeText(asset.hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Assets
        </button>
        <div className="flex gap-2">
          <Button variant="secondary" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="secondary" size="sm">
            <Share2 className="w-4 h-4 mr-2" />
            Share
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <ModelViewer modelUrl={asset.modelUrl} className="aspect-[4/3]" />
        </div>
        <Card>
          <h1 className="text-2xl font-bold text-white mb-2">{asset.name}</h1>
          <p className="text-slate-400 mb-6">{asset.description}</p>
          <div className="space-y-5">
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Created</p>
              <p className="text-slate-200 mt-1">{formatDate(asset.createdAt)}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">DNA Status</p>
              <Badge variant="success" className="mt-2">
                <ShieldCheck className="w-3 h-3" />
                Verified
              </Badge>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Token ID</p>
              <p className="text-slate-200 font-mono mt-1">#{asset.tokenId}</p>
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Hash (SHA-256)</p>
              <div className="flex items-center gap-2 mt-1">
                <code className="text-xs text-slate-300 bg-slate-900 px-2 py-1.5 rounded font-mono truncate flex-1">
                  {asset.hash.slice(0, 24)}...
                </code>
                <button
                  onClick={copyHash}
                  className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded transition-colors"
                >
                  {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>
          </div>
        </Card>
      </div>

      <div>
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-semibold text-white">
            Wardrobe (ERC-6551)
            <span className="text-slate-400 font-normal ml-2">{asset.wardrobeItems.length} items</span>
          </h2>
          <Button variant="secondary" size="sm">
            <Plus className="w-4 h-4 mr-2" />
            Add Item
          </Button>
        </div>
        {asset.wardrobeItems.length === 0 ? (
          <Card className="text-center py-10">
            <Shirt className="w-12 h-12 text-slate-500 mx-auto mb-4" />
            <p className="text-slate-400 mb-2">No wardrobe items yet</p>
            <p className="text-sm text-slate-500 mb-4">Add accessories, clothing, or props to this avatar</p>
            <Button variant="secondary">
              <Plus className="w-4 h-4 mr-2" />
              Add First Item
            </Button>
          </Card>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {asset.wardrobeItems.map((item) => (
              <Card key={item.id} hover className="p-4">
                <div className="aspect-square bg-slate-700/50 rounded-lg mb-2 flex items-center justify-center">
                  <Shirt className="w-8 h-8 text-slate-500" />
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

**Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
git add "app/(dashboard)/assets/[id]/page.tsx"
git commit -m "feat: update asset detail page with Lucide icons"
```

---

## Task 10: Update Upload Page

**Files:**
- Modify: `app/(dashboard)/upload/page.tsx`

**Step 1: Replace emoji checkmark with Lucide icon**

Replace the entire file with:

```tsx
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
```

**Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
git add "app/(dashboard)/upload/page.tsx"
git commit -m "feat: update upload page with Lucide icons"
```

---

## Task 11: Update Settings Page

**Files:**
- Modify: `app/(dashboard)/settings/page.tsx`

**Step 1: Replace emoji checkmark with Lucide icon**

Replace the entire file with:

```tsx
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
```

**Step 2: Verify no TypeScript errors**

Run:
```bash
npx tsc --noEmit
```
Expected: No errors

**Step 3: Commit**

```bash
git add "app/(dashboard)/settings/page.tsx"
git commit -m "feat: update settings page with Lucide icons"
```

---

## Task 12: Final Verification and Deploy

**Step 1: Run build to verify everything compiles**

Run:
```bash
npm run build
```
Expected: Build completes successfully

**Step 2: Test locally**

Run:
```bash
npm run dev
```
Visit http://localhost:3000 and verify:
- Icons render correctly
- Hover states work
- No visual regressions

**Step 3: Deploy to Vercel**

Run:
```bash
vercel --prod
```

**Step 4: Final commit (if any fixes needed)**

```bash
git add -A
git commit -m "fix: address any final polish issues"
```

**Step 5: Push to GitHub**

```bash
git push
```
