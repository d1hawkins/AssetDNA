# Dashboard

## Creator View Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  Welcome back, [Name]                    Role: [Creator ▼]      │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ Total Assets │ │ DNA Verified │ │ Wardrobe     │            │
│  │     12       │ │     12       │ │ Items: 47    │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                 │
│  Recent Assets                              [View All →]        │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │ 3D      │ │ 3D      │ │ 3D      │ │ 3D      │              │
│  │ Preview │ │ Preview │ │ Preview │ │ Preview │              │
│  │         │ │         │ │         │ │         │              │
│  │ Nova    │ │ Zephyr  │ │ Atlas   │ │ Luna    │              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
│  Recent Activity                                                │
│  • Nova wardrobe updated - 2 new items          2 hours ago    │
│  • Zephyr DNA registered                        1 day ago      │
│  • Atlas licence purchased by Studio X          3 days ago     │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Agency View Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  [Agency Name] Dashboard                 Role: [Agency ▼]       │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐            │
│  │ Talent Count │ │ Total Assets │ │ Pending      │            │
│  │     8        │ │     45       │ │ Approvals: 3 │            │
│  └──────────────┘ └──────────────┘ └──────────────┘            │
│                                                                 │
│  Talent Roster                              [Manage →]          │
│  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐              │
│  │ Avatar  │ │ Avatar  │ │ Avatar  │ │ Avatar  │              │
│  │         │ │         │ │         │ │         │              │
│  │ Alex M. │ │ Jordan  │ │ Sam K.  │ │ Riley   │              │
│  │ 6 assets│ │ 4 assets│ │ 8 assets│ │ 3 assets│              │
│  └─────────┘ └─────────┘ └─────────┘ └─────────┘              │
│                                                                 │
│  Recent Activity                                                │
│  • Alex M. uploaded new avatar                  1 hour ago     │
│  • Jordan's asset licenced to Studio Y          4 hours ago    │
│  • Pending: Sam K. wardrobe needs approval      1 day ago      │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Components

### Stat Cards
- Large number with label below
- Subtle gradient background
- Icon in top-right corner

### Asset Cards
- 3D thumbnail (static render or mini WebGL)
- Asset name below
- Hover: slight scale + shadow
- Click: navigate to `/assets/[id]`

### Activity Feed
- Icon + description + relative timestamp
- Different icons per activity type
- Click: navigate to relevant asset/page

## Interactions

- Role dropdown in header switches between Creator/Agency views
- "View All" links to `/assets` with appropriate filters
- Asset cards are clickable
- Activity items link to relevant pages
