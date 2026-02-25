# AssetDNA Frontend Prototype Design

**Date:** 2026-02-25
**Status:** Approved
**Author:** Claude + Paul

## Overview

An interactive prototype for Merava AssetDNA - a blockchain-based digital asset identity platform. This prototype demonstrates the core user journey with mock data for stakeholder demos, without requiring backend/blockchain infrastructure.

## Goals

1. Demonstrate the complete user flow: Login → Upload → View 3D → Manage Wardrobe
2. Support both Creator and Agency user personas with role switching
3. Showcase the creative & bold visual identity while maintaining professionalism
4. Deploy to demo.assetdna.xyz for stakeholder presentations
5. Build production-ready React components that can connect to real APIs later

## Non-Goals (Deferred)

- Real blockchain integration (ERC-721, ERC-6551)
- AWS backend (Lambda, S3, Cognito)
- Real authentication
- Guardian/anti-piracy features (P3)
- Marketplace functionality (P3)

## User Personas

### Individual Creator
- Digital artists uploading their own avatar creations
- Wants to protect and monetize their work
- Views: Personal assets, upload flow, wardrobe management

### Agency Admin
- Managing multiple talent likenesses and derivative assets
- Needs org hierarchy and oversight
- Views: Talent roster, aggregate stats, approval workflows

## Screens

| Screen | Route | PRD Reference |
|--------|-------|---------------|
| Login | `/` | FE-0 |
| Dashboard | `/dashboard` | - |
| Assets Grid | `/assets` | - |
| Asset Detail + Viewer | `/assets/[id]` | FE-4, FE-5 |
| Upload | `/upload` | FE-1, FE-2 |
| Settings | `/settings` | - |

See `docs/mockups/` for detailed wireframes:
- `00-navigation-structure.md` - Layout and routing
- `01-login-page.md` - Auth flows (email + wallet)
- `02-dashboard.md` - Stats and recent activity
- `03-upload-page.md` - Drag-drop and hash preview
- `04-asset-detail.md` - WebGL viewer and wardrobe
- `05-assets-grid.md` - Asset browsing
- `06-visual-design-system.md` - Colors, typography, components

## Technical Architecture

### Stack

| Layer | Technology | Rationale |
|-------|------------|-----------|
| Framework | Next.js 14 (App Router) | Matches PRD spec, easy Vercel deploy |
| Styling | Tailwind CSS | Rapid iteration, utility-first |
| 3D Rendering | React Three Fiber + drei | Best React integration for Three.js |
| State | Zustand | Lightweight, simple API |
| Mock Data | JSON + localStorage | Persistence across sessions |
| Deployment | Vercel | Zero-config, PRD target |

### Project Structure

```
assetdna/
├── app/
│   ├── (auth)/
│   │   └── login/page.tsx
│   ├── (dashboard)/
│   │   ├── layout.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── assets/
│   │   │   ├── page.tsx
│   │   │   └── [id]/page.tsx
│   │   ├── upload/page.tsx
│   │   └── settings/page.tsx
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── ui/
│   ├── viewer/
│   ├── upload/
│   └── layout/
├── lib/
│   ├── mock-data.ts
│   ├── store.ts
│   └── utils.ts
├── public/
│   └── models/
└── ...
```

### Data Models

```typescript
interface Asset {
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

interface WardrobeItem {
  id: string;
  name: string;
  parentAssetId: string;
  modelUrl: string;
  thumbnailUrl: string;
  tokenId: string;
}

interface User {
  id: string;
  name: string;
  email?: string;
  walletAddress?: string;
  role: 'creator' | 'agency';
  avatarUrl?: string;
}

interface AgencyTalent {
  id: string;
  name: string;
  avatarUrl: string;
  assetCount: number;
  status: 'active' | 'pending';
}
```

### State Management

Zustand store with localStorage persistence:

```typescript
interface AppStore {
  // Auth
  user: User | null;
  isAuthenticated: boolean;
  login: (user: User) => void;
  logout: () => void;

  // Role
  currentRole: 'creator' | 'agency';
  setRole: (role: 'creator' | 'agency') => void;

  // Assets
  assets: Asset[];
  addAsset: (asset: Asset) => void;
  updateAsset: (id: string, updates: Partial<Asset>) => void;

  // Talent (agency view)
  talent: AgencyTalent[];
}
```

## Visual Design

### Color Palette

**Primary:** Purple → Blue → Cyan gradient (`#7C3AED` → `#2563EB` → `#06B6D4`)

**Dark Theme:**
- Background: `#0F172A` (Slate-900)
- Cards: `#1E293B` (Slate-800)
- Text: `#F8FAFC` (Slate-50)

**Semantic:** Emerald for success, Amber for warning, Red for error

### Typography

- Font: Inter (headings + body), JetBrains Mono (hashes)
- Scale: 48px display → 12px caption

### Effects

- Glassmorphism on login card and modals
- Gradient mesh background with subtle animation
- Glow effects on primary actions
- Smooth transitions (150-300ms)

See `docs/mockups/06-visual-design-system.md` for full specification.

## WebGL Viewer Requirements

### Features
- Load GLTF/GLB models
- Auto-rotate on load (toggleable)
- Orbit controls (drag to rotate, scroll to zoom)
- Screenshot capture (PNG download)
- Fullscreen mode
- Dark gradient background with ground shadow

### Libraries
- `@react-three/fiber` - React renderer for Three.js
- `@react-three/drei` - Helpers (OrbitControls, Environment, etc.)
- `three` - Core 3D library

### Sample Models
Include 3-5 sample humanoid avatars (GLTF format) in `/public/models/` for demo purposes. Source from Mixamo, Ready Player Me, or similar.

## Mock Authentication

### Email + OTP Flow
1. Enter any email
2. Modal prompts for 6-digit code
3. Accept any 6 digits
4. Store user in localStorage

### Wallet Connect Flow
1. Click "Connect Wallet"
2. Show mock wallet selector modal
3. Generate mock address (0x...)
4. Store in localStorage

## Sample Data

Pre-populate with:
- 4-5 sample avatars with names (Nova, Zephyr, Atlas, Luna, Orion)
- 3-5 wardrobe items per avatar
- Mock activity feed entries
- Agency talent roster (4 people)

## Success Criteria

1. Complete user journey demonstrable in under 3 minutes
2. Role switching works seamlessly
3. 3D viewer loads models and responds to controls
4. Upload flow shows hash calculation (mocked)
5. Deployed and accessible at demo.assetdna.xyz
6. Responsive on tablet and desktop (mobile secondary)

## Open Questions (Resolved)

| Question | Decision |
|----------|----------|
| Auth method | Both email+OTP and wallet connect |
| Visual style | Creative & bold, but professional |
| Target users | Both creators and agencies |
| Tech stack | Next.js + Tailwind + R3F |

## Next Steps

1. Create implementation plan with task breakdown
2. Set up Next.js project with dependencies
3. Build component library (UI primitives)
4. Implement screens in order: Login → Dashboard → Assets → Upload → Detail
5. Add WebGL viewer
6. Polish and deploy
