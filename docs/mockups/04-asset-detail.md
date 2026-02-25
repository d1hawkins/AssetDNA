# Asset Detail + WebGL Viewer (FE-4, FE-5)

## Layout

```
┌─────────────────────────────────────────────────────────────────┐
│  ← Back to Assets                                [Edit] [Share] │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌────────────────────────────────────┐  ┌───────────────────┐ │
│  │                                    │  │ Nova              │ │
│  │                                    │  │ Created: May 2025 │ │
│  │         [WebGL 3D Viewer]          │  │                   │ │
│  │                                    │  │ DNA Status:       │ │
│  │      - Auto-rotate on load         │  │ ✓ Verified        │ │
│  │      - Mouse drag to rotate        │  │                   │ │
│  │      - Scroll to zoom              │  │ Token ID: #1234   │ │
│  │      - Reset view button           │  │                   │ │
│  │                                    │  │ Hash:             │ │
│  │                                    │  │ a3f2b8c9d1e4...   │ │
│  │  [🔄] [📷] [⛶]                    │  │ [Copy]            │ │
│  └────────────────────────────────────┘  └───────────────────┘ │
│                                                                 │
│  Wardrobe (ERC-6551)                          [+ Add Item]      │
│  ┌─────────────────────────────────────────────────────────────┐
│  │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐           │
│  │  │ [thumb] │ │ [thumb] │ │ [thumb] │ │ [thumb] │           │
│  │  │ Jacket  │ │ Boots   │ │ Helmet  │ │ Sword   │           │
│  │  │ #1234-1 │ │ #1234-2 │ │ #1234-3 │ │ #1234-4 │           │
│  │  └─────────┘ └─────────┘ └─────────┘ └─────────┘           │
│  └─────────────────────────────────────────────────────────────┘
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## WebGL Viewer Component

### Controls
| Button | Function |
|--------|----------|
| 🔄 | Toggle auto-rotate on/off |
| 📷 | Take screenshot (downloads PNG) |
| ⛶ | Toggle fullscreen mode |

### Interactions
- **Mouse drag:** Rotate model (orbit controls)
- **Scroll wheel:** Zoom in/out
- **Double-click:** Reset to default view
- **Touch:** Pinch to zoom, drag to rotate

### Visual Settings
- Dark gradient background (customizable)
- Soft ambient + directional lighting
- Ground plane with subtle shadow
- Grid option (toggle)

## Asset Info Panel

### Fields Displayed
- **Name:** Editable (click Edit button)
- **Created:** Timestamp
- **DNA Status:** Verified badge with checkmark
- **Token ID:** On-chain identifier
- **Hash:** Truncated SHA-256 with copy button
- **Owner:** Wallet address or username

### Actions
- **Edit:** Opens edit modal for name/description
- **Share:** Copy link or generate embed code

## Wardrobe Section (ERC-6551)

This shows child NFTs bound to the parent avatar's token-bound wallet.

### Wardrobe Item Card
```
┌─────────┐
│ [thumb] │  ← 3D thumbnail or icon
│ Name    │  ← Item name
│ #ID     │  ← Child token ID
└─────────┘
```

### Interactions
- **Click item:** Opens detail modal with:
  - Larger 3D preview
  - Item metadata
  - "Remove from wardrobe" option
- **+ Add Item:** Opens upload flow scoped to this parent asset

### Empty State
```
┌─────────────────────────────────────────────────────────────────┐
│                                                                 │
│     No wardrobe items yet                                       │
│     Add accessories, clothing, or props to this avatar          │
│                                                                 │
│     [+ Add First Item]                                          │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## Wardrobe Item Detail Modal

```
┌─────────────────────────────────────────────────────────────────┐
│  Jacket                                              [✕ Close]  │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────┐  Token ID: #1234-1                   │
│  │                      │  Added: May 20, 2025                  │
│  │   [3D Preview]       │                                       │
│  │                      │  Hash:                                │
│  │                      │  b4c5d6e7f8a9b0c1d2e3...              │
│  └──────────────────────┘                                       │
│                                                                 │
│  [View Full Detail]              [Remove from Wardrobe]         │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```
