# Assets Grid Page

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  My Assets                                      [+ New Asset]   │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │ Search: [                    🔍]   Filter: [All ▼]      │   │
│  │                               Sort: [Newest First ▼]    │   │
│  └─────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │         │ │         │ │         │ │         │              │
│  │   3D    │ │   3D    │ │   3D    │ │   3D    │              │
│  │ Preview │ │ Preview │ │ Preview │ │ Preview │              │
│  │         │ │         │ │         │ │         │              │
│  │ Nova    │ │ Zephyr  │ │ Atlas   │ │ Luna    │              │
│  │ ✓ DNA   │ │ ✓ DNA   │ │ ✓ DNA   │ │ ✓ DNA   │              │
│  │ 4 items │ │ 2 items │ │ 7 items │ │ 0 items │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │         │ │         │ │         │ │         │              │
│  │   3D    │ │   3D    │ │   3D    │ │   3D    │              │
│  │ Preview │ │ Preview │ │ Preview │ │ Preview │              │
│  │         │ │         │ │         │ │         │              │
│  │ Orion   │ │ Stella  │ │ Phoenix │ │ Blaze   │              │
│  │ ✓ DNA   │ │ ✓ DNA   │ │ ✓ DNA   │ │ ✓ DNA   │              │
│  │ 3 items │ │ 5 items │ │ 1 item  │ │ 6 items │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
│                    [Load More]                                  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Filters

| Filter | Options |
|--------|---------|
| Status | All, Verified, Pending |
| Type | All, Avatars, Wardrobe Items |
| Sort | Newest First, Oldest First, Name A-Z, Most Wardrobe Items |

## Asset Card Component

```
┌─────────────┐
│             │
│  [3D thumb] │  ← Static render or animated mini-viewer
│             │
│ Asset Name  │  ← Truncated if long
│ ✓ DNA       │  ← Verification badge
│ N items     │  ← Wardrobe item count
└─────────────┘
```

### Card States
- **Default:** Subtle border, shadow
- **Hover:** Scale up slightly, deeper shadow, show quick actions
- **Selected:** Highlight border (for multi-select if needed)

### Quick Actions on Hover
```
┌─────────────┐
│  [👁] [✏️]  │  ← View / Edit quick buttons
│  [3D thumb] │
│             │
│ Asset Name  │
│ ✓ DNA       │
│ N items     │
└─────────────┘
```

## Empty State

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│                    No assets yet                                │
│                                                                 │
│     Upload your first 3D avatar to get started                 │
│                                                                 │
│                 [+ Upload Asset]                                │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Agency View Variation

For agency users, this page shows talent roster instead:

```
┌─────────────────────────────────────────────────────────────────┐
│  Talent Roster                                  [+ Add Talent]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │ [photo] │ │ [photo] │ │ [photo] │ │ [photo] │              │
│  │         │ │         │ │         │ │         │              │
│  │ Alex M. │ │ Jordan  │ │ Sam K.  │ │ Riley   │              │
│  │ 6 assets│ │ 4 assets│ │ 8 assets│ │ 3 assets│              │
│  │ Active  │ │ Active  │ │ Pending │ │ Active  │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

Clicking a talent card → shows their assets in a sub-view.
