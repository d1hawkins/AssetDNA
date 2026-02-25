# Navigation Structure

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  HEADER                                                         │
│  [Logo: Merava AssetDNA]    [Role: Creator ▼]    [User Avatar]  │
├──────────────┬──────────────────────────────────────────────────┤
│  SIDEBAR     │  MAIN CONTENT AREA                               │
│              │                                                  │
│  Dashboard   │  (varies by selected view)                       │
│  My Assets   │                                                  │
│  Upload      │                                                  │
│  ─────────   │                                                  │
│  Settings    │                                                  │
│              │                                                  │
└──────────────┴──────────────────────────────────────────────────┘
```

## Routes

| Route | Description |
|-------|-------------|
| `/` | Login page (unauthenticated) |
| `/dashboard` | Overview with stats and recent activity |
| `/assets` | Grid of all assets with filters |
| `/assets/[id]` | Single asset view with WebGL viewer + wardrobe |
| `/upload` | Drag-drop uploader with hash preview |
| `/settings` | Profile and preferences |

## Role Switcher

### Creator View
- Shows "My Assets" - personal uploads
- Personal stats and activity

### Agency View
- Shows "Talent Roster" - list of talent with their assets
- Org hierarchy navigation
- Aggregate stats across talent
